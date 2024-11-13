import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconWSPhone = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="m4.73 4.02-.004-.006-3.343 3.348a4.744 4.744 0 0 0 0 6.696L25.9 38.615a4.72 4.72 0 0 0 6.68 0l3.343-3.348v-.005l3.318-3.324a2.615 2.615 0 0 0 0-3.684l-4.773-4.776a2.599 2.599 0 0 0-3.673 0l-2.166 2.169c-.374.297-1.27.785-2.461-.151L14.33 13.639c-.292-.365-.783-1.252.112-2.427l1.985-1.993a2.6 2.6 0 0 0 0-3.68L11.659.765a2.596 2.596 0 0 0-3.678 0L4.73 4.019Z"
    />
  </Svg>
);
export default IconWSPhone;
IconWSPhone.defaultProps = {
  fill: "#FFFFFF",
};
