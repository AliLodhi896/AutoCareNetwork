
import { StyleSheet } from "react-native";
import { color, screenDimensions } from "../../theme";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: color.palette.lightGreyBackground,
    flexDirection: "column",
    position: "absolute",
    top: 0
  },
  leftView: {
    height: "100%",
    alignItems: "center",
    minWidth: 0.18 * screenDimensions.width
  },
  centerView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"

  },
  rightView: {
    height: "100%",
    alignItems: "center",

  },
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-between",
  }
});
