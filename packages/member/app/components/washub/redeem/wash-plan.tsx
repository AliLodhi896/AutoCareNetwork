import React, { useState, useCallback, useEffect } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./redeem-mileage.style";
import WashubClient from "../../../services/api/api";
import { useAppState } from "../../../context/app-state-context";
import analytics from '@react-native-firebase/analytics';
import { useFocusEffect } from "@react-navigation/native";

export function WashPlan({ isPremiumOnly, station, setSelectedPlan }) {
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [washLocations, setWashLocations] = useState([]);
  const [matchedLocation, setMatchedLocation] = useState(null);
  const { appState } = useAppState();
console.log('station',station)
  const search = useCallback(async () => {
    const success = (locations) => {
      setWashLocations(locations || []);
      setLoading(false);
    };

    const failure = (message, code) => {
      setWashLocations([]);
      setLoading(false);
    };

    setLoading(true);
    await WashubClient.getLocations({
      Latitude: station?.LocationLatitude,
      Longitude: station?.LocationLongitude,
      Limit: 15,
      CardCode: appState.selectedCard.CardCode,
    }).then((result) => {
      if (result.error) {
        const { message, code } = result.error;
        failure(message, code);
      } else {
        success(result.Locations);
      }
    });
  }, [station, appState.selectedCard.CardCode]);

  useEffect(() => {
    search();
  }, [search]);

  useEffect(() => {
    const matched = washLocations?.find((location) => location?.LocationId === station?.LocationId);
    if (matched) {
      setMatchedLocation(matched);
    }
  }, [washLocations, station?.LocationId]);

  // Automatically select the lowest price plan
  useEffect(() => {
    if (matchedLocation?.StationServices && matchedLocation?.StationServices.length > 0) {
      const lowestPricePlan = matchedLocation.StationServices.reduce((prev, current) =>
        prev.StationServicePrice < current.StationServicePrice ? prev : current
      );
      setSelectedPlan(lowestPricePlan);
      setSelectedType(lowestPricePlan?.StationServiceName);
    }
  }, [matchedLocation]);

  const PlanAnalytics = async () => {
    try {
      if (matchedLocation?.StationServices?.length) {
        const items = matchedLocation.StationServices.map((item) => ({
          item_category: 'car wash',
          affiliation: '*Pitch Deck - 222560201',
          item_category2: 'Premium Only',
          price: item?.StationServicePrice,
          item_variant: item?.StationServiceName,
          item_brand: station?.ServiceLevel,
          item_name: station?.LocationName,
          item_id: station?.LocationId,
          location_id: station?.LocationGooglePlacesId,
        }));
        await analytics().logEvent('view_item_list', {
          item_list_id: 'car_wash_details_menu_list',
          item_list_name: 'Car Wash Details Menu List',

          items: items,
        });
      }
    } catch (error) {
      console.error('Error logging event:', error);
    }
  };

  useEffect(() => {
    PlanAnalytics();
  }, [matchedLocation]);

  const selectedPlanAnalytics = async (item) => {
    try {
      await analytics().logEvent('add_to_cart', {
        item_list_id: 'car_wash_plan',
        item_list_name: 'Car Wash plan',
        item_brand: station?.LocationName,
        item_id: item?.StationServiceId,
        item_category: 'car wash',
        location_id: station?.LocationGooglePlacesId,
        affiliation: '*Pitch Deck - 222560201',
        price: item?.StationServicePrice,
        item_variant: item?.StationServiceName,
      });
    } catch (error) {
      console.error('Error logging event:', error);
    }
  };

  const scrreenView = async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Select Wash',
    });
  };

  useFocusEffect(
    useCallback(() => {
      scrreenView();
    }, [])
  );

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={"#00BCFF"} />
        </View>
      ) : (
        <>
          <Text
            style={{
              ...styles.title,
              color: "#000",
              marginTop: 30,
            }}
          >
            {station?.LocationName}
          </Text>
          <Text
            style={{
              ...styles.selecttitle,
              color: "#000",
              marginTop: 8,
            }}
          >
            Select Your Wash:
          </Text>
          {matchedLocation?.StationServices == null ||
          matchedLocation?.StationServices?.length === 0 ? (
            <Text style={styles.notfoundText}>No wash plans found!</Text>
          ) : (
            <View style={{ marginBottom: 60 }}>
              {matchedLocation?.StationServices?.map((item) => (
                <TouchableOpacity
                  key={item.StationServiceId}
                  onPress={() => {
                    setSelectedPlan(item);
                    selectedPlanAnalytics(item);
                    setSelectedType(item?.StationServiceName);
                  }}
                  style={{
                    ...styles.ultimateContainer,
                    backgroundColor:
                      selectedType === item?.StationServiceName &&
                      item?.StationServicePrice === 0
                        ? "#00BCFF"
                        : selectedType === item?.StationServiceName &&
                          item?.StationServicePrice !== 0
                        ? "red"
                        : "white",
                  }}
                >
                  <Text
                    style={{
                      ...styles.titleultimate,
                      color: selectedType === item?.StationServiceName ? "white" : "black",
                    }}
                  >
                    {item?.StationServiceName}
                  </Text>
                  <Text
                    style={{
                      ...styles.chargeultimate,
                      color: selectedType === item?.StationServiceName ? "white" : "black",
                    }}
                  >
                    {item?.StationServiceDescription}
                  </Text>
                  <Text
                    style={{
                      ...styles.chargeultimate,
                      color: selectedType === item?.StationServiceName ? "white" : "black",
                    }}
                  >
                    {item?.StationServicePrice === 0
                      ? "INCLUDED IN PLAN"
                      : "$" + item?.StationServicePrice + " UPCHARGE"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}
