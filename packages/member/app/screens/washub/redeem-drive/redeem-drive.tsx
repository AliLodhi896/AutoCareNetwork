import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { Layout } from "../../../components/washub/layout";
import { useAppState } from "../../../context/app-state-context";
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./redeem-drive.styles";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import { getDistanceInMiles } from "../../../utils/common";

interface IGeoLocation {
  allow: boolean;
  error: any;
  location: GeolocationResponse | null;
}
const defaultGeoLocation: IGeoLocation = {
  allow: false,
  error: null,
  location: null,
};
const RedeemDriveScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "redeemDrive">
> = ({ navigation, route }) => {
  const { appState } = useAppState();
  const card = appState.selectedCard;
  const stationDetails = route.params.station;
  const selectedPlan = route.params.selectedPlan;
  const transactionId = route.params.transactionId;
  console.log('transactionIdasjdkhakjsdjaks',transactionId)

  
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [geoLocation, setGeoLocation] = useState<IGeoLocation>(
    defaultGeoLocation
  );
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (geoLocation.allow && geoLocation.location !== null) {
      const { latitude, longitude } = geoLocation.location.coords;
      const stationLat = parseFloat(stationDetails.LocationLatitude);
      const stationLong = parseFloat(stationDetails.LocationLongitude);

      let miles = getDistanceInMiles(
        latitude,
        longitude,
        stationLat,
        stationLong
      );
      setDistance(miles);

      if (miles < 0.1) {
        navigation.navigate("redeemLocation", {
          station: stationDetails,
          selectedPlan:selectedPlan,
          card: card,
          transactionId:transactionId
        });
      }
    }
    return () => {
      setGeoLocation(defaultGeoLocation);
    };
  }, [geoLocation]);

  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({ allow: true, error: null, location: position });
      },
      (error) => {
        console.log("currentPosition ....... Error", error);
      },
      { enableHighAccuracy: true, timeout: 60000, maximumAge: 1000 }
    );
  };

  const subscribeLocationLocation = () => {
    const watchID = Geolocation.watchPosition(
      (position) => {
        setGeoLocation({ allow: true, error: null, location: position });
      },
      (error) => {
        console.log("watchPosition ....... Error", error);
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    setSubscriptionId(watchID);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        subscribeLocationLocation();
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            subscribeLocationLocation();
            getOneTimeLocation();
          } else {
            console.log("Android Permission Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(subscriptionId);
      setDistance(null);
      setSubscriptionId(null);
    };
  }, []);

  return (
    <Layout>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 4 }} />
        <View style={{ flex: 21 }}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Redeem Wash</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle} text="DRIVE TO THE CAR WASH" />
              <Text style={styles.text}>
                Once you arrive, your redemption code will appear. If you have
                location services turned off, use the link below to let us know
                when you have arrived.
              </Text>
              {/* <Text
            style={[
              styles.text,
              { marginTop: normalize(20), paddingHorizontal: normalize(35) },
            ]}
            text="*NOTE: Your code will expire at 11:59 PM."
          /> */}
              {distance !== null && (
                <Text style={[styles.text, { marginTop: 30 }]}>
                  Distance to car wash: {distance.toFixed(2)} miles
                </Text>
              )}
              <View style={styles.linksWrapper}>
                <TouchableOpacity
                  style={styles.links}
                  onPress={() => {
                    navigation.navigate("redeemLocation", { station: stationDetails, selectedPlan:selectedPlan, card:card,transactionId:transactionId })
                  }}
                >
                  <Text
                    style={styles.actionLink}
                    text="I AM HERE, SHOW MY CODE"
                  />
                  <Text
                    style={[styles.actionLink, styles.actionLinkXS]}
                    text=">"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};
export default RedeemDriveScreen;
