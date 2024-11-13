import { fontsize, color, spacings } from './../../theme'
import { StyleSheet, Platform } from "react-native"


export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: color.primary + "60",
    borderStyle: Platform.select({ ios: "dotted", default: "dashed" }),
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
