import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet, Platform } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: normalize(366),
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    paddingHorizontal: normalize(22),
    paddingTop: normalize(8),
    paddingBottom: normalize(66),
  },
  title: {
    color: "#1D1D1D",
    fontSize: fontsize.mediumOne,
    fontFamily: typography.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
    lineHeight: normalize(28),
  },
  text: {
    fontSize: fontsize.medium,
    color: "#1D1D1D",
    fontFamily: typography.primary,
    lineHeight: normalize(22),
  },
  textLabel: {
    fontSize: fontsize.medium,
    color: "#1D1D1D",
    fontFamily: typography.primary,
    lineHeight: normalize(22),
    fontWeight: "bold",
    marginRight: 2,
  },
  buttonAction: {
    position: "absolute",
    bottom: normalize(-40),
    alignSelf: "center",
  },
});
