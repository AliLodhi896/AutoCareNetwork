import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { Layout } from "../../../components/washub/layout";
import RedeemContainer from "../../../components/washub/redeem-container";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./location-detail.styles";
import { LocationDetails } from "../../../components/washub/location-details/location-details";
import { LocationActions } from "../../../components/washub/location-details/location-actions";
import { CircleActionButton } from "../../../components/washub/circle-action-button/circle-action-button";
import { useAppState } from "../../../context/app-state-context";
import HasFreeWash from "../has-free-wash/has-free-wash";
import analytics from '@react-native-firebase/analytics';
import NoWashError from "../../../components/washub/no-wash/no-wash-error";

const LocationDetailScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "locationDetail">
> = ({ navigation, route }) => {
  const { appState } = useAppState();
  const [showFreeInfo, setShowFreeInfo] = useState<boolean>(false);
  const station = route.params.station;
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    return () => {
      setShowFreeInfo(false);
    };
  }, []);

  const redeemWash = () => {
    console.log('appState?.selectedCard?.CanWashToday == false', appState?.selectedCard?.CanWashToday)
    if (appState?.selectedCard?.CanWashToday == true) {
      // navigation.navigate("redeemCarWash", { station: station });
      navigation.navigate("washType", { station: station })
      return;
    }
    setShowFreeInfo(true);
  };

  const WashPlansDetailsAnalytics = async () => {
    try {
      await analytics().logEvent('view_item', {
        item_list_id: 'wash_details',
        item_list_name: 'Wash Details',
        item_brand: station?.LocationName,
        item_name: station?.ServiceLevel,
        item_id: station?.LocationId,
        item_category: 'car wash',
        location_id: station?.LocationGooglePlacesId,
        affiliation: '*Pitch Deck - 222560201',
      });
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }

  useEffect(() => {
    WashPlansDetailsAnalytics()
  }, [station])
  const isPremiumOnly = true;


  const containerStyle = station?.WashUpcharge !== 0.00 || station?.WashUpcharge !== 0 ? styles.premiumContainer : styles.container;

  const cardCode = appState.selectedCard

  return (
    <Layout>
      <RedeemContainer showBack={!showFreeInfo}>
        {showFreeInfo ? (
          <HasFreeWash handleClose={() => setShowFreeInfo(false)} />
        ) : (
          <View style={containerStyle}>
            <NoWashError
              modalVisible={errorModal}
              setModalVisible={() => setErrorModal(false)}
              text={'You are not entitled to any wash.'}
            />
            <LocationDetails location={station} isPremiumOnly={isPremiumOnly} />
            <LocationActions location={station} cardCode={appState?.selectedCard?.CanWashToday} />
            <CircleActionButton
              style={styles.redeemButton}
              textStyle={styles.redeemButtonText}
              text={"SELECT WASH"}
              onPress={() => { redeemWash() }}
            />
          </View>
        )}
      </RedeemContainer>
    </Layout>
  );
};

export default LocationDetailScreen;
