import {
  color,
  fontsize,
  screenDimensions,
  spacings,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.6 * screenDimensions.height,
    backgroundColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    width: 0.9 * screenDimensions.width,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    marginVertical: spacings.medium,
  },
  entitlementScroll: {
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.large,
  },

  advanceEntitlementsButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacings.medium,
  },
  advanceEntitlementsButtonText: {
    fontSize: fontsize["medium+"],
    fontWeight: "500",
    color: color.palette.white,
  },
});
