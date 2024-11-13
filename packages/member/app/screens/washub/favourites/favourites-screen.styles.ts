import {
  color,
  spacings,
  fontsize,
  screenDimensions,
} from "../../../../../shared/theme";
import { StyleSheet } from "react-native";
import { screenStyles } from "../../../../../shared/components/screen/screen.styles";

export const styles = StyleSheet.create({
  main: screenStyles.container,
  container: {
    backgroundColor: color.transparent,
    paddingTop: spacings.medium,
    flex: 1,
  },

  title: {
    fontSize: fontsize.huge,
    color: color.palette.black,
    fontWeight: "600",
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacings.medium,
  },
  smallerCircle: {
    fontSize: fontsize.medium,
    fontWeight: "bold",
    color: color.primary,
  },
  noFavourites: {
    fontWeight: "700",
    fontSize: fontsize.medium,
    color: color.palette.black,
    paddingVertical: spacings.medium,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    color: color.palette.black,
    fontSize: fontsize.small,
  },
  findLocation: {
    textAlign: "center",
    color: color.primary,
  },
  noneAddedContainer: {
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
  },
  notifIcon: {
    marginTop: -40,
    marginBottom: spacings.medium,
  },
  locationContainer: {
    flexDirection: "column",
    flex: 1,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationName: {
    fontSize: fontsize.medium,
    color: color.palette.black,
  },
  row: {
    width: "100%",
    padding: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5,
  },
  favouriteContainerOuter: { height: 0.75 * screenDimensions.height },
  favouriteContainer: {
    flex: 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    backgroundColor: color.palette.white,
    paddingVertical: spacings.medium,
  },
  favouriteListHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacings.large,
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    marginHorizontal: spacings.small,
    marginTop: spacings.large,
    borderWidth: spacings.tiny - 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    height: spacings.cardHeight,
    backgroundColor: color.palette.white,
    paddingVertical: spacings.medium,
    paddingHorizontal: spacings.medium,
  },
});
