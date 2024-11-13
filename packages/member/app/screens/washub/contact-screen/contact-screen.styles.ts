import { typography } from "./../../../../../shared/theme/typography";
import { StyleSheet } from "react-native";
import {
  color,
  fontsize,
  screenDimensions,
  spacing,
  spacings,
} from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperBody: {},
  wrapperLogo: {},
  wrapperFooter: {},

  //TODO: remove bellow
  flex1: {
    flex: 1,
  },
  formContainer: {
    top: -35,
    height: 0.8 * screenDimensions.height,
  },
  // container: {
  //   backgroundColor: color.transparent,
  //   padding: 0,
  // },
  logoContainer: {
    backgroundColor: color.palette.red,
    height: normalize(200),
    width: "100%",
  },
  logo: {
    alignSelf: "center",
    width: normalize(200),
    transform: [{ scale: 1.3 }],
    height: normalize(150),
  },
  alternativeBtn: {
    marginTop: spacings.mediumOne,
    marginBottom: spacings.large,
    backgroundColor: "transparent",
    marginHorizontal: spacings.large,
    alignSelf: "center",
  },
  alternativeBtnTxt: {
    color: color.palette.black,
    opacity: 0.8,
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: fontsize.medium,
  },
  googleIcon: {
    alignSelf: "center",
    marginVertical: spacings.thin,
    maxWidth: "100%",
    width: normalize(55),
    height: normalize(55),
  },
  loginBtn: {
    marginHorizontal: spacings.huge,
    marginTop: spacings.mediumOne,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  infoText: { opacity: 0.8, fontSize: fontsize.small },
  infoImage: {
    height: normalize(54),
    width: normalize(54),
  },
  loginBtnText: {
    fontSize: fontsize.small,
    fontFamily: typography.primary,
    fontWeight: "500",
    color: color.palette.white,
  },
  registerBtn: {
    marginHorizontal: spacings.huge + spacings.smaller,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  registerBtnTxt: {
    fontSize: fontsize.small,
    fontFamily: typography.primary,
    letterSpacing: 0,
    fontWeight: "500",
    color: color.palette.white,
  },
  footerContainer: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: spacings.large,
  },
  footerBtn: { alignItems: "center" },
  footerIcon: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: color.primary + "88",
    borderRadius: 50,
  },
  footerBtnTxt: {
    color: color.palette.black,
    marginTop: spacing[2],
    fontSize: fontsize.tiny,
  },
  form: {
    padding: spacings.smaller,
  },
  styleCircle: {
    height: 0.24 * screenDimensions.width,
    width: 0.24 * screenDimensions.width,
  },
  innerForm: {
    minHeight: screenDimensions.height - normalize(200),
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: spacings.large,
  },
});
