import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

/* SVGR has dropped some elements not supported by react-native-svg: title */
function IconWSText({ fill = "#FFFFFF", ...props }: SvgProps) {
  return (

    <Svg width={40} height={39.731} {...props}>
      <Path
        fill={fill}
        fillRule="evenodd"
        d="m3.221.005.102.005h-.008C3.2.005 1.559-.02.632 1.175c-.378.488-.684 1.19-.625 2.231v25.84-.017c-.017.408.026 1.288.583 2.006.446.574 1.22 1.165 2.708 1.101h13.128l7.202 6.947a1.592 1.592 0 0 0 2.614-.63l2.198-6.372 8.55-.017c.076 0 .148-.008.225-.017 0 0 1.483-.217 2.283-1.47.318-.502.552-1.166.493-2.071l.004-25.716c0-.06-.004-.12-.009-.174 0 0-.395-2.96-3.158-2.81h.004-33.61Zm-.034 3.189h33.62l-.005 25.576c0 .042 0 .085.005.127a.213.213 0 0 1-.064.179l-9.442.017a1.599 1.599 0 0 0-1.505 1.075l-1.756 5.085-5.863-5.659a1.6 1.6 0 0 0-1.105-.446H3.196V3.35l-.009-.157Zm18.902 17.18H7.99v2.958H22.09v-2.959Zm9.386-5.71H7.991v2.963h23.484v-2.963Zm0-5.85H7.991v2.963h23.484V8.814Z" />
    </Svg>
  );
}

export default IconWSText;
