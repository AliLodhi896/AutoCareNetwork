import React, { FC } from "react";
import { View, ViewStyle, Platform } from "react-native";
import {
  GradientBackground,
  Screen,
  Text,
  VIcon,
} from "../../../shared/components";
import { styles, cardStyles } from "./page-with-card.style";
import { color, fontsize, spacings } from "../../theme";
import CustomHeader from "../../../shared/components/custom-header/custom-header";
import { centerContent } from "../../../shared/components/screen/screen.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "../../../shared/components/v-icon/icons";


interface PageWithCardProps {
  nav: {
    title?: string
    iconFamily: keyof typeof Icons;
    iconName: string
  }
  icon: React.ReactNode;
  BackButton: any
  containerStyle?: ViewStyle
  testID: string
  appType?: 'member' | 'merchant'
  cardStyle?: ViewStyle
}

export const PageWithCard: FC<PageWithCardProps> = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <View testID={props.testID} style={styles.safeArea}>
      <Screen
        style={[
          {...styles.container,  paddingHorizontal: spacings.smaller},
          props.containerStyle,
          centerContent({ insets: { top: insets.top, bottom: insets.bottom } })
        ]}
        backgroundColor={
          props.appType == "merchant"
            ? color.palette.lighterBlackBackground
            : color.palette.lightGreyBackground
        }
        statusBar="light-content"
        unsafe
      >
      
        <GradientBackground merchant={props.appType == 'merchant'}  />
    
        <CustomHeader
          leftContent={props.BackButton}
          styles={{
            backgroundColor: props.appType == "merchant" ? color.transparent : color.palette.lightGreyBackground,
            }}
          centerContent={
            <View style={{ 
              marginLeft: 30
             }}>
              {props.icon|| <VIcon
                family={props.nav.iconFamily}
                name={props.nav.iconName}
                size={fontsize.large}
                color={props.appType == "merchant" ? color.palette.white : color.palette.red}
              />}
            </View>
          }
        />

        <View style={[cardStyles.card, props.cardStyle]}>
          {props.nav.title &&
            (<Text preset="header" style={styles.title}>
              {props.nav.title}<Text style={{ 
                  color: color.primary,
                  fontSize: spacings.huge,
                  lineHeight: Platform.select({default: 20, android: undefined})
               }}>.</Text>
            </Text>)
          }
          {props.children}
        </View>
      </Screen>
    </View>
  );
};
