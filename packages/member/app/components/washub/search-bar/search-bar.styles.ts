import { Platform, StyleSheet } from "react-native";
import { color, spacings, typography } from "../../../../../shared/theme";
import { screenDimensions } from "../../../../../shared/theme/spacing";
import { shadower } from "../../../../../shared/utils/common";
import { normalize } from "../../../../../shared/utils/normalize";

const isIos = Platform.OS === "ios";

export const styles = StyleSheet.create({
  searchBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: normalize(15),
    borderRadius: normalize(12),
    backgroundColor: color.palette.white,
    elevation: 4,
    borderWidth: normalize(5),
    borderColor: "#E2E2E2",
    paddingLeft: normalize(20),
    paddingVertical: normalize(12),
    ...shadower(2),
  },
  container: {
    // position: isIos ? "relative" : "absolute",
    position: "absolute",
    width: screenDimensions.width,
    top: normalize(20),
    // top: Platform.select({
    //   android: 1.5 * spacings.massive,
    //   ios: 1.7 * spacings.massive,
    // }),
    zIndex: 999,
    flexDirection: "column",
    paddingHorizontal: spacings.tiny,
  },
  progress: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  searchIcon: {
    marginRight: normalize(20),
    height: normalize(23),
    width: normalize(29),
  },
  searchField: {
    flex: 1,
    fontFamily: typography.primary,
    textAlignVertical: "center",
    padding: 0,
    margin: 5,
    color: "#969696",
    fontSize: normalize(20),
  },
  header: {
    paddingTop: Platform.select({ android: 20 }),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
