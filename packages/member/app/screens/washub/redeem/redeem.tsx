import React, { FC, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "./redeem.styles";
import { Text } from "../../../../../shared/components/text/text";
import { HomeNavigatorParamList } from "../home/home-stack";
import { useAppState } from "../../../context/app-state-context";
import { Layout } from "../../../components/washub/layout";
import { AutoImage } from "../../../../../shared/components";
import { LocationsList } from "../../../components/washub/locations-list/locations-list";
import { Location } from "../../../../../shared/global-types";
import HasFreeWash from "../has-free-wash/has-free-wash";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';
import WashubClient from "../../../services/api/api";


let ITEMS_LIMIT = 3;

export const RedeemFindScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "redeem">
> = ({ navigation, route }) => {
  const { appState } = useAppState();
  const [washLocations, setWashLocations] = useState<Location[]>([]);

  const [washLocationsAnalytics, setWashLocationsAnalytics] = useState<Location[]>([]);

  const [showFreeInfo, setShowFreeInfo] = useState<boolean>(false);
const token  = WashubClient.token

  useEffect(() => {
    return () => {
      setShowFreeInfo(false);
    };
  }, []);

  const scrreenView = async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Find Car Wash',
    });
  }

  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );
  useEffect(() => {
    const recent: Location[] = [];
    const recentAnalayticsWash: any = [];
    if (appState.selectedCard !== null) {
      setShowFreeInfo(!appState.selectedCard.CanWashToday);
      appState.recentWashes.forEach((wash, index) => {
        if (wash.CardCode === appState.selectedCard.CardCode) {
          recent.push(wash.Location);
          recentAnalayticsWash.push(wash.Location)
        }
      });
    }

    setWashLocations(recent.slice(0, ITEMS_LIMIT));
    setWashLocationsAnalytics(recent.slice(0, ITEMS_LIMIT))
    return () => {
      setWashLocations([]);
      setWashLocationsAnalytics([]);
    };
  }, [appState.selectedCard]);

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        {showFreeInfo ? (
          <View style={{ flex: 37 }}>
            <HasFreeWash handleClose={() => setShowFreeInfo(false)} />
          </View>
        ) : (
          <>
            <View style={{ flex: 12 }}>
              <Text style={styles.title}>Find Car Wash</Text>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("locations");
                  }}
                >
                  <AutoImage
                    style={styles.btnCircle}
                    source={require("../../../../assets/images/btn-locations-search.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("favourites");
                  }}
                >
                  <AutoImage
                    style={styles.btnCircle}
                    source={require("../../../../assets/images/btn-locations-favorites.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 25 }}>
              <LocationsList
                washLocations={washLocations}
                recentWash={washLocationsAnalytics}
                title="YOUR RECENT WASHES"
              />
            </View>
          </>
        )}
        <View style={{ flex: 1 }} />
      </View>
    </Layout>
  );
};
