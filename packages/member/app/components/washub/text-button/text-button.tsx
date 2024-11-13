import React from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View } from "react-native";
import { styles } from "./text-button.style";
import { TouchableOpacity } from "react-native";
import { fontsize } from "../../../../../shared/theme";

interface BackButtonProps {
  handleOnPress: () => void;
}

export function TextButton({ handleOnPress }: BackButtonProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleOnPress} style={{ ...styles.container }}>
        <Text style={styles.text}>
          <Text style={{ ...styles.text, fontSize: fontsize.tiny }}>{"<"}</Text>{" "}
          BACK
        </Text>
      </TouchableOpacity>
    </View>
  );
}
