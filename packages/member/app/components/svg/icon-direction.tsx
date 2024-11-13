import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconDirection = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <Path
      fill="none"
      fillRule="nonzero"
      stroke="#00BCFF"
      strokeWidth={3}
      d="M1.5 15.35a1.543 1.543 0 0 0 .97 1.457l14.802 5.921 5.92 14.803a1.543 1.543 0 0 0 1.433.969h.025a1.542 1.542 0 0 0 1.424-1.015L38.407 3.57a1.54 1.54 0 0 0-1.976-1.976L2.515 13.926A1.544 1.544 0 0 0 1.5 15.351Z"
    />
  </Svg>
);
export default IconDirection;
