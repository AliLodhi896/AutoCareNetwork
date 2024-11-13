import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Star from "./renderers/Star";

type Props = {
  maxNumber?: number;
  rating?: number;
  onRatingChanged?: (rating: number) => void;
  renderRating?: (selected: boolean, color: string) => Element;
  style?: StyleProp<ViewStyle>;
  starColor?: string;
};

export default function UserFeedback(props: Props) {
  const {
    renderRating = Star,
    maxNumber = 5,
    rating = 0,
    onRatingChanged,
    starColor,
  } = props;

  var elements = [];
  for (let index = 1; index <= maxNumber; index++) {
    const rendered = renderRating(index <= rating, starColor);
    elements.push(
      <TouchableOpacity
        key={index}
        onPress={() => onRatingChanged && onRatingChanged(index)}
      >
        {rendered}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.container, props.style]}>{elements}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});
