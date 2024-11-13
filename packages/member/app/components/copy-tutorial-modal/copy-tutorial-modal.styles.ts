import { StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacings } from "../../../../shared/theme";

export const PADDING = 20;

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.45 * screenDimensions.height,

  },
  inner: {
    backgroundColor: color.palette.red,
    justifyContent: 'center',
    flexDirection: 'column',

    borderRadius: spacings.borderRadius.large,
  },
  header: {
    fontWeight: 'bold',
    fontSize: fontsize["medium+"],
    color: color.palette.white,
    paddingHorizontal: spacings.medium,
    textAlign: "center"
  },
  content: {
    padding: spacings.medium,
    textAlign: 'center',
    color: color.palette.white
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
    width: screenDimensions.width / 2,
  },
  page: {
    flex: 0.5,
    paddingTop: spacings.small,
    paddingBottom: spacings.small,
    width: screenDimensions.width - PADDING * 2,
    justifyContent: 'space-around',
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
