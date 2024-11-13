import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Circle } from "react-native-progress";
import { color } from "../../theme";
import { Text } from "../text/text";
import { viewPresets, textPresets } from "./button.presets";
import { ButtonProps } from "./button.props";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    loading,
    loaderColor,
    ...rest
  } = props;

  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || (
    <Text text={text} fontFamily="primary" style={textStyles} />
  );

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {loading ? (
        <Circle
          size={25}
          color={loaderColor || color.palette.white}
          thickness={10}
          indeterminate={true}
        />
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}
