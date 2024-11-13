import { StyleSheet } from "react-native";
import { spacings } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#00BCFF",
    fontSize: spacings["small+"],
    textAlign: "center",
  },
});
