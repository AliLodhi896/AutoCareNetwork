import { spacings } from '../../../../shared/theme/spacing';
import { Platform, StyleSheet } from "react-native";
import { color, screenDimensions } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  pasteHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    borderTopLeftRadius: spacings.borderRadius.smaller,
    borderTopRightRadius: spacings.borderRadius.smaller,

  },
  pasteHeaderTitle: {
    textTransform: "uppercase",
  },
  pasteBar: {
    minHeight: 65,
    paddingTop: spacings.smaller,
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: '#c8c8c8',
    borderTopLeftRadius: spacings.borderRadius.smaller,
    borderTopRightRadius: spacings.borderRadius.smaller,
    backgroundColor: color.palette.darkGray,
    width: screenDimensions.width
  },
  scrollContent: {
    marginTop:spacings.smaller,
    marginBottom: Platform.select({
      android: 15
    }),
  },
  container: {
    flex: 1,
  },
  loader: {
    backgroundColor: 'white',
    paddingBottom: 200,
    flex: 1,
  },
  root: {
    marginTop: 50,
    flex: 1,
  },
  headerButton: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: spacings.small
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.palette.white
  },
  infoButton: {
    paddingLeft: 6,
  },
});
