import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function MapPinIcon(props: SvgProps) {
  props.color ??= "#00BCFF";

  return (
    <Svg
      width={34.524}
      height={50}
      {...props}
    >
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M17.262 0c9.527 0 17.262 8.015 17.262 17.887 0 5.011-2.338 11.14-5.29 16.639-4.13 7.697-9.29 14.165-9.29 14.165A3.434 3.434 0 0 1 17.263 50a3.44 3.44 0 0 1-2.683-1.309s-5.16-6.468-9.29-14.165C2.342 29.027 0 22.898 0 17.886 0 8.016 7.735 0 17.262 0Zm0 9.804c-4.237 0-7.672 3.511-7.672 7.843s3.435 7.843 7.672 7.843 7.672-3.511 7.672-7.843-3.435-7.843-7.672-7.843Z"
      />
    </Svg>
  );
}

export default MapPinIcon;
