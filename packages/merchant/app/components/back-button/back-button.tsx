import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { translate } from "../../i18n";
import { goBack } from "../../navigators";
import { color, spacings } from "../../../../shared/theme";
import { Text } from "../../../../shared/components/text/text";
import { ButtonProps } from "./back-button.props";
import { styles } from "./back-button.styles";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";


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
    onPress,
    ...rest
  } = props;

  const icon =
    type === "close" ? (
      <VIcon
        family="AntDesign"
        name={"close"}
        size={size || spacings.icons.small}
        color={baseColor || color.palette.white}
      />
    ) : (
      <VIcon
        family="Ionicons"
        name={"chevron-back"}
        size={size || spacings.icons.small}
        color={baseColor || color.palette.white}
      />
    );

  return (
    <View style={styles.backBtnView}>
      <TouchableOpacity
        onPress={onPress || goBack}
        style={[styles.backBtn, styleOverride]}
        {...rest}
      >
        {icon}
        <Text
          text={text || type === "back" ? translate("common.back") : translate("common.close")}
          style={[styles.text, textStyleOverride]}
        />
      </TouchableOpacity>
    </View>
  );
}
