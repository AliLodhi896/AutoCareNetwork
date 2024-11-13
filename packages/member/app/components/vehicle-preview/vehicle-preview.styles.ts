import { StyleSheet } from "react-native";
import { fontsize, spacings, typography } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  vehiclePhoto: {
    height: normalize(200),
    transform: [{ scale: 1.07 }],
    width: "100%",
  },
  detailWrapper: {
    height: normalize(195),
    width: normalize(320),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: spacings.smaller,
  },
  detailTitle: {
    fontFamily: typography.primary,
    fontSize: fontsize["mediumOne+"],
  },
  detailInfo: {
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    marginTop: spacings["small"],
  },
  detailsArrow: {
    position: "absolute",
    top: normalize(15),
    left: normalize(15),
    zIndex: 1,
  },
  cardFront: {
    height: normalize(200),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cardNoVehicle: {
    width: normalize(315),
    alignSelf: "center",
  },
});
