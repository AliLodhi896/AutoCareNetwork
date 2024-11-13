import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"


export interface ButtonProps extends TouchableOpacityProps {


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
   * Type is either back or close
   */
  type?: "back" | "close";


  /**
   * Size of the icon of the button
   */
  size?: number;

  /**
   * Color for the icon and text default to white
   */
  color?: string;
 
}
