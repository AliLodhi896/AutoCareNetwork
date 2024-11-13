import { screenDimensions } from "../../../../shared/theme/spacing";
import { color, spacing, spacings, fontsize } from "../../../../shared/theme";
import { StyleSheet } from "react-native";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { screenStyles } from "../../../../shared/components/screen/screen.styles";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: screenStyles.container,
  header: {
    height: normalize(110),
    width: screenDimensions.width,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: fontsize.large + fontsize.medium,
    fontWeight: "600",
    color: color.palette.black,
    textTransform: "capitalize",
  },
  labelStyle: {
    color: color.palette.black + "aa",
  },
  subTitle: {
    fontSize: fontsize.medium,
    color: color.palette.black,
    fontWeight: "400",
  },
  logo: {
    marginBottom: spacings.medium,
    paddingLeft: spacings.medium,
  },

  form: {
    paddingTop: spacings.smaller,
    paddingBottom: spacings.large,
    paddingHorizontal: spacings.medium,
  },
  card: {
    ...cardStyles.card,
    paddingHorizontal: 0,
    paddingBottom: spacings.large,
  },
  btn: {
    position: "absolute",
    bottom: -0.04 * screenDimensions.height,
    marginHorizontal: spacings.large,
    alignSelf: "center",
  },
  btnTxt: {
    fontSize: fontsize.tiny,
    fontWeight: "400",
    letterSpacing: 0.4,
    paddingHorizontal: spacings.huge,
    textTransform: "uppercase",
  },
  headerButton: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: spacings.small,
  },
  headerButtonText: {
    fontSize: fontsize.small,
    fontWeight: "600",
    color: color.palette.black,
    paddingRight: spacings.small,
  },
  smallerCircle: {
    fontSize: fontsize.medium,
    fontWeight: "bold",
    color: color.primary,
  },
  vehicleImage: {
    height: normalize(150),
    width: "100%",
    margin: 8,
  },
  picker: {
    marginTop: spacings["medium+"],
    marginBottom: spacings["medium+"],
  },
});
