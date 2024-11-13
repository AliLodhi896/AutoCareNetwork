import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet, Platform } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(8),
  },
  title: {
    fontSize: normalize(18),
    color: "#1D1D1D",
    fontFamily: typography.primary,
    flexWrap: "wrap",
    flex: 1,
  },
  baseText: {
    fontSize: normalize(16),
    color: "#1D1D1D",
    fontFamily: typography.primary,
    letterSpacing: normalize(0.15),
  },
  description: {
    flexWrap: "wrap",
    flex: 1,
    paddingRight: normalize(10),
    letterSpacing: normalize(0.15),
  },
  btnAction: {
    fontFamily: typography.primary,
    color: "#00BCFF",
    fontSize: normalize(18),
    letterSpacing: normalize(0.15),
  },
});
