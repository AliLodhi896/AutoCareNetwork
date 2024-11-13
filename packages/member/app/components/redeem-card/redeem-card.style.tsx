import { color, fontsize, spacings } from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: color.primary + "40",
    marginBottom: spacings.small,
    paddingVertical: spacings.small,
    justifyContent: "space-between",
  },
  rightContainer: {
    justifyContent: "space-between",
  },
  rectangle: {
    backgroundColor: color.palette.lightGreyBackground,
    height: 20,
    width: "100%",
    borderRadius: spacings.borderRadius.small,
  },
  name: {
    fontWeight: "bold",
    color: color.palette.black,
  },
  others: {
    color: color.palette.black,
  },
  type: {
    fontWeight: "bold",
    marginLeft: spacings.medium,
    fontSize: fontsize.small,
    color: color.palette.black,
  },
  miles: {
    fontWeight: "bold",
    color: color.primary,
    textAlign: "right",
  },
  textSpace: {
    paddingBottom: spacings.tiny,
  },
});
