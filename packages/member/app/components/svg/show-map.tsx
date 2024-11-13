import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShowMapIcon(props) {
  return (
    <Svg
      viewBox="0 0 47 50"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M6597.43 2150.97a6.452 6.452 0 00-2.11-.08l-52.22-33.96a7.006 7.006 0 00-7.45-.11l-58.32 35.53a6.997 6.997 0 00-3.36 5.94l-.78 151.83a7 7 0 003.52 6.11 7.018 7.018 0 007.06-.06l54.7-32.49 53.65 32.24a7 7 0 007.19.02l58.5-34.89a7.01 7.01 0 003.42-6.03l-.35-152.99a7.007 7.007 0 00-3.69-6.15 6.994 6.994 0 00-7.17.33l-52.59 34.76zm-52.24 120.41l44.24 26.6-.3-134.42-44.26-28.78.32 136.6zm-14.32-135.25l.32 135.59-43.94 26.1.7-135.55 42.92-26.14zm72.26 27.85l43.78-28.93.31 136.02-43.79 26.11-.3-133.2z"
        transform="translate(-3653.37 -1548.8) matrix(.2474 0 0 .2474 2051.93 1025.54)"
        fill="#fff"
      />
    </Svg>
  )
}

export default ShowMapIcon
