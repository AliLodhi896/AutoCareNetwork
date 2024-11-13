import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { normalize } from "../../../../shared/utils/normalize";

function HeartIcon({ width = 46.055, height = 40, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <Path
        fill="#FFF"
        fillRule="evenodd"
        d="M23.027 6.863c4.848-8.284 14.544-8.284 19.392-4.142 4.848 4.142 4.848 12.426 0 20.71C39.025 29.646 30.299 35.859 23.027 40 15.756 35.858 7.03 29.645 3.636 23.432c-4.848-8.285-4.848-16.569 0-20.711C8.484-1.421 18.18-1.421 23.027 6.863Z"
      />
    </Svg>
  );
}

export default HeartIcon;
