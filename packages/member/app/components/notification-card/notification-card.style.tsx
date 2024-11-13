import { color, spacings } from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacings.medium,
    paddingBottom: spacings.medium,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.lighterGrey,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    justifyContent: "center",
  },
  title: {
    color: color.palette.black,
    fontWeight: "800",
  },
  content: {
    color: color.palette.black,
  },
  date: {
    color: color.palette.black,
    fontStyle: "italic",
  },

  seeMoreIconContainer: { paddingVertical: 20, paddingHorizontal: 10 },
  menuOptions: {
    borderWidth: 1,
    borderColor: color.palette.lightGreyBackground,
    borderRadius: 5,
    padding: 10,
  },
  menuOption: { flexDirection: "row", alignItems: "center" },
  saveLaterText: { color: "green", paddingLeft: 10, bottom: 2 },
  deleteText: { color: "red", paddingLeft: 10 },
});
