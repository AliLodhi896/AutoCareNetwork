import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DropIcon(props) {
  return (
    <Svg
      // viewBox="0 0 50 44"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      // strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M27.22 14.683C22.32 6.853 20.36 0 20.36 0h-.014s-1.96 6.853-6.86 14.683C8.587 22.513.944 33.475.944 44.438.944 55.4 7.994 67 20.511 67c12.69 0 19.25-11.599 19.25-22.562 0-10.963-7.642-21.925-12.54-29.755"
        fill="#fff"
      />
    </Svg>
  );
}

export default DropIcon;
