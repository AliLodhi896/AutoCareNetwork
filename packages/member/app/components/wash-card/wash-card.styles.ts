import { StyleSheet } from "react-native";
import { cardStyles } from "../../screens/washub/favourites/favourites-screen.styles";
import {
  color,
  fontsize,
  screenDimensions,
  spacings,
} from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";
import { palette } from "../../../../shared/theme/palette";

export const styles = StyleSheet.create({
  flipIcon: {
    position: "absolute",
    right: 8,
    top: 5,
  },
  inactive: {
    alignSelf: "center",
    color: color.primary,
    fontSize: fontsize.mediumOne,
    fontWeight: "700",
  },
  active: {
    alignSelf: "center",
    color: color.palette.black,
    fontSize: fontsize.mediumOne,
    fontWeight: "700",
  },
  cardBack: {
    margin: spacings.mediumOne,
  },
  backText: {
    textAlign: "center",
    lineHeight: normalize(28),
  },
  washAvailability: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacings.small,
  },
  leftTextView: {
    justifyContent: "center",
  },
  line: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: color.palette.red,
    marginBottom: spacings.small,
  },
  cardContainer: {
    flex: 1,
    elevation: 8,
    backgroundColor: "white",
    margin: spacings.small,
    marginBottom: spacings["medium+"],
    borderWidth: 1.5,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.large,
    shadowColor: color.palette.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    justifyContent: "center",
    textAlign: "center",
  },
  dealerLogo: {
    backgroundColor: palette.white,
    marginHorizontal: spacings.medium,
    marginTop: spacings.mediumOne,
    minHeight: 110,
    maxHeight: 300,
  },
  codeBar: {
    backgroundColor: "#222222",
    color: "white",
    padding: 2,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  marginHorizontal: {
    marginHorizontal: spacings.medium,
  },
  washStatusIcon: {
    marginLeft: 8,
  },
  washes: {
    alignSelf: "flex-start",
    color: color.palette.black,
    fontSize: fontsize.small,
    letterSpacing: 0.8,
  },
  washSecondary: {
    fontSize: fontsize.small,
    marginTop: spacings.tiny,
  },
  containerInner: {
    position: "relative",
    ...cardStyles.card,
    paddingHorizontal: spacings.tiny,
    paddingVertical: spacings.tiny,
  },
  buttonStyle: {
    fontSize: fontsize.tiny,
    fontWeight: "400",
    letterSpacing: 0.5,
    paddingHorizontal: spacings.medium,
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    bottom: -0.04 * screenDimensions.height,
  },
});
