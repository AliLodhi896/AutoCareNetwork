import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconHeartLight = (props: SvgProps) => {
  props.fill ??= "none";
  
  return (
    <Svg width={44} height={39} {...props}>
      <Path
        fillRule="evenodd"
        stroke="#00BCFF"
        strokeWidth={2.993}
        d="M21.498 7.534C25.708.285 34.129.285 38.34 3.91c4.21 3.624 4.21 10.873 0 18.121-2.948 5.437-10.527 10.874-16.843 14.498-6.315-3.624-13.894-9.061-16.842-14.498-4.21-7.248-4.21-14.497 0-18.121C8.865.285 17.287.285 21.498 7.534Z"
      />
    </Svg>
  );
};
export default IconHeartLight;
