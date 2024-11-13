import { Platform, StyleSheet } from "react-native";
import { spacings, typography } from "../../../../../shared/theme";
import { palette } from "../../../../../shared/theme/palette";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

const isIOS = Platform.OS === "ios";
export const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "column",
    paddingTop: spacings.huge,
    // paddingBottom: spacings.mediumOne,
    paddingHorizontal: spacings.large,
    backgroundColor: "white",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    paddingTop: spacings.tiny,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  dealerLogoWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacings.small,
  },
  notificationBatchCount: {
    position: "absolute",
    right: normalize(isAndroidFontLargest() ? 11 : 12),
    top: normalize(isAndroidFontLargest() ? 1 : 4),
    fontWeight: "700",
    fontSize: normalize(22),
    fontFamily: typography.third,
    color: palette.white,
  },
});
