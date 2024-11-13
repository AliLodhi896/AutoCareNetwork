import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export const WASHUB_DEALER_BUNDLE_ID = "com.autocarenetwork.dealerbundle";
export const WASHUB_MEMBER_BUNDLE_ID = "com.washub.member";
export const WASHUB_MERCHANT_BUNDLE_ID = "com.autocare.merchant";

const BUNDLE_ID = DeviceInfo.getBundleId();

export function isDealerBundleApp(): boolean {
  return BUNDLE_ID.toLowerCase() === WASHUB_DEALER_BUNDLE_ID;
}

export const appName = {
  name: "",
};

export function isMerchantApp(): boolean {
  return appName.name === "merchant";
}
export const storeName = isMerchantApp()
  ? "merchantAuthState"
  : "memberAuthState";

export const WASHUB_COLOR = "#f9ad40";
export const WASHUB_MEMBER_COLOR = "#213C7C";
export const DOCUSIGN_URL = "https://www.autocarenetwork.com/docusign";

export const brandColor = () =>
  isDealerBundleApp() ? WASHUB_COLOR : WASHUB_MEMBER_COLOR;

const TOKENS = {
  DEALER_BUNDLE: {
    ios: "E/5ms3c9nBNmd+DFEq8WeOqExy2Y7huqmfTYhDq7nN/r4gBNZ187O8Barr/XyNA0TfDn6A==",
    android:
      "3rBmKL5UaAMVqo1tFCC6eX0KWLbKTupLnncd6wnL3qA4ab5unGHqAytzmE6aVV843GypfAOQS5YpoT6T",
  },
  WASHUB_MEMBER: {
    ios: "p2qpEWfhiSB7OB8ffjqFB77Dm+rNR4+ChEzU1BLZzowGfgSGrYbtLTI6B/4/r24EvfhrkWGrRsxozuJW",
    android:
      "XBKyfWKbkmeHW2vqBJG+fWChsTAtBqntMwA6cimaeDXhx89TVP2qvN40lDU5tPI14GN0rVnDsBIz08bK0t3ojau+urw=",
  },
  WASHUB_MERCHANT: {
    ios: "QObxsl+tsJj9KsamW1VLv6+KNXdFgOe7pWFrYI0dzz9JIVr2DDvtK5ZyL7iXs3cp1/WFw2vHgryBl10C",
    android:
      "A+YLxJavUThbnWEdbJkN57hrP/lOVx8uL5V+4PFmNsq8G/4OyBIXEd/b3SRyzm3cgbBEOHCOQjh67jsBXH4gy7MU1kk=",
  },
};

export const getAppToken = () =>
  isDealerBundleApp()
    ? TOKENS.DEALER_BUNDLE
    : BUNDLE_ID === WASHUB_MEMBER_BUNDLE_ID
    ? TOKENS.WASHUB_MEMBER
    : TOKENS.WASHUB_MERCHANT;

const AppToken = Platform.select(getAppToken());

export default {
  AppToken,
  WASHUB_EMAIL: "info@autocarenetwork.us",
};
