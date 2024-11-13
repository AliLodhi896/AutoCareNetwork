import {
  View,
  Platform,
  Alert,
  TouchableHighlight,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import { useRoute } from "@react-navigation/native";
import Pin from "../../components/washub/pin/pin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../../components/washub/search-bar/search-bar";
import { translate } from "../../i18n";
import { color, spacings } from "../../../../shared/theme";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import WashubClient from "../../services/api/api";
import { Location } from "../../../../shared/global-types";
import { styles } from "./redeem-locations.styles";
import { Text } from "../../../../shared/components/text/text";
import { Screen } from "../../../../shared/components/screen/screen";
import { GradientBackground } from "../../../../shared/components/gradient-background/gradient-background";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { normalize } from "../../../../shared/utils/normalize";
import ShowMapIcon from "../../components/svg/show-map";
import ListIcon from "../../components/svg/show-list";
import { customMapStyles } from "./customMapStyles";

Geocoder.init("AIzaSyDRIXm45vxIpoMUO-fgjZBFOyBcCxojCxI"); // use a valid API key

const INITIAL_REGION = {
  latitude: 40.7903,
  longitude: -73.9597,
  latitudeDelta: 20.0922,
  longitudeDelta: 20.0421,
};

const getCityStateZip = (location: Location) => {
  return (
    location.LocationCity +
    ", " +
    location.LocationState +
    " " +
    location.LocationZip
  );
};

const getDistanceFromLatLonInMiles = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371; //convert to miles;
};

const getDistanceString = (
  searchLocation: any,
  location: any
): string | null => {
  if (!location || (!searchLocation && !location)) {
    return null;
  }

  const myLocation = searchLocation || location.coords;
  const distance = getDistanceFromLatLonInMiles(
    myLocation?.latitude ?? 0,
    myLocation?.longitude ?? 0,
    location.LocationLatitude,
    location.LocationLongitude
  );

  return `${Math.round(distance)} ${
    distance > 1 ? translate("common.miles") : translate("common.mile")
  }`;
};

const GetMarker = (props: {
  loc: Location;
  locationSelected: (loc: Location) => void;
}) => {
  const { loc, locationSelected } = props;
  const coord = {
    latitude: parseFloat(loc.LocationLatitude),
    longitude: parseFloat(loc.LocationLongitude),
  };

  useEffect(() => {}, [loc.LocationId]);

  return (
    <Marker
      key={loc.LocationId + Math.random()}
      identifier={loc.LocationName}
      coordinate={coord}
      onPress={() => locationSelected(loc)}
      tracksViewChanges={false}
    >
      <Pin station={loc} />
    </Marker>
  );
};

