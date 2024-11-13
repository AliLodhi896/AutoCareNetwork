import { color, spacings, fontsize, typography } from "../../../../shared/theme";
import { StyleSheet } from "react-native";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  // Modal
  container: {
    width: "100%",
    backgroundColor: color.primary,
    borderWidth: spacings.small,
    borderRadius: spacings.borderRadius.large,
    borderColor: color.primary,
    marginVertical: spacings.medium,
    paddingHorizontal: spacings.large
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: color.transparentWhite,
    paddingBottom: spacings.small,
    paddingTop: spacings.large
  },
  title: {
    fontSize: normalize(20),
    color: color.palette.white,
    textAlign: "center",
    fontFamily: typography.primary,
    textTransform: "uppercase",
    fontWeight: "700",
    paddingBottom: spacings.small
  },
  body: {
    paddingTop: spacings["medium+"],
  },
  text: {
    color: color.palette.white,
    lineHeight: spacings["medium+"],
    marginBottom: spacings.medium,
  },
  confirmBtn: { alignItems: "center", marginVertical: spacings.small },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacings["medium+"],
    paddingBottom: spacings.small
  },
  iconText: {
    fontSize: fontsize["tiny-"],
    color: color.palette.white,
    paddingTop: spacings.tiny,
    fontFamily: typography.secondary
  },
  iconsStyle: {
    width: normalize(25),
    height: normalize(25),
    marginBottom: spacings.tiny
  },
  circle: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(40),
    borderWidth: spacings.tiny,
    borderColor: color.palette.white,
    backgroundColor: color.transparent,
  }
});
