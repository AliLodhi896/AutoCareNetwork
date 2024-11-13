import React from "react";
import { View } from "react-native";
import { styles } from "./toggle-mode.style";
import { CircleActionButton } from "../circle-action-button/circle-action-button";

interface ToggleModeProps {
  handleOnPress: () => void;
  isMapMode: boolean;
  isLoading?: boolean;
}

export function ToggleMode({ isMapMode, handleOnPress, isLoading }: ToggleModeProps) {
  return (
    <View>
      <CircleActionButton
        loading={isLoading}
        style={styles.actionButton}
        text={isMapMode ? "LIST VIEW" : "MAP VIEW"}
        onPress={() => {
          handleOnPress();
        }}
      />
    </View>
  );
}
