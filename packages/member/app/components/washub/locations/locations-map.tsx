import React, { useCallback, useEffect, useRef, useState, forwardRef, useLayoutEffect } from "react";
import { View, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import GetLocation from 'react-native-get-location';
import { styles } from "./locations-map.styles";
import { customMapStyles } from "./customMapStyles";
import Pin from "../pin/pin";
import WashubClient from "../../../services/api/api";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../search-bar/search-bar";
import { Text } from "../../../../../shared/components";
import { normalize } from "../../../../../shared/utils/normalize";
import MapPinXsIcon from "../../svg/map-pin-xs";
import { PinColors } from "../../../washub-types";
import {  Location } from "../../../../../shared/global-types";
import { Card } from "../../../services/api";
import { useAppState } from "../../../context/app-state-context";
import analytics from '@react-native-firebase/analytics';

Geocoder.init("AIzaSyDRIXm45vxIpoMUO-fgjZBFOyBcCxojCxI"); // use a valid API key

const INITIAL_REGION = {
  latitude: 40.69868,
  longitude: -73.70545,
  latitudeDelta: 20.0922,
  longitudeDelta: 20.0421,
};

function GetMarker({location}: {location: Location}) {
  const navigation = useNavigation();

  return (
    <Marker
      key={location.LocationId}
      identifier={location.LocationName}
      coordinate={{
        latitude: parseFloat(location.LocationLatitude),
        longitude: parseFloat(location.LocationLongitude),
      }}
      onPress={() => {
        // @ts-ignore - navigation prop is not typed
        navigation.navigate("locationDetail", { station: location });
      }}
      tracksViewChanges={false}
    >
      <Pin station={location} />
    </Marker>
  );
}

async function getLocationsNearbyOf(location: {latitude: number, longitude: number}, card: Card) {
    const response = await WashubClient.getLocations({
        Latitude: location.latitude,
        Longitude: location.longitude,
        CardCode: card?.CardCode.toString() ?? "",
    });

    if (response.error) {
        throw response.error;
    }
    
    return response.Locations as Location[];
}


export function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
  
    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
}

