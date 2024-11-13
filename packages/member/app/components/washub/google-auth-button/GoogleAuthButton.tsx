"use strict";
import React from "react";
import { Image, TouchableOpacityProps } from "react-native";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { color } from "../../../../../shared/theme";
import { Button } from "../../../../../shared/components/button/button";
import { Text } from "../../../../../shared/components/text/text";
import { styles } from "./google-auth-button.style";

const googleLogo = require("../../../../../assets/images/google-logo.png");

interface Props extends TouchableOpacityProps {
  onLogin: (code: string) => void;
  loading?: boolean;
  text: string;
}

GoogleSignin.configure({
  scopes: ["openid profile email"], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "881162078508-8kvfd4tht0hoh0ilgt0dfdmjq8tpub62.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const GoogleAuthButton = (props: Props) => {
  const { onLogin, loading, text, ...rest } = props;
  const googlePressed = async () => {
    try {
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.serverAuthCode) {
        console.error("no auth code");
        return;
      }
      onLogin(userInfo.serverAuthCode);
    } catch (error: any) {
      console.warn("had error", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Button
      loading={loading}
      loaderColor={color.palette.black}
      onPress={() => googlePressed()}
      style={styles.alternativeBtn}
      {...rest}
    >
      <Text
        text={text}
        fontFamily="secondary"
        style={styles.alternativeBtnTxt}
      />
      <Image source={googleLogo} style={styles.googleIcon} />
    </Button>
  );
};

export default GoogleAuthButton;
