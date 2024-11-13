import { color, spacings, fontsize, screenDimensions, spacing } from "../../theme";
import { StyleSheet, Platform } from "react-native"
import { screenStyles } from "../../components/screen/screen.styles";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: screenStyles.container,
  card: {
    borderWidth: 0.75*spacings.tiny,
    borderRadius: spacing[3],
    borderColor: color.primary,
    paddingVertical: spacings.small,
    height: 0.65*screenDimensions.height,
    width: 0.9*screenDimensions.width,
    backgroundColor: color.palette.white,
  },
  body: {
    height: screenDimensions.height,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    top: 44,
    zIndex: 1,
    position: "absolute",
  },
  title: {
    fontSize: fontsize.large,
    color: color.palette.black,
  },
  tabButtonContainer: {
    flexDirection: "row",
    marginBottom: spacings.medium,
  },
  tabButton: {
    flex: 1,
    borderRadius: 0,
    borderBottomWidth: 6,
    borderBottomColor: color.primary,
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  tabButtonText: {
    color: color.palette.black,
    textDecorationLine: "none",
    paddingBottom: spacings.tiny,
    fontSize: fontsize.small,
    letterSpacing: 0,
    fontWeight: "normal",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  
  scrollContainer: {
    paddingVertical: spacings.medium,
    paddingHorizontal: spacings.medium,
  },
  dottedLine: {
    paddingTop: spacings.medium
  },
  logoutButton: {
    marginTop: spacings.large,
    borderColor: color.palette.red,
    borderWidth: 1,
    backgroundColor: color.palette.white,
    marginHorizontal: spacings.medium,
  },
  logoutText: {
    color: color.palette.red,
  },
  debugText: {
    color: color.palette.red,
  },
  versionText: {
    color: color.palette.lightGrey,
    fontStyle: "italic",
  },
  footer: {
    paddingVertical: spacings.small,
    alignItems: "center",
  },
  settingIcon: {
    marginTop: -40,
    marginBottom: spacings.medium,
  },
});

export const istyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: color.primary + "60",
    borderStyle: Platform.select({ default: "dashed" }),
    paddingVertical: spacings.medium,
  },
  textContainer: {},
  iconContainer: {},
  text: {
    color: color.palette.black,
    fontSize: fontsize.medium,
  },
  icon: {},
})

export const cardStyles = StyleSheet.create({
    card: {
      marginHorizontal: spacings.small,
      borderWidth: spacings.tiny - 1,
      borderColor: color.palette.red,
      borderRadius: spacings.borderRadius.smaller,
      height: spacings.cardHeight,
      backgroundColor: color.palette.white,
      paddingVertical: spacings.medium,
      paddingHorizontal: spacings.medium,
    },
  });
  