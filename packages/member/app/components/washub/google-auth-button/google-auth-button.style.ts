import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  alternativeBtn: {
    height: normalize(45),
    flexDirection: "row",
    marginVertical: 0,
    backgroundColor: "#BDE8F9",
    borderRadius: normalize(100),
  },
  alternativeBtnTxt: {
    color: "#1D1D1D",
    fontSize:   normalize(isAndroidFontLargest() ? 12 : 14),
    fontFamily: typography.bold,
    marginEnd: normalize(4),
    textAlign:'center'
  },
  googleIcon: {
    alignSelf: "center",
    maxWidth: "100%",
    width: normalize(29),
    height: normalize(isAndroidFontLargest() ? 24 : 29),
  },
});
