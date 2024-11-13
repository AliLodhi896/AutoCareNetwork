import { screenDimensions } from '../../../../shared/theme/spacing';
import { StyleSheet } from "react-native";
import { color, fontsize, spacings, typography } from "../../../../shared/theme";
import { normalize } from '../../../../shared/utils/normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    width: screenDimensions.width,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    height: normalize(150),
    width: normalize(320),
    alignSelf: "center",
    marginBottom: spacings.medium
  },
  welcomeText: {
    marginTop: spacings.large,
    marginBottom: spacings.small,
    paddingHorizontal: spacings.medium,
    textAlign: 'center',
    fontSize: fontsize.larger,
    fontWeight: "500",
    fontFamily: typography.primary,
    color: color.palette.white
  },
  buttons: {
    flexShrink: 0,
    marginVertical: spacings.large,
  },
  logout: {
    alignSelf: 'center',
    fontSize: 12.5,
    color: 'white',
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontFamily: 'Helvetica Neue',
    margin: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerModal: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 300,
  },
  modalWebView: {
    flex: 0,
    borderRadius: 10,
    width: 300,
    height: 400,
  },
  w9Wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  successText: {
    color: color.palette.black,
    margin: 5,
    fontWeight: '500',
    fontSize: fontsize.mediumOne,
  },
  feedbackContainer: {
    alignItems: 'center',
  },
  zepInfoImage: {
    width:  0.15 * screenDimensions.width,
    height: 0.15 * screenDimensions.width,
  },
  profileImage: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  profileText: {
    color: 'white',
  },
  styleCircle: {
    height:  0.24*screenDimensions.width,
    width: 0.24*screenDimensions.width,
  },
  sideCircle: {
    height: 0.27 * screenDimensions.width,
    width: 0.27 * screenDimensions.width,
    borderRadius: 0.135 * screenDimensions.width,
  },
  infoSmallCircle: {
    height: 0.10 * screenDimensions.width,
    width: 0.10 * screenDimensions.width,
    borderRadius: 0.05 * screenDimensions.width,
  },
  sideText: {
    fontSize: fontsize['tiny-'],
    color: color.palette.white,
    paddingTop: spacings.tiny,
    fontFamily: typography.primary
  },
  sideLargeCircle: {
    height: 0.36 * screenDimensions.width,
    width: 0.36 * screenDimensions.width,
    borderRadius: 0.18 * screenDimensions.width,
    marginBottom: 2*spacings.large,
  },
  largeCircleView: {
    height: 0.32 * screenDimensions.width,
    width: 0.32 * screenDimensions.width,
    borderRadius: 0.16 * screenDimensions.width,
    marginVertical: spacings.medium,
    alignSelf: 'center',
  },
  infoView: {
    position: 'absolute',
    top: -spacings.small,
    right: -spacings.small
  },
  sideLargeCircleText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: spacings.tiny
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    paddingTop: spacings.tiny,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacings.medium,
  },
  messageBatchCount: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: 25,
    fontWeight: '600',
    color: color.primary
  },

  titleView: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: spacings.large,
    paddingBottom: spacings.huge,
  },
  titleInnerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenDimensions.width,
    paddingVertical: spacings.medium ,
    paddingHorizontal: spacings.medium,
  },
  title: {
    fontSize: normalize(42),
    fontWeight: "500",
    fontFamily: typography.primary,
    color: color.palette.white,
    paddingHorizontal: spacings.medium
  },
  titleSmall: {
    fontSize: fontsize.small,
    fontWeight: "500",
    fontFamily: typography.primary,
    color: color.palette.white
  },
  lightText: {fontFamily:typography.secondary, fontWeight: "200"},
  smallCircle: {
    fontSize: fontsize.medium,
    fontWeight: "bold",
    color: color.palette.red,

  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacings.large,
  },
  successLeftView: {
    height: 0.9*spacings.huge,
    backgroundColor: color.palette.green,
    justifyContent: "center",
    paddingHorizontal: spacings.small,
    borderTopLeftRadius: spacings.small,
    borderBottomLeftRadius: spacings.small,
  },
  successRightView: {
    height: 0.9*spacings.huge,
    backgroundColor: color.palette.white,
    justifyContent: "center",
    paddingHorizontal: spacings.small,
    borderTopRightRadius: spacings.small,
    borderBottomRightRadius: spacings.small,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  w9: {
    color: color.palette.white, 
    fontWeight: "500",
    fontSize: fontsize.huge,
    fontFamily: typography.primary
},
  noStationId: {
    color: "#888",
  },
  iconStyle: {
   width: normalize(56),
   height: normalize(44),
  }
})