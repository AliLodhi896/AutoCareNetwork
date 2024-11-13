import {
  color,
  spacing,
  spacings,
  fontsize,
  typography,
} from "../../../../shared/theme";
import { StyleSheet, Platform } from "react-native";
import { screenStyles } from "../../../../shared/components/screen/screen.styles";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: screenStyles.container,
  title: {
    fontSize: fontsize.large,
    color: color.palette.black,
    paddingHorizontal: spacings.small
  },
  pointStyle: {
    fontSize: fontsize.huge,
    color: color.primary
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
  card: {
    borderWidth: spacing[1],
    borderRadius: spacing[3],
    borderColor: color.primary,
    margin: spacing[4],
    padding: spacing[3],
    backgroundColor: color.palette.white,
    flex: 1,
    marginBottom: 80,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  settingIcon: {
    marginTop: -40,
    marginBottom: spacings.medium,
  },
  dotLineView: {
    width: "100%",
    paddingTop: spacings.large
  }
});

export const istyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.primary + "60",
    borderStyle: Platform.select({ ios: "dotted", default: "dashed" }),
    paddingHorizontal: spacings.small
  },
  textContainer: {},
  iconContainer: {},
  text: {
    color: color.palette.black,
    fontSize: fontsize.medium,
  },
  icon: {},
  leftSection: {
    flex: 1,
    paddingVertical: spacings.small,
  },
  unlinkButton: {
    paddingVertical: spacings.small,
  },
  unlinkText: {
    color: color.primary,
    textDecorationLine: "none",
    fontFamily: typography.primary,
  },
  code: {
    fontSize: 18,
  },
  inactive: {
    fontStyle: "italic",
    fontSize: 14,
    color: "red",
  }
})
