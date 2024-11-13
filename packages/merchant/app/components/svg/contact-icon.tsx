import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { palette } from "../../../../shared/theme/palette"
import { normalize } from "../../../../shared/utils/normalize"

function SvgComponent({height = normalize(50), width = normalize(50),fill = palette.white, ...props}) {
  return (
    <Svg
      viewBox="0 0 50 49"
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
        d="M7799.57 1506.32v-48.15c0-12.3 9.99-22.28 22.29-22.28h62.49c12.3 0 22.28 9.98 22.28 22.28v48.15h-14v-48.15c0-4.57-3.71-8.28-8.28-8.28h-62.49c-4.57 0-8.29 3.71-8.29 8.28v48.15h-14zm53.19-152.64c19.95 0 36.14 16.19 36.14 36.14s-16.19 36.15-36.14 36.15-36.15-16.2-36.15-36.15 16.2-36.14 36.15-36.14zm77.74 59.45h-32.42v-46.42h.03c.8-24.07 20.6-43.36 44.87-43.36 24.77 0 44.89 20.11 44.89 44.89 0 24.26-19.3 44.06-43.37 44.86v.03h-12.77c-.76-.54-1.23-.63-1.23-.02v.02zm-77.74-45.45c12.22 0 22.14 9.92 22.14 22.14 0 12.23-9.92 22.15-22.14 22.15-12.23 0-22.15-9.92-22.15-22.15 0-12.22 9.92-22.14 22.15-22.14zm91.27 31.45h-31.95v-31.64l.02-.31c.55-16.56 14.18-29.83 30.88-29.83 17.04 0 30.89 13.84 30.89 30.89 0 16.69-13.28 30.32-29.84 30.87v.02z"
        transform="translate(-3654.87 -815.551) matrix(.26555 0 0 .26555 1583.72 464.142)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
