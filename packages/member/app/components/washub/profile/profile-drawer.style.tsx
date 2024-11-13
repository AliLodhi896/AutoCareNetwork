import { StyleSheet } from "react-native";
import { color, spacings, typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.mediumOne,
  },
  flatList: {
    marginTop: normalize(isAndroidFontLargest() ? 10 : 15),
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: normalize(10),
  },
  menuCardText: {
    marginHorizontal: spacings.tiny,
    fontSize: normalize(19),
    fontFamily: typography.bold,
  },
  menuIcon: {
    marginTop: spacings.smaller,
  },
  customMenu: {
    flex: 1,
  },
  customTop: {
    justifyContent: "flex-start",
    flex: 1,
  },
  customBody: {
    flex: 13,
  },
  backContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    color: "#1B588A",
    fontFamily: typography.bold,
    fontSize: normalize(16),
  },
  backButtonXS: {
    fontSize: normalize(12),
    marginRight: normalize(5),
  },
  customMenuTitle: {
    fontSize: spacings.mediumOne,
    fontFamily: typography.bold,
    color: color.palette.deepBlue,
  },
});
