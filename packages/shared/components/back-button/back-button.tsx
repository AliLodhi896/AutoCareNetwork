import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { color, spacings } from "../../theme";
import { Text } from "../text/text";
import { ButtonProps } from "./back-button.props";
import { styles } from "./back-button.styles";
import { VIcon } from "../v-icon/v-icon";


/**
 * For closing or going from page.
 */
export function BackButton(props: ButtonProps) {
  const {
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    type,
    size,
    color: baseColor,
    noPadding,
    onPress,
    ...rest
  } = props;

  const icon =
    type === "close" ? (
      <VIcon
        family="MaterialCommunityIcons"
        name={"close-thick"}
        size={size || spacings.icons.mediumOne}
        color={baseColor || color.palette.black}
      />
    ) : (
      <VIcon
        family="Ionicons"
        name={"chevron-back"}
        size={size || spacings.icons.small}
        color={baseColor || color.palette.black}
      />
    );

  return (
    <View style={{...styles.backBtnView,   paddingLeft: noPadding ? 0: spacings.small}}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.backBtn, styleOverride]}
        {...rest}
      >
        {icon}
        <Text
          text={text}
          style={[{...styles.text,  color: baseColor || color.palette.black}, textStyleOverride]}
        />
      </TouchableOpacity>
    </View>
  );
}
