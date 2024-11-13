import React from "react";
import { View } from "react-native";
import { styles } from "./error.style";
import { Text } from "../../../../../shared/components";

export function Error({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} text={text} />
    </View>
  );
}
