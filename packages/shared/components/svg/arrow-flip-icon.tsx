import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowFlipIcon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
      <Path
        fill="#1B588A"
        fillOpacity={0.148}
        fillRule="evenodd"
        d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Zm6 10-1.168 1.178 2.989 2.989H17.667a6.667 6.667 0 0 0 0 13.333h6.666v-1.667h-6.666a5 5 0 0 1 0-10h10.151l-2.986 2.988L26 20l5-5-5-5Z"
      />
    </Svg>
  );
}

export default ArrowFlipIcon;
