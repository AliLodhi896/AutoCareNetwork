import { StyleSheet } from "react-native";
import { color, fontsize, spacings, screenDimensions } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

const cameraHeight = normalize(250);
const cameraWidth = normalize(screenDimensions.width - spacings.large);

export const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: spacings.small,
    borderWidth: 0,
    overflow: 'hidden',
    borderColor: color.palette.darkGray,
    borderRadius: 0,
    // height: 200,
    backgroundColor: color.transparent,
    paddingVertical: 0,
    paddingHorizontal: spacings.medium,
  },
  headerContainer: {
    alignItems: 'center',
  },
  logo: {
    width: normalize(0.9*screenDimensions.width),
    height: normalize(0.2*screenDimensions.height)
  },
  alphabetic: {
    width: normalize(85),
    height: normalize(42)
  },
  title: {
    color: color.palette.white,
    fontSize: normalize(17),
    textAlign: 'center'
  },
  toCenter: { alignItems: 'center' },
  cameraContainer: {
    marginTop: spacings.mediumOne,
    marginBottom: spacings.large,
    borderWidth: spacings.tiny - 1,
    backgroundColor: color.palette.black,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.small,
    width: cameraWidth ,
    height: cameraHeight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionViewsStyle: {
   position: "absolute"
  },
  actionIconsStyle: {
   width: normalize(84),
   height: normalize(72)
  },
  cameraContainerBlink: {
    borderColor: color.palette.green,
  },
  camera: { borderRadius: spacings.borderRadius.small, width: cameraWidth - spacings.small, height: cameraHeight  - spacings.small},
  cameraContainerActive: {
    borderColor: color.palette.green,
  },
  footer: {
    alignItems: 'center',
  },
  largeCircle: {
    height: 0.42 * screenDimensions.width,
    width: 0.42 * screenDimensions.width,
    borderRadius: 0.36 * screenDimensions.width,
    marginBottom: spacings.medium,
  },
  largeCircleText: {
    fontSize: fontsize.small,
    textAlign: 'center',
    color: color.palette.white,
    paddingTop: spacings.smaller,
    width: "60%",
  },
  smallCircleText: {
    color: color.palette.white,
  },
});