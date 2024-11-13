import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { palette } from "../../../../shared/theme/palette"
import { normalize } from "../../../../shared/utils/normalize"

function SvgComponent({height = normalize(50), width = normalize(50),fill = palette.white, ...props}) {
  return (
    <Svg
      viewBox="0 0 50 50"
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
        d="M3822.55 814.139c13.41 0 24.29 11.202 24.29 25s-10.88 25-24.29 25c-13.41 0-24.29-11.202-24.29-25s10.88-25 24.29-25zm0 4c11.23 0 20.29 9.441 20.29 21s-9.06 21-20.29 21c-11.23 0-20.29-9.441-20.29-21s9.06-21 20.29-21zm-2 5.336v14.835l-6.61 6.611a2.001 2.001 0 002.83 2.828l7.19-7.196c.38-.375.59-.884.59-1.414v-15.664c0-1.104-.9-2-2-2s-2 .896-2 2z"
        transform="translate(-3831.3 -815.551) matrix(1.02907 0 0 1 -77.376 1.413)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