function useCarwashLocations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(false);;

    /**
     * Get locations nearby of the region provided
     * @param region The region to get locations
     * @param card The card to get locations for
     * @returns A promise that resolves to the locations nearby
     * @throws An error if the request fails
     */
    const getLocationsByRegion = useCallback((region: Region, card: Card) => {
        let resolve: (value: Location[] | PromiseLike<Location[]>) => void = () => void 0;
        let reject: (reason: unknown) => void = () => void 0;

        const promise = new Promise<Location[]>((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        setIsLoading(true);
        getLocationsNearbyOf(region, card).then((locations) => {
            push(...locations);
            resolve(locations);
        }).catch((error) => {
            Alert.alert("Error", "Failed to get locations nearby");
            reject(error);
        }).finally(() => {
            setIsLoading(false);
        });

        return promise
    }, []);

    /**
     * Reset the list of locations
     */
    const reset = useCallback(() => {
        setLocations([]);
    }, []);

    /**
     * Push locations to the list
     */
    const push = useCallback((...locations: Location[]) => {
        setLocations((prev) => {
            if (locations.length === 0) {
                return prev;
            }

            const newLocations = new Map(prev.map((location) => [location.LocationId, location]));

            for (const location of locations) {
                newLocations.set(location.LocationId, location);
            }

            return [...newLocations.values()];
        });
    }, []);

    /**
     * Get locations in the region provided
     * @param region The region to get locations in
     */
    const getLocationsInRegion = useCallback((region: Region) => {
        return locations.filter((location) => {
            const lat = parseFloat(location.LocationLatitude);
            const lon = parseFloat(location.LocationLongitude);

            return lat >= region.latitude - region.latitudeDelta / 2 &&
                lat <= region.latitude + region.latitudeDelta / 2 &&
                lon >= region.longitude - region.longitudeDelta /2  &&
                lon <= region.longitude + region.longitudeDelta / 2;
        });
    }, [locations]);

    return {
        locations,
        isLoading,
        getLocations: getLocationsByRegion,
        reset,
        push,
        getLocationsInRegion,
    };
}

function useCurrentLocation() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState<Region | null>(null);

    useLayoutEffect(() => {
        setIsLoading(true);
        GetLocation.getCurrentPosition({enableHighAccuracy: true, timeout: 60000})
        .then((position) => {
            const region = {
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            setCurrentLocation(region);
            setIsLoading(false);
        }).catch((error) => {
            
            Alert.alert("Error", error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    
    }, []);

    return {
        currentLocation,
        isLoading
    };
}

function useSearchRegionByAddress() {
    const [isLoading, setIsLoading] = useState(false);
    const [region, setRegion] = useState<Region | null>(null);
    const [term, setTerm] = useState("");
    const termDebounced = useDebounce(term, 500);

    useEffect(() => {
        if (!termDebounced) {
            return;
        }

        setIsLoading(true);
        Geocoder.from(termDebounced).then((response) => {
            const {lat, lng} = response.results[0].geometry.location;

            setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }).catch((error) => {
            Alert.alert("Error", error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [termDebounced]);

    const search = useCallback((text: string) => {
        setTerm(text);
    }, []);

    return {
        isLoading,
        region,
        search,
    };
}


interface LocationsMapProps {
  onLocationsChange?: (locations: Location[]) => void;
  card?: Card | null;
}

function LocationsMap({onLocationsChange, card}: LocationsMapProps) {
    const mapRef = useRef<MapView>(null);

    const [mapRegion, setMapRegion] = useState<Region | null>(null);
    const {region: geoCoderRegion, search, isLoading: isSearching} = useSearchRegionByAddress();
    const {currentLocation, isLoading: isCurrentLocationLoading} = useCurrentLocation();
    const {getLocations, isLoading, locations, getLocationsInRegion} = useCarwashLocations();

    const fitToLocationsMarkers = useCallback((markers: string[]) => {
        setTimeout(() => {
            mapRef.current?.fitToSuppliedMarkers(markers, {
                edgePadding: {
                    top: 100,
                    right: 100,
                    bottom: 100,
                    left: 100,
                },
                animated: true,
            });
        }, 500);
    }, []);

    useEffect(() => {

        if (!card) return;
        if (currentLocation) {
            getLocations(currentLocation, card).then((locations) => {
                fitToLocationsMarkers(locations.map((loc) => loc.LocationName));
            });

            mapRef.current?.animateToRegion(currentLocation);
        } else {
            setMapRegion(INITIAL_REGION);
            getLocations(INITIAL_REGION, card);
        }


    }, [currentLocation, fitToLocationsMarkers, card, getLocations]);

    useEffect(() => {
        if (!mapRegion) return;
        onLocationsChange?.(getLocationsInRegion(mapRegion));
    }, [mapRegion, getLocationsInRegion, onLocationsChange]);


    const mapRegionDebounced = useDebounce(mapRegion, 1000);

    useEffect(() => {
        if (!card) return;
        if (mapRegionDebounced) {
            getLocations(mapRegionDebounced, card)
        }
    }, [mapRegionDebounced, card, getLocations]);    

    useEffect(() => {
        if (geoCoderRegion) {
            setMapRegion(geoCoderRegion);
            mapRef.current?.animateToRegion(geoCoderRegion);
        }
    }, [geoCoderRegion]);

    const onRegionChangeComplete = useCallback((region: Region, detail: { isGesture?: boolean; }) => {
        setMapRegion(region);
    }, []);


      


    return (
        <View style={styles.container}>
            <SearchBar
                onSearch={(text) => search(text)}
                loading={isLoading || isCurrentLocationLoading || isSearching} />
            <CarWashesMap
                ref={mapRef}
                onRegionChangeComplete={onRegionChangeComplete}
                carwashesLocations={locations} />

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <MapPinXsIcon color={PinColors.red} />
                    <Text style={styles.legendText} text="Premium co-pay required" />
                </View>
                <View style={styles.legendItem}>
                    <MapPinXsIcon color={PinColors.blue} />
                    <Text style={styles.legendText} text="Included in Plans" />
                </View>
            </View>
        </View>
    );
}


interface MapProps {
  region?: Region;
  onRegionChangeComplete: (region: Region, detail: {isGesture?: boolean}) => void;
  carwashesLocations: Location[];
}

const CarWashesMap = forwardRef<MapView, MapProps>(function LocationMap({region, onRegionChangeComplete, carwashesLocations}: MapProps, ref: React.Ref<MapView>) {
    const { appState } = useAppState();

    
    const searchWashPlansAnalytics = async () => {
        try {
          if(carwashesLocations?.length !== 0){
            const items = carwashesLocations.map(item => ({
              item_brand: appState.registeredCard.VehicleInfo.Make,
              item_name: item?.LocationName,
              item_id: item?.LocationId,
              location_id: item?.LocationGooglePlacesId,
              item_category: 'car wash',
              affiliation: appState.registeredCard.DealerName,
              item_category2: 'Premium Only',
            }));
    
            await analytics().logEvent('view_item_list', {
              item_list_id: 'location_list',
              item_list_name: 'Location List',
              items: items
            })
          }
        } catch (error) {
          console.error('Error logging event:', error);
        }
      }
    useEffect(() => {
    
        searchWashPlansAnalytics()
        analytics().logEvent('screen_view', {
          screen_name: 'Search By Location - Map',
        })
    
      }, [searchWashPlansAnalytics])
  
    return (
    <MapView
        ref={ref}
        initialRegion={INITIAL_REGION}
        style={{ flex: 1, marginBottom: normalize(60), width: "100%"}}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        customMapStyle={customMapStyles}
        onRegionChangeComplete={onRegionChangeComplete}
        scrollDuringRotateOrZoomEnabled={false}
        rotateEnabled={false}
        userLocationPriority="high"
        showsUserLocation
        loadingIndicatorColor="#00BCFF"
      >
        {carwashesLocations.map((loc) => (
          <GetMarker
            key={loc.LocationId}
            location={loc}
          />
        ))}
      </MapView>
  )
})

export default LocationsMap;