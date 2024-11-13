import * as React from "react";
import Svg, { SvgProps, Path, G } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconX = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21.708}
    height={21.708}
    {...props}
  >
    <G fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth={2}>
      <Path d="m.707.707 20.294 20.294M21 .707.708 21.001" />
    </G>
  </Svg>
);
export default IconX;
