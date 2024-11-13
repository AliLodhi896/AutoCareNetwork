import React from "react";
import { View, TextInput } from "react-native";
import { Text } from "../../components";
import { styles } from "./l-input.styles";
import { LineInputProps } from "./l-input.props";
import { color } from "../../theme";

export const LineInput = (props: LineInputProps) => {
  const {
    onChange,
    label,
    fieldName,
    value,
    containerStyle,
    textInputStyle,
    labelStyle,
    formatter = (value: string) => value,
    ...rest
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          fontFamily="secondary"
          style={[styles.label, labelStyle]}
          preset="fieldLabel"
        >
          {label}:
        </Text>
      )}
      <TextInput
        nativeID={fieldName}
        underlineColorAndroid="transparent"
        style={[styles.textInput, textInputStyle]}
        onChangeText={(e) => onChange?.(e)}
        value={formatter(value)}
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholderTextColor={color.palette.black}
        {...rest}
      />
    </View>
  );
};
