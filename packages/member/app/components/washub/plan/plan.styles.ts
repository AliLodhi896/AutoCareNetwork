import { StyleSheet } from "react-native";
import { color, spacings, typography } from "../../../../../shared/theme";
import { palette } from "../../../../../shared/theme/palette";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: normalize(320),
    borderRadius: spacings.smaller,
    borderColor: "#1B588A",
    borderWidth: 5,
    marginTop: spacings["small+"],
    alignSelf: "center",
    paddingHorizontal: spacings["mediumOne+"],
    padding: spacings["small+"],
    paddingTop: spacings.smaller,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: spacings.mediumOne,
    fontWeight: "bold",
    fontFamily: typography.bold,
  },
  secondText: {
    fontSize: spacings["small+"],
    fontFamily: typography.primary,
  },
});
