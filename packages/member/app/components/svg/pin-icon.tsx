import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { normalize } from "../../../../shared/utils/normalize";

function PinIcon({ width = 29, height = 42, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <G fill="none" fillRule="evenodd">
        <Path
          fill="#FFF"
          d="M14.5 0C22.503 0 29 6.732 29 15.025c0 4.21-1.964 9.358-4.443 13.976-3.469 6.466-7.804 11.9-7.804 11.9A2.885 2.885 0 0 1 14.5 42a2.889 2.889 0 0 1-2.253-1.1s-4.335-5.433-7.804-11.899C1.967 24.383 0 19.234 0 15.025 0 6.732 6.497 0 14.5 0Zm0 8.235c-3.56 0-6.444 2.95-6.444 6.589 0 3.638 2.885 6.588 6.444 6.588 3.56 0 6.444-2.95 6.444-6.588 0-3.64-2.885-6.589-6.444-6.589Z"
        />
      </G>
    </Svg>
  );
}

export default PinIcon;
