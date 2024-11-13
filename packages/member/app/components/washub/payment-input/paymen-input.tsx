import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { WashubInputProps } from "./w-input.props";
import { styles } from "./w-input.styles";
import { spacings } from "../../../../../shared/theme";
import { VIcon } from "../../../../../shared/components";
import { MaskedTextInput } from 'react-native-mask-text'; // Import MaskedTextInput from the library

export const PaymentInput = (props: WashubInputProps) => {
  const {
    onChange,
    fieldName,
    secureTextEntry,
    style,
    formatter = (value: string) => value,
    value,
    label,
    placeholder,
    mask, // Add mask prop for defining the input mask
    ...rest
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeText = (inputValue: string) => {
    const validatedValue = formatter(inputValue);
    onChange?.(validatedValue);
  };

  return (
    <>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Use MaskedTextInput with the provided mask */}
          <MaskedTextInput
            type="cel-phone"
            placeholder={placeholder}
            nativeID={fieldName}
            mask={mask}
            keyboardType="number-pad"
            style={[styles.textInput, style]}
            onChangeText={(text, rawText) => {
              console.log(rawText);
            }}
            {...rest}
          />
          {/* <MaskedTextInput
            nativeID={'email'}
            underlineColorAndroid="transparent"
            style={[styles.textInput, style]}
            // onChangeText={handleChangeText}
            // value={value}
            autoCorrect={false}
            autoCapitalize={"none"}
            placeholerTextColor="#969696"
            placeholder={placeholder}
            // secureTextEntry={secureTextEntry && !passwordVisible}
            mask={'0000000'} // Pass the mask prop
            {...rest}
          /> */}
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.secureButton}
              onPress={toggleVisibility}
            >
              <VIcon
                family="Ionicons"
                name={`eye${passwordVisible ? "" : "-off"}`}
                size={spacings.icons.medium}
                color="#00BCFF"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default PaymentInput;
