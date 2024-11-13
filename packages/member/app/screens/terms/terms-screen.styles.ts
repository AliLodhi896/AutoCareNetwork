import { fontsize } from "../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { color, screenDimensions, spacings } from "../../../../shared/theme";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { screenStyles } from "../../../../shared/components/screen/screen.styles";

export const styles = StyleSheet.create({
  container: screenStyles.container,
  footer: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    bottom: -0.04 * screenDimensions.height,
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: fontsize.huge,
    color: color.palette.black,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  header: {
    marginLeft: 10,
  },
  entitlementAlert: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "white",
  },
  containerInner: {
    position: "relative",
    ...cardStyles.card,
    paddingHorizontal: 0,
    paddingVertical: spacings.tiny,
    justifyContent: "center",
    borderRadius: spacings.borderRadius.large,
  },
  profileIcon: {
    marginTop: -40,
    marginBottom: spacings.medium,
  },
  htmlBody: { padding: 10, fontSize: 16, color: "#222" },
  buttonStyle: {
    fontSize: fontsize.tiny,
    fontWeight: "400",
    letterSpacing: 0.4,
    paddingHorizontal: spacings["medium+"],
  },
});
