import { StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacing, spacings } from "../../../../shared/theme";

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  formContainer: {

    top: -35,
  },
  container: {
    backgroundColor: color.transparent,
    padding: 0,
  },
  logoContainer: {
    backgroundColor: color.palette.red,
  },
  logo: {
    alignSelf: "center",
    marginVertical: spacings.large,
    width: 230,
    height: 100,
  },
  alternativeBtn: { marginVertical: spacings.medium, backgroundColor: "transparent", marginHorizontal: spacings.large, alignSelf: "center" },
  alternativeBtnTxt: { color: color.palette.black, textAlign: "center", textDecorationLine: "underline" },
  googleIcon: {
    alignSelf: "center",
    marginVertical: spacings.thin,
    maxWidth: "100%",
    width: 50,
    height: 50,
  },
  loginBtn: {
    marginHorizontal: spacings.huge,
  },
  registerBtn: {
    marginHorizontal: spacings.huge,
  },
  registerBtnTxt: {
    fontSize: fontsize.small,
    fontWeight: 'normal',
    letterSpacing: 0,
    color: color.palette.white,
  },
  footerContainer: {
    paddingVertical: spacings.large,
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: spacings.large
  },
  footerBtn: { alignItems: "center" },
  footerIcon: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: color.primary + "88",
    borderRadius: 50,
  },
  footerBtnTxt: {
    color: color.palette.white,
    marginTop: spacing[2],
    fontSize: 0.032 * screenDimensions.width,
    
  },
  form: {
    zIndex: 999,
    padding: spacings.smaller,
    marginBottom: spacings.large,
  },
  centerButtons: {
    marginVertical: spacings.large,
  },
  styleCircle: {
    opacity: 0.7,
    height:  0.24*screenDimensions.width,
    width: 0.24*screenDimensions.width,
  },
  subTitleText: {
    marginBottom: spacings.huge, 
    fontSize: fontsize.medium, 
    color: color.palette.white,
    textAlign: "center",
  },
});
