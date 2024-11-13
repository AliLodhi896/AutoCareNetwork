import * as React from "react"
import Svg, { G, Text, TSpan } from "react-native-svg"

function ArrowDown(props) {
  return (
    <Svg
    width="20"
    height="35"
    viewBox="0 0 20 35"
    xmlns="http://www.w3.org/2000/svg"
    fill="#1D1D1D"
    {...props}
  >
    <G id="ANIT-re-brand" stroke="none" strokeWidth="1">
      <G id="My-Profile-Menu" transform="translate(-303.5, -307.5)">
        <G id="Group-7" transform="translate(56, 305)">
          <Text
            id="❯"
            fontSize="20"
            fontWeight="normal"
            transform="translate(257.5, 20) rotate(270) translate(-257.5, -20)"
          >
            <TSpan x="252.412109" y="26">
              ❯
            </TSpan>
          </Text>
        </G>
      </G>
    </G>
  </Svg>
  )
}

export default ArrowDown
