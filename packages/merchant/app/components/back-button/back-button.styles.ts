import { StyleSheet } from "react-native";
import { color } from "../../../../shared/theme";

export const styles = StyleSheet.create({
  backBtnView: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    color: color.palette.white,
  }
});
