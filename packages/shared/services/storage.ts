import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location, Notification, VehicleInfo } from "../global-types";
import {
  Branding,
  Card,
  CustomButtonType,
  Profile,
  Redemption,
  Station,
} from "./api";
import { ILastRedemption, IRecentWash } from "../../member/app/washub-types";

export interface AppStateProps {
  recentWashes: Array<IRecentWash>;
  cards?: Array<Card>;
  selectedCard: Card | null;
  registeredCard: Card | null;
  mobileAppButtons?: Array<CustomButtonType>;
  mobileAppButtons2?: Array<CustomButtonType>;
  hasSavedVehicleInfo?: boolean;
  name?: string | null;
  isLoading?: boolean;
  favoriteLocations?: Array<Location>;
  lastRedemption?: ILastRedemption;
  lastRedemptionHistory?: {
    DateTime: string;
    Station: string;
  };
  activeRedemption?: Redemption;
  branding?: Branding;
  feedbackRating?: number | null;
  hasCompletedCopyTutorial?: boolean;
  notifications?: Notification[];
  saved_notifications?: string[];
  noActiveCards?: boolean;
  hasConfirmPlan?: boolean;
  mileageSaved: number;
  toggleFavorite: (l: Location) => void;
  togglePrimaryCard: (c: Card) => void;
  primaryCard: Card | null;
  reInit: () => void;
}

export interface AppStateMerchantProps {
  owner?: String;
  email?: String;
  price?: String;
  exterior?: String;
  full_service?: String;
  body_gloss?: String;
  pos?: String;
  manager?: String;
  front_desk_cell?: String[];
  lastFeedbackTime?: string;
  feedbackRating?: number | null;
  hasSubmittedW9?: boolean;
  transactions?: any;
  stations?: Station[] | null;
  selectedStation?: Station | null;
}

export interface AuthStateProps {
  token?: string;
  profile?: Profile | null;
  isLoggedIn?: boolean;
  isNewUser?: boolean;
  isLoading?: boolean;
  termsPrompt?: boolean;
  notificationToken?: string;
  requiredFields?: string[];
  shownEntitlementPrompt?: any;
}

const storage = {
  async getItem(key: string) {
    try {
      return JSON.parse((await AsyncStorage.getItem(key)) || "{}");
    } catch (e) {
      console.error(e);
    }
  },
  async setItem(key: string, data: any) {
    try {
      const state = JSON.parse((await AsyncStorage.getItem(key)) || "{}");
      if (state) {
        await AsyncStorage.setItem(key, JSON.stringify({ ...state, ...data }));
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },
};

export default storage;
