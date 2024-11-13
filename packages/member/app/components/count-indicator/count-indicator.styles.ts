import { StyleSheet } from "react-native";
import { color } from "../../../../shared/theme";

export const styles = StyleSheet.create({
  bubble: {
    borderRadius: 20,
    backgroundColor: color.palette.lightGreyBackground,
    height: 20,
    width: 89,
    display: "flex",
    flexDirection: "row",
    padding: 3,
    justifyContent: "flex-start",
  },
  circle: {
    height: 14,
    width: 14,
    marginRight: 3,
    backgroundColor: color.palette.red,
    borderRadius: 20,
  },
});