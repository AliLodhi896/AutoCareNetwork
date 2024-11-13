import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface LineInputProps extends Omit<TextInputProps, "onChange"> {
  fieldName: string;
  label?: string;
  onChange?: (name: string, val?: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  placeholder?: string;
  formatter?: (value: string, val?: string) => string;
}
