import { screenStyles } from '../../../../shared/components/screen/screen.styles';
import { StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacings } from "../../../../shared/theme";
import { palette } from '../../../../shared/theme/palette'


export const styles = StyleSheet.create({

  FULL: {
    flex: 1,
  },
  card: {
    justifyContent: "space-between",
    alignItems: 'center',
    height: 0.65 * screenDimensions.height,
    paddingHorizontal: 0
  },
  containerOuter: screenStyles.container,
  container: screenStyles.container,
  scrollView: { paddingHorizontal: spacings.small, paddingVertical: spacings.medium },
  scrollIndicatorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: spacings.small,
    bottom: spacings.small,
    width: spacings.large,
    height: spacings.large,
    borderRadius: spacings.large / 2,
    backgroundColor: 'rgba(0,0,0.2,0.3)',
    paddingTop: spacings.small
  },
  qrView: {
    maxHeight: 250,
  },
  title: {
    fontSize: fontsize.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {},
  headerText: {
    color: color.palette.black,
    fontSize: fontsize['medium+'],
    textAlign: 'center',
    fontWeight: '600',
    alignSelf: 'center',
  },
  info: {
    color: '#222222',
    fontSize: fontsize.small,
    width: 270,
    marginTop: spacings.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButton: {
    fontSize: fontsize.medium,
    color: palette.white,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
  codeBar: {
    color: color.palette.black,
    paddingTop: 0,
    fontSize: fontsize.medium,
    backgroundColor: 'yellow',
    fontWeight: '700',
    textAlign: 'left',
  },
  errorMessage: {
    color: color.palette.red,
    fontSize: fontsize['medium+'],
    textAlign: 'center',
    padding: spacings.small,
    marginBottom: spacings.massive
  },
  enjoyText: {
    color: color.palette.black,
    marginTop: 15,
    paddingTop: 5,
    fontSize: fontsize.medium,
    fontWeight: '700',
    textAlign: 'center',
  },
  webContainer: {
    flex: 0,
    height: 100,
    padding: spacings.large,
    width: screenDimensions.width,
  },
  codeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    margin: spacings['medium+'],
    alignSelf: 'center',
  },
  cardCode: {
    marginTop: spacings.smaller,
    color: color.palette.deepBlue,
    fontSize: fontsize['medium+'],
    fontWeight: 'bold',
    paddingBottom: spacings['medium+'],
  },
  attendantNotice: {
    fontSize: spacings['medium+'],
    margin: spacings.small,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoImage: {
    width: '100%',
    height: 150,
    marginVertical: spacings.small,
  },
  pulseCard: {
    margin: spacings['medium+'],
    padding: spacings.small,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    top: 0,
    left: spacings.small,
    right: spacings.small,
    bottom: 0,
    borderRadius: 50,
    borderColor: color.palette.white,
    color: color.palette.white,
  },
});
