import { StyleSheet } from "react-native"
import { color, fontsize, spacings, typography } from "../../theme"
export const tabsStyle = StyleSheet.create({
  tabButtonContainer: {
    flexDirection: "row",
    backgroundColor: color.palette.lightGreyBackground,
    borderTopWidth: 0,
    justifyContent:'space-between',
    marginBottom: spacings.medium,
    borderRadius: 10,
  },
  tabLabelContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 5,
    width: '100%'
  },
  tabText: {
    color: color.palette.black,
    fontSize: fontsize.small,
    fontFamily: typography.secondary
  },
})