import { Platform, Share } from "react-native";
import { AuthStateContextProps } from "../../../shared/contexts/auth-state-context";
import { AppStateContextProps } from "../context/app-state-context";
import WashubClient  from "../services/api/api";
import { translate } from "../i18n";

export const shareMerchant = () => {
  const url = "https://www.autocarenetwork.com/merchant-app";

  const message = `${translate("homeScreen.share.merchant_by_washub")} ${
    Platform.OS === "android" ? `\n ${url}` : ""
  }`;

  let shareOptions = {
    title: translate("homeScreen.share.download_message"),
    message,
    url,
    subject: translate("homeScreen.share.try_app_message"), //  for email
  };

  Share.share(shareOptions, {
    subject: translate("homeScreen.share.try_app_message"),
    dialogTitle: translate("homeScreen.share.try_app_message"),
  });
};

export const logout = (
  stateContext: AppStateContextProps,
  authContext: AuthStateContextProps
) => {
  const { setAppState } = stateContext;
  const { setAuthState } = authContext;

  setAuthState({
    token: "",
    profile: null,
    isLoggedIn: false,
    isNewUser: false,
    isLoading: false,
    termsPrompt: false,
    notificationToken: "",
    requiredFields: [],
    shownEntitlementPrompt: null,
  });
  setAppState({
    owner: "",
    email: "",
    price: "",
    exterior: "",
    full_service: "",
    body_gloss: "",
    pos: "",
    manager: "",
    front_desk_cell: [],
    lastFeedbackTime: null,
    feedbackRating: null,
    hasSubmittedW9: false,
    transactions: null,
    stations: [],
    selectedStation: null,
  });
  
  WashubClient.setToken("");
};



export const priceFormatter = (price="", previousValue="") => {
  if (price.length < previousValue?.length) return price
  const prices = price.split(".")
  const priceNumber = parseInt(prices[0]?.replace("$", ""), 10)
  const remainder = parseInt(prices[1], 10)
  let result = ""
  if (!isNaN(priceNumber)) result += `$${priceNumber}`
  if (prices.length == 2) result += `.`
  if (!isNaN(remainder)) result += `${remainder}`
  return result
}