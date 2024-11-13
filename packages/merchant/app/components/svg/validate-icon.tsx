import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { palette } from "../../../../shared/theme/palette"
import { normalize } from "../../../../shared/utils/normalize"

function SvgComponent({height = normalize(50), width = normalize(60),fill = palette.white, ...props}) {
  return (
    <Svg
      viewBox="0 0 50 39"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      height={height}
      width={width}
      {...props}
    >
      <Path
        d="M8289.21 1476.61l53.97-53.97c3.04-3.05 7.98-3.05 11.03 0l11.03 11.03c3.04 3.04 3.04 7.99 0 11.03l-58.69 58.69c-.22.3-.47.58-.74.85l-11.03 11.03a7.798 7.798 0 01-5.57 2.29c-2.02.01-4.04-.75-5.57-2.29l-11.04-11.03c-.26-.27-.51-.55-.73-.85l-28.92-28.92a7.792 7.792 0 010-11.03l11.03-11.03a7.792 7.792 0 0111.03 0l24.2 24.2z"
        transform="translate(-4047.17 -824.879) translate(799.189 265.06) scale(.39414)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
