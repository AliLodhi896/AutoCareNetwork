import {
  color,
  fontsize,
  Radii,
  screenDimensions,
  spacings,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.85 * screenDimensions.height,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    minHeight: 0.80 * screenDimensions.height,
    paddingVertical: spacings.tiny,
    width: screenDimensions.width - spacings.large
  },
  entitlementScroll: {
    flex: 1,
    backgroundColor: color.palette.red,
    minHeight: 0.80 * screenDimensions.height,
    width: screenDimensions.width - spacings.large,
    borderRadius: Radii.large
  },

  advanceEntitlementsButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spacings.medium,
    paddingTop: spacings.large
  },
  advanceEntitlementsButtonText: {
    fontSize: fontsize["medium+"],
    fontWeight: "500",
    color: color.palette.white,
  },
  bottomView: {
    flex:1, 
    justifyContent: 'flex-end', 
    width: '100%'
  }
});
