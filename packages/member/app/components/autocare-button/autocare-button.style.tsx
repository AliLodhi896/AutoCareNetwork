import { Platform, StyleSheet } from "react-native";
import { spacings } from "../../../../shared/theme";

const PADDING = Platform.OS === "ios" ? 0 : 4;
export const HEIGHT = 42 + PADDING;
export const AUTOCARE_COLOR = "#36B2F5";
const AUTOCARE_COLOR_DARK = "#2784B7";
export const WIDTH = 264;
export const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    // padding: PADDING,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: WIDTH,
    // backgroundColor: AUTOCARE_COLOR,
    // paddingHorizontal: 10,
  },
  dealerBundleButton: {
    // backgroundColor: '#f9ad40',
    borderColor: "#f9ad40",
  },
  border: {
    // borderWidth: 1.5,
    borderColor: "#D72323",
    borderRadius: spacings.borderRadius.small,
  },
  borderCaption: {
    color: "#D72323",
    fontSize: 14,
    fontWeight: "600",
    width: WIDTH,
  },
  primaryButton: {
    borderRadius: 2,
  },
  secondaryButton: {
    borderRadius: spacings.borderRadius.small,
    borderColor: AUTOCARE_COLOR_DARK,
    // borderWidth: 1,
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // width: 230,
    // elevation: 2,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
  },
  borderButton: {
    backgroundColor: "transparent",
  },
  secondaryCaption: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    width: "100%",
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  primaryCaption: {
    color: "white",
  },
});
