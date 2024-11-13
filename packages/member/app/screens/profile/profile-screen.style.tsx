import {
  spacings,
  fontsize,
  screenDimensions,
  color,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { screenStyles } from "../../../../shared/components/screen/screen.styles";

export const styles = StyleSheet.create({
  container: screenStyles.container,
  emptyText: {
    margin: 20,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  noCardsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.palette.red,
    textAlign: "center",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  containerInner: {
    flex: 1,
    position: "relative",
    paddingHorizontal: spacings.thin,
    backgroundColor: "transparent",
  },
  containerNoCardInner: {
    position: "relative",
    ...cardStyles.card,
    paddingHorizontal: 0,
    paddingVertical: spacings.large,
    height: 0.65 * screenDimensions.height,
  },
  flex1: {
    flex: 1,
  },
  footer: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  profileIcon: {
    marginTop: -40,
    marginBottom: spacings.medium,
  },
  buttonStyle: {
    fontSize: fontsize.tiny,
    fontWeight: "400",
    letterSpacing: 0.5,
    paddingHorizontal: spacings.medium,
    textTransform: "uppercase",
  },
  scrollView: { flex: 1, paddingVertical: spacings.medium },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
