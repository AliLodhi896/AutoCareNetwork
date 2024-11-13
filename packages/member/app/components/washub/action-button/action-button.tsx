import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { styles } from "./action-button.styles";
import { Text } from "../../../../../shared/components";

interface Props extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon: React.ReactNode;
}

export function LocationButton(props: Props) {
  const { text, style, icon, ...rest } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignItems:'center'}} {...rest}>
        {icon}
        <Text text={text} style={styles.text} />
      </TouchableOpacity>
    </View>
  );
}
