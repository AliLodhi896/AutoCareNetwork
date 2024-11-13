import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BCFF",
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: normalize(isAndroidFontLargest() ? 13 : 14),
    textAlign: "center",
  },
});
