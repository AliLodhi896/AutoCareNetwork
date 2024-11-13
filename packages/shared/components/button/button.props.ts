import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"
import { ButtonPresetNames } from "./button.presets"


export interface ButtonProps extends TouchableOpacityProps {

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | null

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode

  /**
   * When true button is in loading state with a spinner
   */
  loading?: boolean
  /**
   * Color of loader
   */
  loaderColor?: string
}
