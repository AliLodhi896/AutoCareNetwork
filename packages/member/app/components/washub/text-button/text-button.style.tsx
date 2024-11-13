import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: normalize(30),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    fontWeight: "bold",
    lineHeight: normalize(25),
    color: "#1B588A",
  },
  smText: {
    fontSize: fontsize.tiny,
  },
});
