import {
  color,
  spacing,
  fontsize,
  typography,
  spacings,
} from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: spacing[1],
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomColor: color.palette.red + "69",
    borderRadius: spacings.borderRadius.small,
    marginVertical: spacings["medium+"],
  },
  label: {
    fontSize: fontsize.medium,
    color: color.palette.black,
  },
  textInput: {
    fontSize: fontsize.medium,
    paddingVertical: 0,
    paddingLeft: spacings.medium,
    fontFamily: typography.primary,
    color: color.palette.black,
    flex: 1,
  },
});
