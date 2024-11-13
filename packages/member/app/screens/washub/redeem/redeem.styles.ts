import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../../shared/theme";
import { Platform, StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

const isAndroid = Platform.OS == "android";

export const styles = StyleSheet.create({
  title: {
    color: "#1B588A",
    fontSize: fontsize.large,
    fontFamily: typography.primary,
    fontWeight: "bold",
    marginTop: spacings["medium+"],
    marginBottom: spacings["mediumOne+"],
    textAlign: "center",
  },
  buttonsWrapper: {
    marginBottom: spacings["medium"],
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: normalize(50),
  },
  btnCircle: {
    height: normalize(104),
    width: normalize(104),
  },
  // centerCircle: {
  //   height: normalize(104),
  //   width: normalize(104),
  //   borderRadius: normalize(104),
  //   backgroundColor: "#1B588A",
  // },
  // centerText: {
  //   fontSize: normalize(15),
  //   color: color.palette.white,
  //   marginTop: spacings.tiny,
  //   paddingHorizontal: normalize(10),
  //   textAlign: "center",
  //   lineHeight: normalize(16),
  // },
  wrapperList: {
    display: "flex",
  },
});
