import * as React from "react";
import Svg, { G, Text, TSpan } from "react-native-svg";
import { color } from "../../../../shared/theme";

function RotatedArrowRight(props) {
  return (
    <Svg
      viewBox="0 0 35 20"
      xmlns="http://www.w3.org/2000/svg"
      fill={color.palette.deepBlue}
      {...props}
    >
      <G id="ANIT-re-brand" stroke="none" strokeWidth="1">
        <G id="My-Profile-Menu" transform="translate(-307.5, -303.5)">
          <G id="Group-7" transform="translate(305, 56)">
            <Text
              id="❯"
              fontSize="20"
              fontWeight="normal"
              transform="translate(20, 257.5) rotate(180) translate(-20, -257.5)"
            >
              <TSpan x="15.412109" y="266">
                ❯
              </TSpan>
            </Text>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default RotatedArrowRight;
RotatedArrowRight.defaultProps = {
  with: 35,
  height: 20,
};
