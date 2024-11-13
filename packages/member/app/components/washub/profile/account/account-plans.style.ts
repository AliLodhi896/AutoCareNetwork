import { StyleSheet } from "react-native";
import { fontsize, spacings, typography } from "../../../../../../shared/theme";
import { normalize } from "../../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: normalize(20),
  },
  actionButton: {
    alignSelf: "center",
    width: normalize(66),
    height: normalize(66),
    marginTop: normalize(20),
  },
  box: {
    borderRadius: spacings.smaller,
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#FFFFFF",
    marginTop: spacings["small+"],
    padding: spacings["small+"],
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    fontFamily: typography.primary,
    fontSize: normalize(25),
    lineHeight: normalize(29),
    textAlign: "center",
    marginTop: normalize(10),
    marginBottom: normalize(5),
  },
  text: {
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    lineHeight: fontsize.mediumOne,
    textAlign: "center",
    marginTop: normalize(5),
  },
  error: {
    color: "red",
    marginTop: normalize(5),
  },
  link: {
    textTransform: "uppercase",
    color: "#00BCFF",
    fontSize: normalize(18),
  },
  actions: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginTop: normalize(15),
  },
});
