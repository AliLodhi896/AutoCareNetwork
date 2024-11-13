import React from "react";
import { StyleSheet } from "react-native";
import { color, spacings } from "../../../../theme";
import {VIcon} from "../../../../components/v-icon/v-icon";


export default function (selected: boolean, starColor?: string) {
  return (
    <VIcon
      style={style.numberContainer}
      family="MaterialIcons"
      name={selected ? "star" : "star-outline"}
      color={
        starColor || (selected ? color.palette.yellow : color.palette.white)
      }
      size={spacings.icons.medium}
    />
  );
}

const style = StyleSheet.create({
  numberContainer: {
    margin: spacings.tiny,
  },
});
