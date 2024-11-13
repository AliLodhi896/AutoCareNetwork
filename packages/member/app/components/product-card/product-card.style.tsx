import { fontsize, screenDimensions } from "../../../../shared/theme/spacing";
import { StyleSheet, Platform } from "react-native";
import { color, spacings, spacing, typography } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {},
  sideCircle: {
    height: 0.26 * screenDimensions.width,
    width: 0.26 * screenDimensions.width,
    marginBottom: -50,
    borderRadius: 0.13 * screenDimensions.width,
  },
  sideText: {
    fontSize: fontsize["tiny-"],
    color: color.palette.white,
    paddingTop: 2 * spacings.tiny,
  },
  itemRow: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: spacings.tiny,
    // paddingHorizontal: spacing[4],
    // justifyContent: 'flex-end',
    alignItems: "center",
  },
  label: {
    fontSize: fontsize.small,
    letterSpacing: 1,
    fontFamily: typography.secondary,
    color: color.palette.black,
  },
  content: {
    color: color.palette.black,
    fontSize: fontsize.small,
    letterSpacing: 1,
    paddingVertical: 0,
    paddingLeft: spacing[3],
    fontFamily: typography.primary,
  },
  longText: {
    lineHeight: fontsize["medium+"] * 0.9,
    color: color.palette.black,
    fontWeight: "600",
  },
  link: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export const sectionStyles = StyleSheet.create({
  promoCardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promoCardImg: {
    height: normalize(90),
    alignSelf: "flex-end",
    width: normalize(120),
  },
  card: {
    borderRadius: spacings.borderRadius.small,
    // borderWidth: 1,
    margin: spacings.medium,
    marginBottom: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: color.palette.white,
  },
  detailsCard: {
    overflow: "hidden",
  },
  cardHeader: {
    paddingVertical: spacings.small,
    width: "102%",
    paddingLeft: 20,
    borderStyle: Platform.select({ default: "dashed" }),
    marginLeft: "-1.5%",
    borderBottomWidth: 1,
    borderColor: color.palette.red,
  },
  bigText: {
    color: color.palette.black,
    fontSize: fontsize.medium,
  },
});
