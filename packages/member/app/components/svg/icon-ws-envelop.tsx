import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconWSEnvelop = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={26.954} {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="M38.687 26.357a3.147 3.147 0 0 1-1.848.597H3.158A3.16 3.16 0 0 1 0 23.796V3.158A3.16 3.16 0 0 1 3.158 0h33.68C39.757.087 40 2.635 40 3.158v20.638a3.16 3.16 0 0 1-.784 2.083c-.053.087-.12.174-.2.247a1.167 1.167 0 0 1-.329.231ZM25.32 14.527l-4.504 3.847a1.254 1.254 0 0 1-1.65-.017l-4.216-3.76-10.006 9.845h30.583L25.32 14.527ZM2.512 23.38l10.595-10.427-10.595-9.45V23.38Zm24.68-10.45 10.296 10.002V4.136l-10.297 8.793Zm8.33-10.418H5.175l14.844 13.244L35.523 2.512Z"
    />
  </Svg>
);
export default IconWSEnvelop;
IconWSEnvelop.defaultProps = {
  fill: "#FFFFFF",
};
