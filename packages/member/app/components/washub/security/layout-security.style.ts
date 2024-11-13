import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { screenDimensions, typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  layoutHeader: {
    flex: 8,
    width: screenDimensions.width - normalize(40),
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "center",

    // borderWidth: 1,
    // borderBottomColor: "#FFFFFF",
  },
  backContainer: {
    marginTop: normalize(15),
    height: normalize(20),
  },
  backPressable: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  backButton: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: normalize(16),
    lineHeight: normalize(18),
  },
  backButtonXS: {
    fontSize: normalize(12),
    marginRight: normalize(5),
  },
  layoutBody: {
    flex: 22,
    alignSelf: "center",
    width: screenDimensions.width - normalize(40),
    // borderWidth: 1,
    // borderColor: "pink",
  },
  lauoutFooterBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: normalize(60),
  },
  layoutFooter: {
    // borderWidth: 1,
    // borderColor: "green",
    flex: 6,
  },
  footerTouchable: {
    // borderWidth: 1,
    // borderColor: "red",
    marginTop: normalize(isAndroidFontLargest() ? 5 : 15),
    width: normalize(isAndroidFontLargest() ? 110 : 90),
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerIconWrapper: {
    marginBottom: normalize(15),
  },
  footerText: {
    color: "#fff",
    fontSize: normalize(16),
    lineHeight: normalize(18),
    textAlign: "center",
  },
});
