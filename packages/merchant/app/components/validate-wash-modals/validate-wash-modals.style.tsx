import { StyleSheet, Dimensions } from "react-native";
import { color, fontsize,  spacings, typography } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

var { width, height } = Dimensions.get('window');
const modalWidth = width > 500 ? normalize(400) : width - 40;

export const styles = StyleSheet.create({
  // Modal
  container: {
    width: modalWidth,
    backgroundColor: color.primary,
    borderWidth: spacings.small,
    borderRadius: spacings.borderRadius.large,
    borderColor: color.primary,
    margin: spacings.medium,
  },
  fullContainer: {
    paddingHorizontal: spacings.medium,
    paddingTop:  spacings.large,
    paddingBottom:  spacings.medium,
  },
  whiteContainer: {
    paddingBottom: 60,
    backgroundColor: 'white',
    borderColor: 'white'
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: color.transparentWhite,
    paddingBottom: spacings.large,
  },
  title: {
    fontSize: normalize(28),
    color: color.palette.white,
    textAlign: "center",
    fontFamily: typography.primary,
    textTransform: "uppercase",
    fontWeight: "700"
  },
  body: {
    paddingHorizontal: spacings.medium,
    paddingTop: spacings.medium,
  },
  text: {
    color: color.palette.white,
    lineHeight: spacings["medium+"],
    marginBottom: spacings.medium,
    fontSize: spacings.medium,
    fontFamily: typography.secondary
  },
  confirmBtn: { alignItems: "center", marginVertical: spacings.small },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacings.mediumOne
  },
  floatingButtons: {
    position: 'absolute',
    bottom: normalize(-80),
  },
  codeText: {
    borderWidth: 1,
    borderColor: color.palette.white,
    paddingVertical: spacings.small,
    borderRadius: spacings.borderRadius.small,
    color: color.palette.white,
    fontFamily: typography.primary,
    fontSize: fontsize["medium+"],
    fontWeight: "800",
    textAlign: 'center',
    letterSpacing: spacings.thin,
  },
  codePlaceholder: {
    color: color.palette.white + '55',
    letterSpacing: 1,
  },

  largeCircle: {
    backgroundColor: color.palette.green,
    height: normalize(120),
    width:  normalize(120),
    borderRadius:  normalize(60),
    marginBottom: spacings.medium,
    marginHorizontal: spacings.medium,
  },
  largeCircleText: {
    fontSize: fontsize["tiny-"],
    textAlign: 'center',
    color: color.palette.white,
    paddingTop: 2 * spacings.tiny
  },

  // Results
  webviewContainer: {
    flex: 0,
    // padding: 10,
    width: modalWidth,
    height: height - 0.3 * height,
  },
  webview: {
    flex:1,
    width: modalWidth-20,
    height: 600
  },
  loader: {
    height: 80,
  },
  webLoader: {
    flex: 1,
  },
  homeIcon: {
    width: normalize(35),
    height: normalize(35)
  },
  contactIcon: {
    width: normalize(40),
    height: normalize(40)
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
  },
});
