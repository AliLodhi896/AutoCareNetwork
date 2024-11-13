import * as React from "react"
import { StyleSheet, ImageStyle } from "react-native"
import { spacings } from "../../theme"
import { AutoImage } from "../auto-image/auto-image"

export const DottedLine = ({style}: {style?: ImageStyle}) => {
  return (
    <AutoImage
      style={[styles.line, style]}
      source={require("../../../assets/line.png")}
    />
  )
}

const styles = StyleSheet.create({
  line: {
    height: 0.5*spacings.thin,
    width: "100%",
  },
})
