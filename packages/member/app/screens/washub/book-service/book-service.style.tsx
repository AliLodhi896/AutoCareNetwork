import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  emtpyList: {
    textAlign: "center",
    fontSize: fontsize["mediumOne+"],
    fontFamily: typography.primary,
  },
});
