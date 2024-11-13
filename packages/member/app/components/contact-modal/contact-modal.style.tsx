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
  help: {
    marginTop: 3 * spacings.large,
    marginBottom: spacings.large,
  },
  helpContainer: {
    backgroundColor: color.palette.red,
    width: screenDimensions.width - spacings.large,
    marginHorizontal: 0.5 * spacings.small,
    paddingHorizontal: spacings.huge,
    paddingTop: spacings.medium,
    paddingBottom: spacings.large,
    borderRadius: spacings.borderRadius.smaller,
    alignItems: "center",
  },
  HelpContentBoldText: {
    fontSize: fontsize.mediumOne,
    fontWeight: "700",
    fontFamily: typography.primary,
    paddingTop: spacings.large,
    color: color.palette.white,
  },
  ContactBoldText: {
    fontSize: fontsize.mediumOne,
    fontWeight: "700",
    fontFamily: typography.primary,
    marginTop: spacings.large,
    marginBottom: spacings.huge,
    color: color.palette.white,
    textTransform: "uppercase"
  },
  HelpContentContentText: {
    fontSize: fontsize.small,
    fontWeight: "400",
    fontFamily: typography.primary,
    textAlign: "center",
    color: color.palette.white,
  },
  HelpContentView: {
    marginVertical: spacings.large,
  },
  helpButtonsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: spacings.large,
    alignItems: "flex-end"
  },
  iconText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: spacings.tiny,
    fontFamily: typography.secondary
  },
  modalHeadView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  phoneIconsStyle: {
    width: normalize(30),
    height: normalize(30),
    marginBottom: spacings.tiny
  },
  textIconsStyle: {
    width: normalize(35),
    height: normalize(35),
    marginBottom: spacings.tiny
  },
  emailIconsStyle: {
    width: normalize(45),
    height: normalize(30),
    marginBottom: spacings.tiny
  },
 closeIconsStyle: {
    width: normalize(35),
    height: normalize(35),
    marginBottom: spacings.tiny
  }
});
