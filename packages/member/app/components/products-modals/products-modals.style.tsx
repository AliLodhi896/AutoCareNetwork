import { color, spacings, fontsize } from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Modal
  container: {
    width: "100%",
    backgroundColor: color.primary,
    borderWidth: spacings.small,
    borderRadius: spacings.borderRadius.small,
    borderColor: color.primary,
    margin: spacings.medium,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: color.transparentWhite,
    paddingBottom: spacings.small,
  },
  title: {
    fontSize: fontsize.medium,
    color: color.palette.white,
    textAlign: "center",
  },
  body: {
    paddingHorizontal: spacings.medium,
    paddingTop: spacings.medium,
  },
  text: {
    color: color.palette.white,
    lineHeight: spacings["medium+"],
    marginBottom: spacings.medium,
  },
  confirmBtn: { alignItems: "center", marginVertical: spacings.small },
  buttonsContainer: {
    paddingHorizontal: spacings.medium,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
