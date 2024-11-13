import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const IconPhone = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} {...props}>
    <Path
      fill="#00BCFF"
      fillRule="nonzero"
      d="M32.732 37h-.242C4.537 35.392.568 11.797.014 4.597A4.27 4.27 0 0 1 3.94 0h7.838a2.845 2.845 0 0 1 2.646 1.793l2.162 5.322a2.847 2.847 0 0 1-.626 3.074l-3.03 3.06a13.336 13.336 0 0 0 10.783 10.815l3.087-3.06a2.845 2.845 0 0 1 3.087-.583l5.363 2.149A2.844 2.844 0 0 1 37 25.217v7.514A4.27 4.27 0 0 1 32.732 37ZM4.282 2.846A1.422 1.422 0 0 0 2.858 4.27v.114c.654 8.425 4.85 28.348 29.788 29.77a1.423 1.423 0 0 0 1.508-1.337v-7.6l-5.363-2.148-4.083 4.056-.683-.086C11.65 25.488 9.971 13.107 9.971 12.978l-.085-.683 4.04-4.084-2.134-5.365h-7.51Z"
    />
  </Svg>
);
export default IconPhone;
