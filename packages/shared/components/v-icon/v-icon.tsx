import * as React from "react";
import { IconProps } from "./v-icon.props";
import { Icons } from "./icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../../theme";

export function VIcon(props: IconProps) {
  const {
    style: styleOverride,
    name,
    family,
    size,
    color: iconColor,
    onPress,
  } = props;

  const allProps = {
    style: styleOverride,
    size: size || 22,
    name: name,
    color: iconColor || color.primary,
  };
  const Icon = Icons[family];
  Icon.loadFont();
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon {...allProps} />
    </TouchableOpacity>
  );
}
