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
        d="M8525.95 1304.93l.24.01h-.02c-.27-.01-4.13-.07-6.31 2.74-.89 1.15-1.61 2.8-1.47 5.25v60.78-.04c-.04.96.06 3.03 1.37 4.72 1.05 1.35 2.87 2.74 6.37 2.59h30.88l16.94 16.34c.92.89 2.23 1.25 3.48.95 1.24-.3 2.25-1.21 2.67-2.43l5.17-14.99 20.11-.04c.18 0 .35-.02.53-.04 0 0 3.49-.51 5.37-3.46.75-1.18 1.3-2.74 1.16-4.87l.01-60.49c0-.14-.01-.28-.02-.41 0 0-.93-6.96-7.43-6.61h.01-79.06zm-.08 7.5h79.08l-.01 60.16c0 .1 0 .2.01.3a.5.5 0 01-.15.42l-22.21.04a3.76 3.76 0 00-3.54 2.53l-4.13 11.96-13.79-13.31c-.7-.67-1.63-1.05-2.6-1.05h-32.64v-60.68l-.02-.37zm44.46 40.41h-33.16v6.96h33.16v-6.96zm22.08-13.43h-55.24v6.97h55.24v-6.97zm0-13.76h-55.24v6.97h55.24v-6.97z"
        transform="translate(-3795.46 -609.432) translate(-731.205 -84.002) scale(.5314)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
