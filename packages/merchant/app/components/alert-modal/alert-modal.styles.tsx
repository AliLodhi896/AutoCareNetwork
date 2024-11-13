import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  help: {
    marginTop: 3 * spacings.large,
    marginBottom: spacings.large,
  },
  helpContainer: {
    backgroundColor: color.palette.red,
    width: screenDimensions.width - spacings.large,
    marginHorizontal: 0.5 * spacings.small,
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.medium,
    borderRadius: spacings.borderRadius.smaller,
    alignItems: "center",
  },
  AlertModalBoldText: {
    fontSize: 0.055*screenDimensions.width,
    fontWeight: "700",
    fontFamily: typography.primary,
    paddingTop: spacings.medium,
    color: color.palette.white,
    textTransform: "uppercase"
  },
  AlertModalContentText: {
    fontSize: fontsize.small,
    fontWeight: "400",
    fontFamily: typography.primary,
    textAlign: "center",
    color: color.palette.white,
  },
  AlertModalView: {
    marginVertical: spacings.large,
  },
  helpButtonsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  iconText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: spacings.tiny,
  },
  modalHeadView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  circle: {
    height: 0.22 * screenDimensions.width,
    width: 0.22 * screenDimensions.width,
    borderRadius: 0.11 * screenDimensions.width,
    borderWidth: spacings.tiny,
    borderColor: color.palette.white,
    backgroundColor: color.transparent,
  },
  circleText: {
    fontSize: 0.08*screenDimensions.width,
    color: color.palette.white,
  }
});
