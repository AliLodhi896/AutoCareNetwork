import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#ffffff",
    height: isAndroidFontLargest() ? 430 : 400,
    marginTop:'2%'
  },
  premiumContainer: {
    flexDirection: "column",
    borderRadius: normalize(8),
    borderWidth: 5,
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    height: isAndroidFontLargest() ? 430 : 400,
    justifyContent: "space-between",
    borderColor: "#FF0000",
    marginTop:'4%'

  },
  redeemButton: {
    alignSelf: "center",
    width: normalize(isAndroidFontLargest() ? 72 : 68),
    height: normalize(isAndroidFontLargest() ? 72 : 68),
    position: "absolute",
    bottom: normalize(-35),
  },
  redeemButtonText: {
    fontSize: normalize(isAndroidFontLargest() ? 11 : 13),
  },
  payNowButtonText: {
    fontSize: normalize(isAndroidFontLargest() ? 14 : 18),
  },
});
