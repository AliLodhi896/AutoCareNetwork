import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TextButton } from "./text-button/text-button";

interface ContainerProps {
  showBack?: boolean;
  children: React.ReactNode;
}

function RedeemContainer({ showBack = true, children }: ContainerProps) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: showBack ? 4 : 2 }}>
        {showBack && navigation.canGoBack() && (
          <TextButton handleOnPress={() => navigation.goBack()} />
        )}
      </View>

      <View style={{ flex: 21 }}>{children}</View>
      <View style={{ flex: 2 }} />
    </View>
  );
}

export default RedeemContainer;
