import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./loader.style";

interface LoaderProps {
  close?(): void;
}

export function Loader({ close }: LoaderProps) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={"#00BCFF"} />
    </View>
  );
}
