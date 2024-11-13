import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconKey = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={39.004} height={39} {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M20.828 1.337A12.532 12.532 0 0 1 26.464 0a12.536 12.536 0 1 1-3.638 24.53L8.357 39H0v-8.357l14.47-14.47a12.533 12.533 0 0 1 6.358-14.836Zm2.806 20.528a9.75 9.75 0 1 0-6.499-6.499l.484 1.597-1.18 1.18L2.786 31.797v4.417h4.417l3.074-3.074-1.92-1.92 1.97-1.97 1.92 1.92 2.209-2.209-1.92-1.92 1.97-1.97 1.92 1.92 4.43-4.43 1.18-1.18 1.598.484Zm7.009-10.722a2.786 2.786 0 1 1-5.572 0 2.786 2.786 0 0 1 5.572 0Z"
    />
  </Svg>
);
export default IconKey;
