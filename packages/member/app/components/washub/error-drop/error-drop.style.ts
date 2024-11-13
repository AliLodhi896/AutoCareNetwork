import { Platform, StyleSheet } from "react-native";
import { fontsize } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    flexDirection: "column",
    borderRadius: normalize(8),
    marginTop: normalize(24),
    backgroundColor: "#1B588A",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: normalize(25),
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: fontsize.medium,
    textAlign: "center",
    marginTop: normalize(15),
  },
});
