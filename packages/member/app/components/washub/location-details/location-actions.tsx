import React, { useEffect, useState } from "react";
import { Linking, Platform, View } from "react-native";
import { styles } from "./location-details.style";
import { Location } from "../../../../../shared/global-types";
import { LocationButton } from "../action-button/action-button";
import IconHeartLight from "../../svg/icon-heart-light";
import IconPhone from "../../svg/icon-phone";
import IconDirection from "../../svg/icon-direction";
import { useAppState } from "../../../context/app-state-context";
import Communications from "react-native-communications";
import { useNavigation } from "@react-navigation/native";
import IconMenu from "../../svg/menu";
import NoWashError from "../no-wash/no-wash-error";

export function LocationActions({ location, cardCode }: { location: Location, cardCode: any }) {
  const { appState } = useAppState();
  const favorites = appState.favoriteLocations || [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (favorites.find((loc) => loc.LocationId === location.LocationId)) {
      setIsFavorite(true);
    }
    return () => {
      setIsFavorite(false);
    };
  }, [favorites, location.LocationId]);

  const handleDirection = () => {
    const destination = `${location.LocationAddress}, ${location.LocationCity}, ${location.LocationState}, ${location.LocationZip}`;
    if (Platform.OS === "ios") {
      const url =
        "https://maps.apple.com/maps?saddr=Current Location&daddr=" +
        destination;
      navigation.navigate("browserScreen", { url: url });
    }
    const url =
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURI(destination);
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <View style={styles.actions}>
      <NoWashError
        modalVisible={errorModal}
        setModalVisible={() => setErrorModal(false)}
        text={'You have no free car washes available.'}
      />
      <LocationButton
        text="Menu"
        icon={<IconMenu fill={isFavorite ? "#00BCFF" : "none"} />}
        onPress={() => { cardCode !== true || cardCode == undefined ? setErrorModal(true) : navigation.navigate("washType", { station: location }) }}

      />
      <LocationButton
        text="Call"
        icon={<IconPhone />}
        onPress={() => Communications.phonecall(location.LocationPhone, false)}
      />
      <LocationButton
        text="Directions"
        icon={<IconDirection />}
        onPress={handleDirection}
      />
    </View>
  );
}
