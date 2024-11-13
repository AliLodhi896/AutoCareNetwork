import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconMenu = (props: SvgProps) => (

  <Svg xmlns="http://www.w3.org/2000/svg" width={48} height={37} {...props}>
    <Path
      fill="#00BCFF"
      fillRule="nonzero"
      d="M3.36363636,0 L43.7272727,0 C44.6189727,0.000874545455 45.4740091,0.35557 46.1046909,0.986184545 C46.7353727,1.61676545 47.0899,2.47180182 47.0909091,3.36363636 L47.0909091,33.6363636 C47.0899,34.5280636 46.7353727,35.3831 46.1046909,36.0137818 C45.4740091,36.6444636 44.6189727,36.9989909 43.7272727,37 L3.36363636,37 C2.47180182,36.9989909 1.61676545,36.6444636 0.986184545,36.0137818 C0.35557,35.3831 0.000874545455,34.5280636 0,33.6363636 L0,3.36363636 C0.000874545455,2.47180182 0.35557,1.61676545 0.986184545,0.986184545 C1.61676545,0.35557 2.47180182,0.000874545455 3.36363636,0 Z M21.8636364,3.36363636 L3.36363636,3.36363636 L3.36363636,33.6363636 L21.8636364,33.6363636 L21.8636364,3.36363636 Z M25.2272727,3.36363636 L25.2272727,33.6363636 L43.7272727,33.6363636 L43.7272727,3.36363636 L25.2272727,3.36363636 Z M18.5,8.40909091 L6.72727273,8.40909091 L6.72727273,11.7727273 L18.5,11.7727273 L18.5,8.40909091 Z M40.3636364,8.40909091 L28.5909091,8.40909091 L28.5909091,11.7727273 L40.3636364,11.7727273 L40.3636364,8.40909091 Z M40.3636364,16.8181818 L28.5909091,16.8181818 L28.5909091,20.1818182 L40.3636364,20.1818182 L40.3636364,16.8181818 Z M28.5909091,25.2272727 L40.3636364,25.2272727 L40.3636364,28.5909091 L28.5909091,28.5909091 L28.5909091,25.2272727 Z M6.72727273,16.8181818 L18.5,16.8181818 L18.5,20.1818182 L6.72727273,20.1818182 L6.72727273,16.8181818 Z M18.5,25.2272727 L6.72727273,25.2272727 L6.72727273,28.5909091 L18.5,28.5909091 L18.5,25.2272727 Z"

    />
  </Svg>
);
export default IconMenu;
