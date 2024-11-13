import { color } from "../../theme/color";
import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

export default function LoadingScreen({ style }: { style?: ViewStyle }) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#BDE8F9",
        ...style,
      }}
    >
      <ActivityIndicator color="#1B588A" size="large" />
    </View>
  );
}
