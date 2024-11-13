import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { fontsize, typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: normalize(32),
    fontWeight: "bold",
    color: "#1B588A",
    textAlign: "center",
  },

  box: {
    borderRadius: normalize(8),
    backgroundColor: "#1B588A",
    paddingVertical: normalize(31),
    paddingHorizontal: normalize(isAndroidFontLargest() ? 5 : 37),
    marginTop: normalize(isAndroidFontLargest() ? 20 : 57),
  },
  boxTitle: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: fontsize.mediumOne,
    textAlign: "center",
    marginBottom: normalize(10),
  },
  text: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    textAlign: "center",
  },
  actionLink: {
    color: "#00BCFF",
    fontFamily: typography.bold,
    textTransform: "uppercase",
    fontSize: fontsize.medium,
    textAlign: "center",
    marginTop: normalize(60),
  },
  actionLinkXS: {
    fontSize: fontsize["tiny-"],
    marginLeft: normalize(3),
  },
  linksWrapper: {
    marginTop: normalize(isAndroidFontLargest() ? 0 : 40),
    display: "flex",
    alignSelf: "center",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
