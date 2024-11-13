import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(8),
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1B588A",
    paddingHorizontal: normalize(23),
    paddingTop: normalize(22),
  },
  head: {
    alignItems: "flex-end",
    flex: 2,
    justifyContent: "space-between",
  },
  body: {
    flex: 10,
    paddingTop: normalize(20),
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: normalize(isAndroidFontLargest ? 18 : 20),
    fontFamily: typography.bold,
    alignSelf: "flex-start",
    width: "100%",
    //paddingTop: normalize(isAndroidFontLargest ? 15 : 20),
  },
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: normalize(isAndroidFontLargest ? 14 : 16),
    fontFamily: typography.primary,
    lineHeight: normalize(23),
  },
  bullet: {
    fontSize: fontsize.thin,
    color: "#ffffff",
    marginRight: normalize(10),
  },
  spacer: {
    paddingTop: normalize(30),
  },
});
