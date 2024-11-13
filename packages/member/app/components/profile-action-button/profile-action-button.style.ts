import { screenDimensions, spacings } from "./../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { color } from "../../../../shared/theme";
import { shadower } from "../../../../shared/utils/common";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  letterContainer: {
    height: normalize(45),
    width: normalize(45),
    display: "flex",
  },
  profileButton: {
    height: "100%",
    width: "100%",
    backgroundColor: color.palette.lightBlue,
    borderRadius: spacings.massive,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonTxt: {
    color: color.palette.white,
    fontSize: normalize(23),
    fontWeight: "bold",
  },
  textContainerStyle: { marginRight: spacings.huge },
  container: { flex: 1 },
  imageInner: {
    borderRadius: spacings.massive,
    borderWidth: spacings.thin,
    borderColor: color.palette.lightGreyBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  imageOuter: {
    borderRadius: spacings.massive,
    marginLeft: 0.75 * spacings.large,
    height: normalize(53),
    width: normalize(53),
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    position: "absolute",
    left: -spacings.medium,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: spacings.medium,
    paddingHorizontal: spacings.medium,
    borderRadius: spacings.medium,
    backgroundColor: color.palette.lightGreyBackground,
    ...shadower(0.2),
  },
  actionButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacings.medium,
  },
  actionText: {
    fontSize: spacings.medium,
    color: color.palette.black,
    fontWeight: "600",
    marginLeft: spacings.medium,
    alignSelf: "center",
  },
  circle: {
    width: spacings.large,
    height: spacings.large,
    borderRadius: spacings.large / 2,
    backgroundColor: color.palette.red,
    marginBottom: 0,
  },
  circleView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
