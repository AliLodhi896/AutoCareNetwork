import * as React from "react";
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "../text/text";
import { color, Radii, spacing } from "../../theme";
import { CheckboxProps } from "./checkbox.props";

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing[1],
  alignSelf: "flex-start",
};

const DIMENSIONS = { width: 16, height: 16 };

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: color.palette.white,
  borderRadius: 0.6*Radii.small,
};

const FILL: ViewStyle = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: color.primary,
};

const LABEL: TextStyle = { paddingLeft: spacing[2] };

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1;

  const rootStyle = [ROOT, props.style];
  const outlineStyle = [OUTLINE, props.outlineStyle];
  const fillStyle = [FILL, props.fillStyle];

  const onPress = props.onToggle
    ? () => props.onToggle && props.onToggle(!props.value)
    : null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <View style={outlineStyle}>
        {props.value && <View style={fillStyle} />}
      </View>
      {props.text && (
        <Text
          text={props.text}
          tx={props.tx}
          numberOfLines={numberOfLines}
          style={LABEL}
        />
      )}
    </TouchableOpacity>
  );
}
