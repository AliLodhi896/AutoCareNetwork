import { StyleSheet } from "react-native";
import { color, spacings } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  headerMenu: {
    flexDirection: "row",
    padding: spacings.small,
    justifyContent: "space-between",
  },
  letterContainer: {
    height: spacings.huge,
    width: spacings.huge,
    display: "flex",
    marginRight: spacings.medium,
  },
  profileButton: {
    height: "100%",
    width: "100%",
    backgroundColor: color.palette.lightBlue,
    borderRadius: spacings.massive,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonTxt: {
    color: color.palette.white,
    fontSize: spacings.mediumOne,
    fontWeight: "bold",
  },
});
