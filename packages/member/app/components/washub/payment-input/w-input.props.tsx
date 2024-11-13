import {StyleProp, TextInputProps, TextStyle} from "react-native"

export interface WashubInputProps extends Omit<TextInputProps , 'onChange'> {
  /** name of the input field */
  fieldName?: string
  formatter?: (value: string, val?: string) => string;
  /*custom onchange to get only the string */
  onChange?: (name: string, val?: string) => void
  label?: string | null;
  mask:any
    /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
}
