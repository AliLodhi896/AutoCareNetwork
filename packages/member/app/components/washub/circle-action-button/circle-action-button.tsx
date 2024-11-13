import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator
} from "react-native";
import { styles } from "./circle-action-button.styles";
import { Text } from "../../../../../shared/components";

interface CircleActionButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean
}

export function CircleActionButton({ text, onPress, style, textStyle, disabled, loading = false }: CircleActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ ...styles.container }, style]}
      disabled={disabled === true ? true : false}
    >
      {loading === true ?
        <ActivityIndicator
          size={20}
          color={'white'} />
        :
        <Text style={[{ ...styles.text }, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
}
