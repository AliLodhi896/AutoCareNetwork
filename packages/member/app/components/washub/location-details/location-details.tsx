import React, { useState, useEffect, useCallback } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { ScrollView, View } from "react-native";
import { styles } from "./location-details.style";
import { Location } from "../../../../../shared/global-types";
import useDistanceMiles from "../../../hooks/useDistanceMiles";
import { LocationButton } from "../action-button/action-button";
import IconHeartLight from "../../svg/icon-heart-light";
import { useAppState } from "../../../context/app-state-context";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';
import { PinColors } from "../../../washub-types";




export function LocationDetails({
  location,
  isPremiumOnly,
}: {
  location: Location;
  isPremiumOnly: boolean;
}) {
  const { distanceMiles } = useDistanceMiles(location);
  const { appState } = useAppState();
  const favorites = appState.favoriteLocations || [];
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.find((loc) => loc.LocationId === location.LocationId)) {
      setIsFavorite(true);
    }
    return () => {
      setIsFavorite(false);
    };
  }, [favorites, location.LocationId]);

  const scrreenView = async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Car Wash Details',
    });
  }

  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );
  const color = location?.WashUpcharge !== 0.00 ? PinColors.red : PinColors.blue;
  const cardCode = appState?.cards

  return (
    <View style={styles.container}>
      <View style={styles.favoriteContainer}>
        {!isFavorite ? (
          <Text
            style={{
              ...styles.text,
              ...styles.bold,
              color: "#00BCFF",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            Add as favorite
          </Text>
        ) : null}
        <LocationButton
          text=""
          icon={<IconHeartLight fill={isFavorite ? "#00BCFF" : "none"} />}
          onPress={() => appState.toggleFavorite(location)}
        />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
        <Text style={styles.title}>{location.LocationName.toUpperCase()}</Text>
        <Text style={{ ...styles.text, ...styles.bold }}>
          {location.ServiceLevel.toUpperCase()}
        </Text>
        {distanceMiles !== null && (
          <Text style={{ ...styles.text, ...styles.bold, color: "#00BCFF" }}>
            {distanceMiles !== 0 ? distanceMiles.toFixed(2) : distanceMiles} miles
          </Text>
        )}
        <Text style={styles.text} text={location.LocationAddress} />
        <Text style={styles.text}>
          {location.LocationCity}, {location.LocationState} {location.LocationZip}
        </Text>
        <Text style={styles.text} text={location.LocationPhone} />
        <Text style={styles.text} text={'Mon - Sun : 7AM - 7PM'} />
      </View>
      {location?.WashUpcharge !== 0.00 || location?.WashUpcharge !== 0 ? (
        <>
          <Text
            style={styles.premiumOnlyWarning}
            text={"Premium - co-pay required*"}
          />
          <Text style={styles.smallText} text={"See menu for pricing"} />
        </>
      )
        :
        null
      }
      <Text />
    </View>
  );
}