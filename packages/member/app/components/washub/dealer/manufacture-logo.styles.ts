import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  manufacturerTitle: {
    fontSize: normalize(10),
    fontFamily: typography.primary,
    fontWeight: "500",
  },
  manufacturerLogoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  manufacturerLogo: {
    height: normalize(69),
    alignSelf: "center",
    transform: [{ scale: 1.03 }],
    width: normalize(69),
    borderRadius: 10,
  },
});
