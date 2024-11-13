import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconDrop = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={38.238} height={66} {...props}>
    <Path
      fill="#00BCFF"
      fillRule="evenodd"
      d="M25.883 14.464C21.056 6.75 19.126 0 19.126 0h-.014s-1.93 6.75-6.757 14.464C7.529 22.177 0 32.976 0 43.774 0 54.574 6.945 66 19.275 66c12.5 0 18.963-11.425 18.963-22.226 0-10.798-7.528-21.597-12.355-29.31"
    />
  </Svg>
);
export default IconDrop;
