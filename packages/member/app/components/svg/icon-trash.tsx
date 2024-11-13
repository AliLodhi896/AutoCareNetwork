import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconTrash = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={27.429} height={32} {...props}>
    <Path
      ill={props.fill}
      fillRule="evenodd"
      d="M9.143 0h9.143v2.286H9.143V0ZM0 4.571v2.286h2.286v22.857A2.286 2.286 0 0 0 4.57 32h18.286a2.286 2.286 0 0 0 2.286-2.286V6.857h2.286V4.571H0Zm4.571 25.143V6.857h18.286v22.857H4.571ZM9.143 11.43h2.286v13.714H9.143V11.429Zm6.857 0h2.286v13.714H16V11.429Z"
    />
  </Svg>
);
export default IconTrash;
IconTrash.defaultProps = {
  fill: "#FB3C33",
};
