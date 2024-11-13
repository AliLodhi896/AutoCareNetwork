import React from "react";
import { View, StyleSheet } from "react-native";

const PageControl = ({
  pageCount,
  index,
}: {
  pageCount: number;
  index: number;
}) => {
  const indicators = [];

  for (let i = 0; i < pageCount; i++) {
    indicators.push(
      <View
        key={i}
        style={[styles.circle, index === i ? styles.selected : undefined]}
      />
    );
  }

  return <View style={styles.wrapper}>{indicators}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    height: 20,
    display: "flex",
    flexDirection: "row",
    padding: 3,
    justifyContent: "flex-start",
  },
  circle: {
    height: 10,
    width: 10,
    marginRight: 3,
    backgroundColor: "#cccccc",
    borderRadius: 20,
  },
  selected: {
    backgroundColor: "#666666",
  },
});

export default PageControl;
