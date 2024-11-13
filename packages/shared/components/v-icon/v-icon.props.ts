import { ViewStyle, StyleProp } from "react-native";
import { Icons } from "./icons"

export interface IconProps {
  /**
   * Styles for the icon
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Name of the icon
   */

  name: string;

  /**
   * Icon color
   */

  color?: string;

  /**
   * The size of the icon
   */

  size?: number;

  /**
   * Family of the icon
   * AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, 
   */

  family: keyof typeof Icons;

  /**
   * On press event
   */
  onPress?: () => void
}
