import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 50 34"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M8919.54 1395.93a9.399 9.399 0 01-5.52 1.78h-100.58c-5.2 0-9.43-4.22-9.43-9.43v-61.63c0-5.21 4.23-9.43 9.43-9.43h100.58c8.71.26 9.44 7.87 9.44 9.43v61.63c0 2.38-.89 4.56-2.34 6.22-.16.26-.36.52-.6.74-.29.29-.62.52-.98.69zm-39.92-35.33l-13.45 11.49a3.743 3.743 0 01-4.93-.05l-12.59-11.23-29.88 29.4h91.33l-30.48-29.61zm-68.11 26.44l31.64-31.14-31.64-28.22v59.36zm73.7-31.21l30.75 29.87v-56.13l-30.75 26.26zm24.88-31.11h-90.63l44.33 39.55 46.3-39.55z"
        transform="translate(-3953.48 -616.241) matrix(.4186 0 0 .4186 268.068 64.845)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
