import * as React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "../text/text"
import { ButtonProps } from "./circle-button.props"
import { styles } from "./circle-button.styles"

/**
 * For displaying a circle with an icon at the center and a text underneath.
 */
export function CircleButton(props: ButtonProps) {
  const {
    text,
    style: styleCircleOverride,
    textStyle: textStyleOverride,
    icon,
    blur,
    noCircle,
    noText,
    innerText,
    ...rest
  } = props
  const blurStyles = blur ? { opacity: 0.5 } : {}
  const circleStyles = noCircle ? {} : styles.circle

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[circleStyles, blurStyles, styleCircleOverride]}
        {...rest}
      >
        {icon}
        {innerText && (
          <Text text={text} style={[styles.innerText, textStyleOverride]} />
        )}
      </TouchableOpacity>
      {!noText && (
          <Text
            fontFamily="secondary"
            text={text}
            style={[styles.text, textStyleOverride]}
          />
        )}
    </View>
  )
}