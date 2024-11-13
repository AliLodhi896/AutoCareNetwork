import React from "react";
import { View } from "react-native";
import { styles } from "./error-drop.style";
import { Text } from "../../../../../shared/components";
import IconDrop from "../../svg/icon-drop";

export function ErrorDrop({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <IconDrop />
        <Text style={styles.text} text={text} />
        {children}
      </View>
    </View>
  );
}
