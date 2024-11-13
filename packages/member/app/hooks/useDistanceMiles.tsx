import { useEffect, useRef, useState } from "react";
import { Location } from "../../../shared/global-types";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { getDistanceInMiles } from "../utils/common";

const useDistanceMiles = (location: Location) => {
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);
  const watchIDRef = useRef<number>();

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
            let miles = getDistanceInMiles(
              position.coords.latitude,
              position.coords.longitude,
              parseFloat(location.LocationLatitude),
              parseFloat(location.LocationLongitude)
            );
            setDistanceMiles(miles);
          },
          (error) => {
            console.warn("Error getting position user:", error.message);
          },
          { enableHighAccuracy: true, maximumAge: 1000 }
        );
      } else {
        console.warn("User denied location access");
      }
    });
    return () => {
      Geolocation.clearWatch(watchIDRef.current);
    };
  }, [location]);

  return { distanceMiles, setDistanceMiles };
};

export default useDistanceMiles;
