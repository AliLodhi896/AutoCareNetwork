import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { fontsize, typography } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(20),
  },

  text: {
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    fontWeight: "bold",
    lineHeight: normalize(25),
    color: "#00BCFF",
  },
  smText: {
    fontSize: fontsize.tiny,
  },
});
