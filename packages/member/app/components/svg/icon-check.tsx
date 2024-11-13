import React from "react";
import Svg, { G, Circle, Text, TSpan } from "react-native-svg";

function CheckIcon(props) {
  return (
    <Svg width="28" height="24" viewBox="0 0 28 24" {...props}>
      <G id="ANIT-re-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="My-Profile---My-Vehicles" transform="translate(-199, -301)">
          <G id="icon-check" transform="translate(199, 301)">
            <Circle id="Oval" fill="#1B588A" cx="14" cy="12" r="12" />
            <Text id="✓" fontFamily="DevanagariMT-Bold, Devanagari MT" fontSize="16" fontWeight="bold" fill="#FFFFFF">
              <TSpan x="6.62890625" y="18">✓</TSpan>
            </Text>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default CheckIcon;
