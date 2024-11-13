import * as React from "react"
import Svg, { Image } from "react-native-svg"
import { spacings } from "../../theme";
import { normalize } from "../../utils/normalize";

function SvgComponent(props) {
    const width = normalize(spacings.icons.small);
    const height = normalize(spacings.icons.medium);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox={`264 1671 ${width} ${height}`}
      {...props}
    >
      <Image
        width={width}
        height={height}
        xlinkHref="data:image/png;base64,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"
        data-name="find location"
        transform="translate(264 1671)"
      />
    </Svg>
  )
}

export default SvgComponent
