import { TouchableOpacityProps } from "react-native"
import { Icons } from "../v-icon/icons";


export interface CircleActionButtonProps extends TouchableOpacityProps {

  /**
   * The name of the icon
   */
  name: string;

  /**
   * The font family of the icon
   */
  family: keyof typeof Icons;

  /**
   * The text to be displayed
   */
  text: string; 

  /**
   * The size of the icon
   */
  size: number; 

  /**
   * The color of both the icon and the text
   */
  color: string;

  /**
   * Background color of the button
   */
  backgroundColor: string;

  /**
   * On press event handler
   */
  onPress: () => void;
}