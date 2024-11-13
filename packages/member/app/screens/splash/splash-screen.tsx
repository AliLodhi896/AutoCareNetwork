import React, { FC, useEffect } from "react";
import { View, ViewStyle, ImageStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Screen, AutoImage as Image } from "../../../../shared/components";
import { color, spacing } from "../../../../shared/theme";
import { NavigatorParamList } from "../../navigators";

const logo = require("./../../../../assets/images/logo.png");

const FULL: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  alignItems: "center",
  justifyContent: "center",
};

const LOGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
};

const ANIMATION_DURATION: number = 3000;

export const SplashScreen: FC<
  StackScreenProps<NavigatorParamList, "splash">
> = observer(({ navigation }) => {
  const nextScreen = () => navigation.navigate("vehicleInfo");

  useEffect(() => {
    let timer = setTimeout(() => {
      nextScreen();
    }, ANIMATION_DURATION); // Assuming the animation lasts for 3 seconds,
    return () => clearTimeout(timer);
  }, []);

  return (
    <View testID="SplashScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.primary}>
        <Image source={logo} style={LOGO} />
      </Screen>
    </View>
  );
});
