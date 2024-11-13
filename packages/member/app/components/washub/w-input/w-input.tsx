// @flow

"use strict";

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { WashubInputProps } from "./w-input.props";
import { styles } from "./w-input.styles";
import { color, spacings } from "../../../../../shared/theme";
import { VIcon } from "../../../../../shared/components";

export const WashubInput = (props: WashubInputProps) => {
  const {
    onChange,
    fieldName,
    secureTextEntry,
    style,
    formatter = (value: string) => value,
    value,
    ...rest
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          nativeID={fieldName}
          underlineColorAndroid="transparent"
          style={[styles.textInput, style]}
          onChangeText={(e) => onChange?.(e)}
          value={formatter(value)}
          autoCorrect={false}
          autoCapitalize={"none"}
          placeholderTextColor="#969696"
          secureTextEntry={secureTextEntry && !passwordVisible}
          {...rest}
        />
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
  );
};

export default WashubInput;
