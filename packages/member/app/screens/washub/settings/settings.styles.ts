import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { typography } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  backContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    color: "#1B588A",
    fontFamily: typography.bold,
    fontSize: normalize(16),
  },
  backButtonXS: {
    fontSize: normalize(12),
    marginRight: normalize(5),
  },
});
