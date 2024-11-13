import * as React from "react";
import Svg, { Path } from "react-native-svg";

function NavLightIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14.489}
      height={31}
      {...props}
    >
      <Path
        fill="none"
        fillRule="evenodd"
        stroke="#1B588A"
        strokeLinecap="round"
        strokeOpacity={0.501}
        strokeWidth={4}
        d="m2 2 10 13.557L2 29"
      />
    </Svg>
  );
}

export default NavLightIcon;
