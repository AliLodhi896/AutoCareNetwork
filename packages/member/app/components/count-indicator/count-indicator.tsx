import React from "react";
import { View } from "react-native";
import { styles } from "./count-indicator.styles";

const CountIndicator = ({ count }: { count: number }) => {
  const indicators = [];

  for (let index = 0; index < Math.min(5, count); index++) {
    indicators.push(<View key={index} style={styles.circle} />);
  }

  return <View style={styles.bubble}>{indicators}</View>;
};

export default CountIndicator;
