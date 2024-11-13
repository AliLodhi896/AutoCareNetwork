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
  redeemContainer: {
    backgroundColor: color.palette.red,
    width: screenDimensions.width - spacings.large,
    padding: spacings.medium,
    paddingRight: spacings.large,
    borderRadius: spacings.borderRadius.smaller,
    alignItems: "center",
  },
  redeemContentBoldText: {
    fontSize: 1.2 * fontsize.large,
    fontWeight: "500",
    fontFamily: typography.primary,
    marginTop: spacings.large,
    marginBottom: spacings.large,
    color: color.palette.white,
    textAlign: "center",
  },

  redeemButtonsView: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: spacings.medium,
  },
  redeemTextFavorite: {
    fontSize: fontsize.medium,
    color: color.palette.white,
    fontFamily: typography.primary,
    textAlign: 'center'
  },
  redeemTextLocation: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: 0.8 * spacings.small,
    fontFamily: typography.primary,
    textAlign: 'center',
    minWidth: normalize(75)
  },
  redeemTextCancel: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    fontFamily: typography.primary,
    paddingTop: 0.8 * spacings.small,
    textAlign: 'center',
    minWidth: normalize(75)
  },
  leftCancel: { paddingLeft: spacings.small },
});
