import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.transparent
  },
  backBtnView: {
    flexDirection: "row",
    height: 45,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    paddingRight: spacings.smaller,
  },
  header: {
    backgroundColor: color.palette.red,
    flexDirection: "column",
    height: 0.26 * screenDimensions.height,
  },
  logoView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 100,
  },
  titleView: {
    width: "100%",
    alignItems: "center",
    marginTop: spacings.smaller,
    color: color.palette.white,
  },
  title: {
    fontSize: fontsize.large,
    fontFamily: typography.primary,
    color: color.palette.white,
  },
  registerBtn: {
    padding: spacings.medium,
    backgroundColor: color.palette.red,
    alignItems: "center",
    width: 0.8*screenDimensions.width,
    alignSelf: "center",
    borderRadius: spacings.borderRadius.smaller,
    marginVertical: spacings.medium,
  },
  form: {
    padding: spacings.smaller,
  },
  help: {
    marginTop: 3 * spacings.large,
    marginBottom: spacings.large,

  },
  helpInner: { marginHorizontal: spacings.massive },
  helpContainer: {
    backgroundColor: color.palette.red,
    width: "100%",
    marginHorizontal: 0.5 * spacings.small,
    padding: spacings.large,
    borderRadius: spacings.borderRadius.smaller,
    alignItems: "center",
  },
  HelpContentBoldText: {
    fontSize: fontsize.medium,
    fontWeight: "600",
    fontFamily: typography.primary,
  },
  ContactBoldText: {
    fontSize: fontsize["medium+"],
    fontWeight: "600",
    fontFamily: typography.primary,
    marginTop: spacings.medium,
    marginBottom: spacings.huge
  },
  HelpContentContentText: {
    fontSize: fontsize.small,
    fontWeight: "400",
    fontFamily: typography.primary,
    textAlign: "center",
  },
  HelpContentView: {
    marginVertical: spacings.large,
  },
  helpButtonsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  checkboxRow: {
    flex: 1,
    width: 290,
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacings.small,
  },
  checkboxText: {
    fontSize: fontsize.mediumOne,
    marginRight: spacings["medium+"],
    color: color.palette.white
  },
  zepRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  zepRowContainer: {
    flexDirection: 'row',
    width: 290,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  zepImage: {
    width: 60,
    height: 30,
  },
  text20: {
    fontSize: fontsize.mediumOne,
    color: color.palette.white,
  },
  helpText: {
    color: color.palette.white,
    opacity: 0.7
  },
  styleCircle: {
    opacity: 0.7
  },
  footerBtnTxt: {
    color: color.palette.white,
    marginTop: spacings.tiny,
    fontSize: 12,
    marginBottom: spacings.large
    
  },
  helpIconStyle: {
    width: normalize(56),
    height: normalize(56),
  },
  sideCircle: {
    height: 0.27 * screenDimensions.width,
    width: 0.27 * screenDimensions.width,
    borderRadius: 0.135 * screenDimensions.width,
  },
  sideText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: spacings.tiny,
    fontFamily: typography.secondary
  },
});
