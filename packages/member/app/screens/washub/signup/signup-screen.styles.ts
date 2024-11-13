import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../../shared/theme";

import { Platform, StyleSheet } from "react-native";

import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formBox: {
    paddingHorizontal: normalize(10),
    marginVertical: normalize(10),
  },
  btnContainer: {
    marginTop: normalize(30),
    width: normalize(260),
    flexDirection: "column",
    alignSelf: "center",
  },
  loginBtn: {
    backgroundColor: "#00BCFF",
    borderRadius: normalize(100),
    padding: 0,
    marginVertical: 0,
    height: normalize(45),
  },
  loginBtnText: {
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    letterSpacing: 0,
  },
  loginBtnContainer: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlignc: "center",
  },
  errorText: {
    color: "#FF0000",
  },

  // container: {
  //   backgroundColor: color.transparent,
  // },
  // backBtnView: {
  //   flexDirection: "row",
  //   height: 45,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },
  // backBtn: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   height: "100%",
  //   paddingRight: spacings.smaller,
  // },
  // logoView: {
  //   width: "100%",
  //   alignItems: "center",
  // },
  // logo: {
  //   width: normalize(200),
  //   transform: [{ scale: 1.5 }],
  //   height: normalize(90),
  // },
  // titleView: {
  //   width: "100%",
  //   alignItems: "center",
  //   marginTop: Platform.select({ android: 20, default: 10 }),
  //   marginVertical: spacings.smaller,
  // },
  // title: {
  //   fontSize: normalize(28),
  //   fontWeight: "400",
  //   fontFamily: typography.primary,
  //   color: color.palette.white,
  // },
  // registerBtn: {
  //   paddingVertical: spacings.small,
  //   width: 0.7 * screenDimensions.width,
  //   backgroundColor: color.palette.red,
  //   alignItems: "center",
  //   alignSelf: "center",
  //   borderRadius: spacings.borderRadius.smaller,
  //   marginVertical: spacings.medium,
  // },
  // form: {
  //   padding: spacings.smaller,
  //   paddingBottom: spacings.large,
  // },
  // help: {
  //   marginTop: 3 * spacings.large,
  //   marginBottom: spacings.large,
  // },
  // helpInner: { marginHorizontal: spacings.massive },
  // helpContainer: {
  //   backgroundColor: color.palette.red,
  //   width: "100%",
  //   marginHorizontal: 0.5 * spacings.small,
  //   padding: spacings.large,
  //   borderRadius: spacings.borderRadius.smaller,
  //   alignItems: "center",
  // },
  // HelpContentBoldText: {
  //   fontSize: fontsize.medium,
  //   fontWeight: "600",
  //   fontFamily: typography.primary,
  // },
  // ContactBoldText: {
  //   fontSize: fontsize["medium+"],
  //   fontWeight: "600",
  //   fontFamily: typography.primary,
  //   marginTop: spacings.medium,
  //   marginBottom: spacings.huge,
  // },
  // HelpContentContentText: {
  //   fontSize: fontsize.small,
  //   fontWeight: "400",
  //   fontFamily: typography.primary,
  //   textAlign: "center",
  // },
  // HelpContentView: {
  //   marginVertical: spacings.large,
  // },
  // helpButtonsView: {
  //   flexDirection: "row",
  //   width: "100%",
  //   justifyContent: "space-between",
  // },
  // helpIconStyle: {
  //   width: normalize(56),
  //   height: normalize(56),
  // },
  // sideCircle: {
  //   height: 0.27 * screenDimensions.width,
  //   width: 0.27 * screenDimensions.width,
  //   borderRadius: 0.135 * screenDimensions.width,
  // },
  // sideText: {
  //   fontSize: fontsize.tiny,
  //   color: color.palette.black,
  //   paddingTop: spacings.tiny,
  //   fontFamily: typography.secondary,
  // },
  // registerBtnTxt: {
  //   fontSize: fontsize.small,
  //   fontFamily: typography.primary,
  //   letterSpacing: 0,
  //   fontWeight: "500",
  //   color: color.palette.white,
  // },
});
