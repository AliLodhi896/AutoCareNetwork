import { color, spacing, spacings, fontsize, screenDimensions } from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: color.transparent,
  },
  body: {
    height: screenDimensions.height,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    top: 44,
    zIndex: 1,
    position: "absolute",
  },
  title: {
    fontSize: fontsize.huge,
    color: color.palette.black,
    textTransform: "capitalize",
    fontWeight: "600"
  },
  tabButtonContainer: {
    flexDirection: "row",
    backgroundColor: color.palette.lightGreyBackground,
    borderTopWidth: 0,
    marginBottom: spacings.medium,
    borderRadius: 10,
  },
  card: {
    borderWidth: spacing[1],
    borderRadius: spacing[3],
    borderColor: color.primary,
    margin: spacing[4],
    padding: spacing[3],
    height: 0.65*screenDimensions.height,
    backgroundColor: color.palette.white,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
