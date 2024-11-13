import * as React from "react";
import { Text as ReactNativeText } from "react-native";
import { presets } from "./text.presets";
import { TextProps } from "./text.props";
import { typography } from "../../theme";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const content =  text || children;

  const style = presets[preset] || presets.default;

  let fontFamilyStyle = { fontFamily: typography.primary };
  if (props.fontFamily) {
    fontFamilyStyle = {
      fontFamily:
        props.fontFamily == "primary"
          ? typography.primary
          : typography.secondary,
    };
  }

  const styles = [style, fontFamilyStyle, styleOverride];

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
}
