import * as React from "react";
import Svg, { Path, SvgProps} from "react-native-svg";

interface MapPinXsIconProps extends SvgProps{
  color?: string;
}

function MapPinXsIcon({color = "#00BCFF", ...props}: MapPinXsIconProps) {
  return (
    <Svg width={24} height={28} {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M9.5 0C14.743 0 19 4.488 19 10.016c0 2.807-1.287 6.24-2.91 9.318-2.274 4.31-5.114 7.933-5.114 7.933A1.878 1.878 0 0 1 9.5 28c-.57 0-1.11-.269-1.476-.733 0 0-2.84-3.622-5.113-7.933C1.289 16.255 0 12.823 0 10.016 0 4.488 4.257 0 9.5 0Zm0 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
      />
    </Svg>
  );
}

export default MapPinXsIcon;
