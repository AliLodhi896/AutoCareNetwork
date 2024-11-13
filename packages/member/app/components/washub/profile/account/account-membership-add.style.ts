import { StyleSheet } from "react-native";
import { fontsize, typography } from "../../../../../../shared/theme";
import { normalize } from "../../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  title: {
    fontSize: normalize(20),
    color: "#1D1D1D",
    fontFamily: typography.bold,
    textTransform: "uppercase",
    textAlign: "center",
  },
  actionContainer: {
    alignItems: "center",
    marginTop: normalize(57),
  },
  actionButton: {
    width: normalize(71),
    height: normalize(71),
  },
  label: {
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    lineHeight: fontsize.mediumOne,
    textTransform: "uppercase",
    marginTop: normalize(20),
  },
  input: {
    fontFamily: typography.primary,
    fontSize: normalize(21),
    paddingLeft: normalize(5),
    paddingVertical: normalize(5),
    borderBottomColor: "#00BCFF",
    borderBottomWidth: normalize(1),
  },
});
