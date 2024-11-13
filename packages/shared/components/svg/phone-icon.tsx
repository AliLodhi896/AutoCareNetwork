import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M8251.14 1326.21l-.01-.01-6.87 6.87c-3.79 3.79-3.79 9.95 0 13.74l50.39 50.39c3.79 3.79 9.94 3.79 13.73 0l6.87-6.87v-.01l6.82-6.82a5.36 5.36 0 000-7.56l-9.81-9.8a5.348 5.348 0 00-7.55 0l-4.45 4.45c-.77.61-2.61 1.61-5.06-.31l-24.33-24.33c-.6-.75-1.61-2.57.23-4.98l4.08-4.09a5.33 5.33 0 000-7.55l-9.8-9.8a5.341 5.341 0 00-7.56 0l-6.68 6.68z"
        transform="translate(-3642.24 -615.119) translate(-1369.71 -186.388) scale(.60814)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent