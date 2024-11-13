import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { fontsize, typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowInfo: {
    marginBottom: normalize(20),
  },
  title: {
    fontSize: normalize(isAndroidFontLargest() ? 24 : 28),
    fontWeight: "bold",
    color: "#1B588A",
    textAlign: "center",
    marginBottom: normalize(20),
  },
  text: {
    fontFamily: typography.primary,
    fontSize:normalize(isAndroidFontLargest() ? 14 : 22),
    textAlign: "center",
    color: "#1B588A",
    lineHeight:normalize(isAndroidFontLargest() ? 18 : 22),
  },
  textLink: {
    color: "#00BCFF",
    marginTop: normalize(20),
    marginBottom: normalize(30),
    textDecorationLine: "underline",
  },
  redeemButton: {
    alignSelf: "center",
    width: normalize(isAndroidFontLargest() ? 72 : 68),
    height: normalize(isAndroidFontLargest() ? 72 : 68),
  },
  redeemButtonText: {
    fontSize: normalize(isAndroidFontLargest() ? 11 : 13),
  },
});
