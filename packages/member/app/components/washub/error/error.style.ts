import { Platform, StyleSheet } from "react-native";
import { fontsize } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: fontsize.medium,
    textAlign: "center",
  },
});
