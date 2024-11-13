import * as React from "react"
import Svg, { G, Text, TSpan } from "react-native-svg"

function ArrowUp(props) {
  return (
    <Svg width="20" height="35" viewBox="0 0 20 35" {...props}>
    <G id="ANIT-re-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fontFamily="ZapfDingbatsITC, Zapf Dingbats" fontSize="20" fontWeight="normal">
      <G id="My-Profile-Menu" transform="translate(-303.5, -307.5)" fill="#1D1D1D">
        <G id="Group-7" transform="translate(56, 305)">
          <Text id="❯" transform="translate(257.5, 20) rotate(90) translate(-257.5, -20)">
            <TSpan x="252.412109" y="26">❯</TSpan>
          </Text>
        </G>
      </G>
    </G>
  </Svg>
  )
}

export default ArrowUp
