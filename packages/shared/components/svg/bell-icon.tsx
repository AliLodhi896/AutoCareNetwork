import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BellIcon(props) {
  return (
    <Svg
      viewBox="0 0 20 40"
      xmlns="http://www.w3.org/2000/svg"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M21.46 34.635C21.443 37.6 19.046 40 16.09 40c-2.963 0-5.372-2.42-5.372-5.4h10.743v.035ZM12.835 3.651C12.938 1.617 14.488 0 16.378 0c1.92 0 3.485 1.663 3.548 3.737 2.848.84 6.447 2.844 7.994 7.613 0 0 1.387 3.17 1.132 9.228 0 0 .322 4.995 2.452 8.438 0 0 2.656 2.973-.902 4.03l-14.15.054v.002l-.222-.001-.225.001V33.1l-14.15-.054c-3.559-1.057-.903-4.03-.903-4.03 2.131-3.443 2.457-8.438 2.457-8.438-.26-6.058 1.128-9.228 1.128-9.228 1.602-4.94 5.405-6.913 8.297-7.699Z"
        fill="#00BCFF"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default BellIcon;
