import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { VIcon } from "../v-icon/v-icon"
import { CircleActionButtonProps } from "./circle-action-button.props"
import { styles } from "./circle-action-button.styles"

export const CircleActionButton = (props: CircleActionButtonProps) => {
  const { name, family, text, size, color, backgroundColor, onPress } = props;
  return (
    <View style={styles.frame}>

      <TouchableOpacity onPress={onPress} style={[{ backgroundColor, borderRadius: size * 1.3, width: 110, height: 110, }, styles.container]}>
        <VIcon name={name} family={family} size={size} color={color} />
        <Text style={[styles.text, { color: color, fontSize: size * 0.2 }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}