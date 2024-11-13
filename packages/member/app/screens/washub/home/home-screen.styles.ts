import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../../shared/theme";
import { Platform, StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { palette } from "../../../../../shared/theme/palette";

const isAndroid = Platform.OS == "android";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: spacings.medium,
  },
  titleView: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: spacings["medium+"],
    paddingBottom: spacings["small+"],
  },
  title: {
    color: "#1B588A",
    fontSize: fontsize.large,
    fontFamily: typography.primary,
  },
  noCardsView: {
    flexDirection: "column",
    alignItems: "center",
    height: normalize(195),
    width: normalize(320),
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: spacings.smaller,
    alignSelf: "center",
  },
  noCardsText: {
    fontSize: fontsize.medium,
  },
  bottomView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  centerCircle: {
    height: screenDimensions.width / 2.41,
    width: screenDimensions.width / 2.41,
    borderRadius: screenDimensions.width / 2,
    backgroundColor: "#1B588A",
  },
  bntCircle: {
    height: screenDimensions.width / 2.41,
    width: screenDimensions.width / 2.41,
  },
  centerText: {
    fontSize: normalize(22),
    color: color.palette.white,
    paddingTop: 3 * spacings.tiny,
    paddingHorizontal: normalize(30),
    textAlign: "center",
    lineHeight: normalize(24),
  },

  loader: {
    margin: spacings["medium+"],
    alignSelf: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  vehicle: {
    width: spacings.large,
    height: spacings.large,
    marginBottom: spacings.tiny,
  },
});
