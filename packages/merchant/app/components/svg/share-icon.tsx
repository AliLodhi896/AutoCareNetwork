import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { normalize } from "../../../../shared/utils/normalize"
import { palette } from "../../theme/palette"

function SvgComponent({height = normalize(50), width = normalize(60),fill = palette.white, ...props}) {
  return (
    <Svg
      viewBox="0 0 37 50"
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
        d="M8453.85 1506.24h-41.9c-21.73-.07-23.63-22.9-23.63-22.9a8.7 8.7 0 01-.02-.52v-84.79-.06c.18-20.51 23.15-23.77 23.15-23.77.28-.04.57-.06.85-.06h11.79c3.86 0 7 3.14 7 7 0 3.87-3.14 7-7 7h-11.25c-.84.16-3.2.68-5.57 2-2.42 1.36-4.92 3.71-4.97 7.93 0 0 0 84.46.01 84.47.15 1.51 1.35 9.67 9.68 9.7h83.62c8.33-.03 9.53-8.19 9.69-9.7v-84.47c-.05-4.22-2.56-6.57-4.97-7.93-2.37-1.32-4.73-1.84-5.57-2h-11.25c-3.86 0-7-3.13-7-7 0-3.86 3.14-7 7-7h11.79c.28 0 .57.02.85.06 0 0 22.97 3.26 23.15 23.77V1482.82c0 .18-.01.35-.02.52 0 0-1.9 22.83-23.63 22.9h-41.8zm-.08-177.12c1.71 0 3.4.62 4.72 1.81l24.25 21.89c2.87 2.59 3.1 7.02.51 9.89a7.005 7.005 0 01-9.89.51l-12.56-11.34v82.31c0 3.86-3.14 7-7 7h-.06c-3.86 0-7-3.14-7-7v-82.31l-12.56 11.34a7.005 7.005 0 01-9.89-.51 7.005 7.005 0 01.51-9.89l24.25-21.89a7.044 7.044 0 014.72-1.81z"
        transform="translate(-3747.44 -814.139) matrix(.2823 0 0 .2823 1379.45 438.931)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