const RedeemLocationsScreen = ({ navigation }) => {
  const watchIDRef = useRef<number>();
  const mapRef = useRef<MapView>(null);

  const route = useRoute<any>();
  const mode = route.params?.mode || "map";
  const [station, setStation] = useState(route.params?.station);
  const [showingList, setShowingList] = useState(mode === "list");
  const [location, setLocation] = useState<GeolocationResponse>();
  const [washLocations, setWashLocations] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(INITIAL_REGION);
  const [hasPannedMap, setHasPannedMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [locationsDisabled, setLocationsDisabled] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!showingList) {
      fitToMarkers(washLocations);
    }
  }, [showingList, washLocations]);

  const search = useCallback(async (latitude: number, longitude: number) => {
    const success = (locations: any) => {
      setWashLocations(locations || []);
      setHasPannedMap(false);
      Platform.OS === "android"
        ? setTimeout(() => {
            setLoading(false);
          }, 5000)
        : setLoading(false);
      setSearchLocation({
        latitude,
        longitude,
      });
    };
    const failure = (message: string, code: number) => {
      console.error("Search Error", message, code);
      setWashLocations([]);
      setHasPannedMap(false);
      setLoading(false);
      showError(message);
    };
    setLoading(true);
    await WashubClient.getLocations({
      Latitude: latitude,
      Longitude: longitude,
    }).then((result) => {
      if (result.error) {
        const { message, code } = result.error;
        failure(message, code);
      } else {
        success(result.Locations);
      }
    });
  }, []);

  const geocodeText = useCallback(
    (text: string) => {
      // Address Geocoding
      Geocoder.from(text)
        .then((json: any) => {
          // res is an Array of geocoding object (see below)
          const res = json.results;
          if (res && res.length > 0) {
            const match = res[0];
            const newLocation = match.geometry.location;
            const lat = newLocation.lat;
            const long = newLocation.lng;
            search(lat, long);
          } else {
            showError(translate("redeemLocationsScreen.unableToFoundLocation"));
          }
        })
        .catch((err: any) => {
          if (err.code === 4) {
            showError(translate("redeemLocationsScreen.invalidZipcode"));
          } else {
            showError(err.message);
          }
        });
    },
    [search]
  );

  useEffect(() => {
    if (station) {
      geocodeText(
        `${station.LocationAddress} ${station.LocationCity} ${station.LocationState} ${station.LocationZip}`
      );
      navigation.navigate("home", {
        screen: "stationDetail",
        params: {
          station: station,
          distance: getDistanceString(searchLocation, station),
        },
      });
      setStation(null);
    }
  }, [station, geocodeText, navigation, searchLocation]);

  const requestPermission = async (completion: (success: boolean) => any) => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
      setTimeout(() => {
        completion(true);
      }, 1000);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          completion(true);
        } else {
          completion(false);
        }
      } catch (err) {
        completion(false);
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestPermission((success) => {
      if (success) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocationsDisabled(false);
            search(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.warn("Error getting position user:", error.message);
            setLoading(false);
            setLocationsDisabled(true);
            Alert.alert(
              translate("redeemLocationsScreen.locationDisabledTitle"),
              translate("redeemLocationsScreen.pleaseTurnLocation"),
              [
                {
                  text: translate("common.ok"),
                  onPress: () => console.log("OK Pressed"),
                },
              ]
            );
          }
        );
        watchIDRef.current = Geolocation.watchPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {}
          //Alert.alert("WatchPosition ssssssss Error", JSON.stringify(error))
        );
      } else {
        console.warn("User denied location access");
        setLoading(false);
        setLocationsDisabled(true);
      }
    });
  }, [search]);

  useEffect(() => {
    return () => {
      Geolocation.clearWatch(watchIDRef.current);
    };
  }, [searchLocation]);

  const showError = (error: string) => {
    console.warn(error);
    setLoading(false);
    Alert.alert("Error", error, [
      {
        text: translate("common.ok"),
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  };

  const fitToMarkers = (locations: any[]) => {
    if (locations?.length === 0) {
      return;
    }
    const names = locations?.map((loc) => loc.LocationName);
    // Add delay for android
    Platform.OS === "android"
      ? setTimeout(() => {
          mapRef.current?.fitToSuppliedMarkers(names, { animated: true });
        }, 200)
      : mapRef.current?.fitToSuppliedMarkers(names, { animated: true });
  };

  const locationSelected = (loc: Location) => {
    navigation.navigate("home", {
      screen: "stationDetail",
      params: {
        station: loc,
        distance: getDistanceString(searchLocation, loc),
      },
    });
  };

  const onRegionChange = (region: any) => {
    setCurrentRegion(region);
  };

  /*const onMapPan = () => {
    setHasPannedMap(true);
    Keyboard.dismiss();
  };*/

  const toggleMap = () => {
    const newShowingList = !showingList;
    setShowingList(newShowingList);
  };

  const centerMap = () => {
    const myLocation = location?.coords;
    if (!myLocation) {
      return;
    }
    mapRef.current?.animateToCoordinate(myLocation, 200);
  };

  const renderListView = () => {
    let headerText = translate("redeemLocationsScreen.selectLocation");
    if (loading) {
      headerText = translate("redeemLocationsScreen.findLocation");
    } else if (washLocations?.length === 0) {
      headerText = locationsDisabled
        ? translate("redeemLocationsScreen.locationDisabled")
        : translate("redeemLocationsScreen.noLocation");
    }

    return (
      <View style={styles.locationList}>
        <View style={styles.redeemListContainer}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.list}
            ListHeaderComponent={() => {
              return (
                <View style={styles.listHeader}>
                  {headerText && (
                    <Text style={styles.headerText}>{headerText}</Text>
                  )}
                </View>
              );
            }}
            data={washLocations}
            keyExtractor={(item: any) => item.LocationName}
            renderItem={({ item: location }: { item: Location }) => (
              <View key={location.LocationId}>
                <TouchableHighlight
                  style={styles.result}
                  onPress={() => locationSelected(location)}
                  underlayColor={color.palette.offWhite}
                >
                  <View style={styles.listItem}>
                    <View style={styles.listItemLeft}>
                      <Text style={styles.itemTextBold}>
                        {location.LocationName}
                      </Text>
                      <Text fontFamily="secondary" style={styles.spaceItem}>
                        {location.LocationAddress}
                      </Text>
                      <Text fontFamily="secondary" style={styles.spaceItem}>
                        {getCityStateZip(location)}
                      </Text>
                      {location.LocationPhone !== "" && (
                        <Text fontFamily="secondary" style={styles.spaceItem}>
                          {location.LocationPhone}
                        </Text>
                      )}
                    </View>

                    <View style={styles.listItemRight}>
                      <View>
                        <Text style={styles.itemTextBold}>
                          {location.ServiceLevel}
                        </Text>
                      </View>
                      {getDistanceString(searchLocation, location) && (
                        <Text
                          style={{
                            ...styles.distance,
                            marginTop:
                              location.LocationPhone !== ""
                                ? spacings.large
                                : spacings.small,
                            fontWeight: "700",
                          }}
                        >
                          {getDistanceString(searchLocation, location)}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          />
          {!loading && (
            <View pointerEvents="box-none" style={styles.listCircle}>
              <CircleButton
                innerText
                noText
                style={styles.redeemCircle}
                textStyle={styles.redeemText}
                text={
                  showingList
                    ? translate("redeemLocationsScreen.showMap")
                    : translate("redeemLocationsScreen.showList")
                }
                onPress={toggleMap.bind(this)}
                icon={
                  <ShowMapIcon
                    style={{
                      height: normalize(55),
                      width: normalize(50),
                    }}
                  />
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderMapView = () => {
    return (
      <MapView
        ref={mapRef}
        initialRegion={currentRegion}
        style={{ flex: showingList ? 0 : 1 }}
        customMapStyle={customMapStyles}
        onRegionChange={(region) => onRegionChange(region)}
        mapPadding={{
          top: Platform.OS === "ios" ? 0 : 60,
          bottom: 90,
          left: 0,
          right: 0,
        }}
        showsUserLocation={true}
      >
        {washLocations?.map((loc, index) => (
          <GetMarker
            key={`${index}-${loc.LocationId}`}
            loc={loc}
            locationSelected={locationSelected}
          />
        ))}
      </MapView>
    );
  };

  return (
    <Screen unsafe statusBar="light-content" style={{ flex: 1 }}>
      <GradientBackground />
      {!showingList && (
        <SearchBar
          onSearch={(text: string) => geocodeText(text)}
          loading={loading}
        />
      )}
      <View
        style={styles.container}
        /*onMoveShouldSetResponder={() => {
          return !showingList;
        }}
        onStartShouldSetResponder={() => {
          return !showingList;
        }}
        onResponderTerminate={() => onMapPan()}
        onResponderRelease={() => onMapPan()}*/
      >
        {renderMapView()}
        {showingList && renderListView()}
      </View>

      {/*
        hasPannedMap &&!showingList && (
        <View style={[styles.searchButtonContainer, { top: searchAreaTop }]}>
          <TouchableOpacity
            style={styles.searchButton}
            accessibilityRole="button"
            onPress={() =>
              search(currentRegion.latitude, currentRegion.longitude)
            }
            activeOpacity={0.8}
          >
            <Text style={styles.searchText}>
              {translate("redeemLocationsScreen.searchThisArea")}
            </Text>
          </TouchableOpacity>
        </View>
        )
      */}
      {!loading && !showingList && (
        <View
          pointerEvents="box-none"
          style={{
            ...styles.redeemContainer,
            bottom: Platform.OS === "android" ? 120 : insets.bottom + 90,
          }}
        >
          <CircleButton
            innerText
            noText
            style={styles.redeemCircle}
            textStyle={styles.redeemText}
            text={translate("redeemLocationsScreen.showList")}
            onPress={toggleMap.bind(this)}
            icon={
              <ListIcon
                style={{
                  height: normalize(55),
                  width: normalize(50),
                }}
              />
            }
          />
        </View>
      )}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={color.palette.red} />
        </View>
      )}
      <CustomHeader
        leftContent={
          <BackButton
            onPress={() => navigation.goBack()}
            text={translate("common.close")}
            type="close"
          />
        }
      />
    </Screen>
  );
};

export default RedeemLocationsScreen;
