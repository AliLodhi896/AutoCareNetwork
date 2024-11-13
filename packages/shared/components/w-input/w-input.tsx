// @flow

"use strict";

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { color, spacings } from "../../theme";
import { VIcon } from "../v-icon/v-icon";
import { WashubInputProps } from "./w-input.props";
import { styles } from "./w-input.styles";

export const WashubInput = (props: WashubInputProps) => {
  const { onChange, fieldName, secureTextEntry, style, formatter = (value: string) => value,value,  ...rest } = props;
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
          placeholderTextColor={color.palette.black}
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
              color={color.palette.red}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default WashubInput;
