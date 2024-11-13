import { color, fontsize,Radii,spacings } from "../../theme"
import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
  tabButton: {
    borderBottomWidth: 0,
    height: spacings.small,
    marginTop: spacings.small
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
  container: {

  },
  activeTab: {position: "absolute", width: '100%', height: '100%', backgroundColor: color.primary, borderRadius: Radii.rounded},
  tabView: {flex:1,  backgroundColor: color.palette.lightGreyBackground}
})
