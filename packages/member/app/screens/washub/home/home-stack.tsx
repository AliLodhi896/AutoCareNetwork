import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./home-screen";
import { Card, Redemption } from "../../../services/api";
import StationDetailScreen from "../../station-detail/station-detail";
import FavouritesScreen from "../favourites/favourites-screen";
import ProfileScreen from "../../profile/profile-screen";
import RedeemScreen from "../../redeem-screen/redeem-screen";
import RedemptionHistory from "../../redemption-history/redemption-history";
import { VehicleInfoScreen } from "../../vehicle-info/vehicle-info-screen";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { ProductsScreen } from "../products/products-screen";
import {
  RedeemEverwashProps,
  RedeemEverwashScreen,
} from "../../redeem-screen/redeem-everwash-screen";
import { BrowserScreen } from "../browser-screen/browser-screen";
import LocationsScreen from "../locations/locations";
import { RedeemFindScreen } from "../redeem/redeem";
import LocationDetailScreen from "../location-detail/location-detail";
import { Location } from "../../../../../shared/global-types";
import RedeemWashScreen from "../redeem-wash/redeem-wash";
import TermsScreen from "../../terms/terms-screen";
import RedeemLocationScreen from "../redeem-location/redeem-location";
import RedeemDriveScreen from "../redeem-drive/redeem-drive";

import { NotificationsScreen } from "../notifications/notifications-screen";

import WashType from "../redeem-wash/wash-type";
import PaymentType from "../payment/payment-type";


export interface HomeNavigatorParamList extends ParamListBase {
  browserScreen: { url: string };
  redeem: undefined;
  products: undefined;
  locations: undefined;
  favourites: undefined;
  locationDetail: { station: Location };
  redeemCarWash: { station: Location, selectedPlan: any,  transactionId:any };
  washType: undefined;
  paymentType: any;
  redeemLocation: { station: Location; selectedPlan: any, card: any,transactionId:any };
  redeemDrive: { station: Location, selectedPlan: any,transactionId:any };
  notifications: undefined;
  sfnotifications: undefined;
  default: undefined;
  // locationsFavorites: {
  //   card: Card;
  // };

  terms: undefined;
  location: undefined;
  selectCard: {
    title?: string;
    cards?: Card[];
    onCardSelected: (card: Card) => void;
  };
  stationDetail: {
    station?: Location;
    distance?: string | null;
    isFavorite?: boolean;
  };
  redeemWash: Redemption;
  redeemEverwash: RedeemEverwashProps;
  redemptionHistory: { cards: Card[] };
  vehicleInfo: {
    card: Card;
    editable?: boolean;
  };
};

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

function HomeNavigatorStack() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      initialRouteName={"default"}
    >
      <HomeStack.Screen name="default" component={HomeScreen} />
      <HomeStack.Screen name="products" component={ProductsScreen} />
      <HomeStack.Screen name="redeem" component={RedeemFindScreen} />

      <HomeStack.Screen name="browserScreen" component={BrowserScreen} />
      <HomeStack.Screen name="locations" component={LocationsScreen} />
      <HomeStack.Screen name="favourites" component={FavouritesScreen} />
      <HomeStack.Screen
        name="locationDetail"
        component={LocationDetailScreen} />
      <HomeStack.Screen name="redeemCarWash" component={RedeemWashScreen} />
      <HomeStack.Screen name="washType" component={WashType} />
      <HomeStack.Screen name="paymentType" component={PaymentType} />

      <HomeStack.Screen
        name="redeemLocation"
        component={RedeemLocationScreen} />
      <HomeStack.Screen name="redeemDrive" component={RedeemDriveScreen} />

      {/* TODO Remove deprecared redeeem functionality (screen/component) */}
      <HomeStack.Screen name="stationDetail" component={StationDetailScreen} />
      <HomeStack.Screen name="redeemWash" component={RedeemScreen} />
      <HomeStack.Screen name="terms" component={TermsScreen} />
      <HomeStack.Screen
        name="redeemEverwash"
        component={RedeemEverwashScreen} />
      <HomeStack.Screen name="notifications" component={NotificationsScreen} />

      <HomeStack.Screen name="selectCard" component={ProfileScreen} />

      <HomeStack.Screen
        name="redemptionHistory"
        component={RedemptionHistory} />
      <HomeStack.Screen name="vehicleInfo" component={VehicleInfoScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigatorStack;
