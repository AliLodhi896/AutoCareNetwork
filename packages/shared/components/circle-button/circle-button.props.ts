import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  icon?: React.ReactNode

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

   /**
   * Blur the circle background.
   */
  blur?: boolean

  /**
   * Boolean to remove circle styles and background
  */
  noCircle?: boolean
 /**
   * Boolean to remove text under the circle
  */
  noText?: boolean

 /**
   * Boolean to add  text to the inner circle
  */
  innerText?: boolean
}
