import { StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacings } from "../../../../shared/theme";

export const PADDING = 20;

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.4 * screenDimensions.height,
    height: 'auto'
  },
  inner: {
    backgroundColor: color.palette.red,
    justifyContent: 'center',
    flexDirection: 'column',

    borderRadius: spacings.borderRadius.large,
  },
  header: {
    fontWeight: 'bold',
    fontSize: fontsize.mediumOne,
    color: color.palette.white,
    paddingHorizontal: spacings.medium,
    textAlign: "center",
    textTransform: "uppercase"
  },
  content: {
    padding: spacings.medium,
    textAlign: 'center',
    color: color.palette.white,
    lineHeight: spacings.large
  },
  footer: {
    flexDirection: 'row',
    height: 40,
    margin: spacings.small,
    justifyContent: 'space-between',
    padding: spacings.small,
  },
  image: {
    maxHeight: 50,
    width: 0.6*screenDimensions.width,
  },
  page: {
    flex: 0.5,
    paddingTop: spacings.small,
    paddingBottom: spacings.small,
    width: screenDimensions.width - PADDING * 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: color.palette.white
  },
  sideIcon: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    minWidth: 50
  }
});
