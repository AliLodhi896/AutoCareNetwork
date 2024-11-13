import { screenDimensions } from './../../../../shared/theme/spacing';
import { StyleSheet } from "react-native";
import { color, fontsize, spacing, spacings, typography } from "../../../../shared/theme";
import { normalize } from '../../../../shared/utils/normalize';

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  formContainer: {
    top: -35,
    height: 0.8*screenDimensions.height,
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
    marginHorizontal: 0.1*screenDimensions.width,
  },
  registerBtn: {
    marginHorizontal: 0.1*screenDimensions.width,
  },
  registerBtnTxt: {
    fontSize: fontsize.small,
    fontFamily: typography.primary,
    letterSpacing: 0,
    fontWeight: '500',
    color: color.palette.white
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
    fontSize: 0.029*screenDimensions.width,
  },
  form: {
    padding: spacings.smaller
  },
  innerForm: {
    minHeight: screenDimensions.height - normalize(200),
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: spacings.large,
  },
  centerButtons: {
    marginVertical: spacings.large,
  },
  styleCircle: {
    opacity: 0.7,
    height:  0.24*screenDimensions.width,
    width: 0.24*screenDimensions.width,
  },
  loginBtnText: {
    fontSize: fontsize.small,
    fontFamily: typography.primary,
    fontWeight: '500',
    color: color.palette.white
  },
  infoImage: {
    height: normalize(54),
    width: normalize(54),
  },
});

