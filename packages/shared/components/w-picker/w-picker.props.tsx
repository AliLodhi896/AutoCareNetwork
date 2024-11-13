import { TextStyle, ViewStyle } from "react-native";

export interface PickerProps {
  fieldName: string;
  label?: string;
  onChange?: (name: string, val?: string) => void;
  value?: any;
  items?: any;
  containerStyle?: ViewStyle;
  pickerStyle?: any;
  labelStyle?: TextStyle;
  placeholder?: string;
  error?: boolean | string;
}
