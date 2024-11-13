import React from "react";
import { View, StyleSheet } from "react-native";
import { color, spacings } from "../../../../shared/theme";

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
    height: spacings.mediumOne,
    width: spacings.mediumOne,
    marginRight: spacings.smaller,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
  },
  selected: {
    backgroundColor: color.palette.white,
  },
});

export default PageControl;
