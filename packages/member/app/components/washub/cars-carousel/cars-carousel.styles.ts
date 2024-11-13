import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { spacings } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButtonWrapper: {
    position: "absolute",
    width: normalize(14),
    zIndex: 1,
  },
  navButton: {
    backgroundColor: "transparent",
    width: normalize(15),
    height: normalize(31),
  },
  navButtonLeft: {
    transform: [{ rotate: "180deg" }],
  },

  itemContainerEmpty: {
    width: normalize(315),
    alignSelf: "center",
  },
  itemEmpty: {
    height: normalize(195),
    width: normalize(320),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: spacings.smaller,
  },
});
