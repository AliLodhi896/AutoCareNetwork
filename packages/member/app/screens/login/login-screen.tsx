import React, { FC, useRef, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { color, screenDimensions } from "../../../../shared/theme";
import { NavigatorParamList } from "../../navigators";
import Communications from "react-native-communications";
import { object, string } from "yup";
import { translate } from "../../i18n";
import { styles } from "./login-screen.styles";
import { WForm, WFormRef } from "../../../../shared/components/w-form";
import WashubClient from "../../services/api/api";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import { UserLogin } from "../../../../shared/services/api";
import useModal from "../../../../shared/contexts/modal/useModal";
import { HelpContent } from "../../components/contact-modal/contact-modal";
import { AuthStateProps } from "../../../../shared/services/storage";
import { useAppState } from "../../context/app-state-context";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import GoogleAuthButton from "../../components/google-auth-button/GoogleAuthButton";
import { Button } from "../../../../shared/components/button/button";
import WashubInput from "../../../../shared/components/w-input/w-input";
import { AutoImage as Image } from "../../../../shared/components/auto-image/auto-image";
import { Screen } from "../../../../shared/components/screen/screen";
import { normalize } from "../../../../shared/utils/normalize";

const validations = object().shape({
  email: string()
    .email(translate("signupScreen.validations.emailAdress.email"))
    .required(translate("signupScreen.validations.emailAdress.required")),
  password: string().required(
    translate("signupScreen.validations.password.required")
  ),
});

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = ({
  navigation,
}) => {
  const WFormRef = useRef<WFormRef>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const gotoSignup = () => navigation.navigate("signup");
  const { setAuthState, initializeAuth, authState } = useAuthState();
  const { initializeApp } = useAppState();
  const modal = useModal();
  const circleIconSize = 0.13*screenDimensions.width

  const loginUser = async (data: UserLogin) => {
    setLoading(true);
    const { error, result } = await WashubClient.emailLogin(data);
    if (error) {
      WFormRef.current?.setErrors({ password: error.message });
      setLoading(false);
      console.log("Error logging in: ", error);
    } else if (result.AuthToken) {
      WashubClient.setToken(result.AuthToken);
      setAuthState({
        requiredFields: result.RequiredFields || [],
      });
      if (result?.RequiredFields && result?.RequiredFields.length > 0) {
        gotoSignup();
      } else {
        setAuthState({
          token: result.AuthToken,
        });
        if (!authState?.profile) {
          const state: AuthStateProps = await initializeAuth();
          await initializeApp();
          setAuthState(state);
        }
        setLoading(false);
        // navigation.navigate("tabs");
      }
    }
  };

  const doOauthLogin = async (
    provider: string,
    clientId: string | undefined,
    code: any
  ) => {
    setGoogleLoading(true);
    const { result, error } = await WashubClient.oauthLogin({
      provider,
      clientId,
      code,
    });
    console.warn("log", result);
    if (error) {
      setGoogleLoading(false);
      console.warn("Error logging in: ", error);
    } else if (result.AuthToken) {
      WashubClient.setToken(result.AuthToken);
      setAuthState({
        requiredFields: result.RequiredFields || [],
      });
      if (result?.RequiredFields && result?.RequiredFields.length > 0) {
        gotoSignup();
      } else {
        setAuthState({
          token: result.AuthToken,
        });
        if (!authState?.profile) {
          const state: AuthStateProps = await initializeAuth();
          await initializeApp();
          setAuthState(state);
        }
        setGoogleLoading(false);
        navigation.navigate("tabs");
      }
    }
  };

  const openHelp = () => {
    modal.showModal(<HelpContent />);
  };

  const openContact = () => {
    modal.showModal(<HelpContent contactWashub />);
  };

  return (
    <View testID="LoginScreen" style={styles.flex1}>
      <Screen
        style={styles.container}
        preset="fixed"
        backgroundColor={color.palette.lightGreyBackground}
        unsafe
      >

          <View style={{ ...styles.logoContainer, paddingTop: normalize(40) }}>
            <Image
              source={require("../../../assets/images/app-logo.png")}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>

          <View style={styles.flex1}>
            <View style={styles.formContainer}>
              <WForm
                style={styles.form}
                ref={WFormRef}
                onSubmit={(value) => {
                  loginUser({ email: value.email, password: value.password })
                }}
                validationSchema={validations}
                initialValue={{
                  email: "",
                  password: "",
                }}
              >
                  <View style={styles.innerForm}>
                <WashubInput
                  placeholder={translate("loginScreen.emailAddress")}
                  keyboardType={"email-address"}
                  autoComplete={"email"}
                  fieldName="email"
                />
                <WashubInput
                  placeholder={translate("loginScreen.password")}
                  fieldName="password"
                  secureTextEntry
                />
                <Button
                  loading={loading}
                  disabled={loading}
                  preset="primary"
                  testID="login-button"
                  style={styles.loginBtn}
                  textStyle={styles.loginBtnText}
                  text={translate("loginScreen.login")}
                  onPress={() => {
                    WFormRef.current.submit()
                  }}
                />
                <GoogleAuthButton
                  disabled={loading}
                  loading={googleLoading}
                  onLogin={(code) => doOauthLogin("Google", undefined, code)}
                  text={translate("loginScreen.googleLogintext")}
                />

                <Button
                  preset="primary"
                  testID="login-button"
                  style={styles.registerBtn}
                  textStyle={styles.registerBtnTxt}
                  text={translate("loginScreen.registerMyMembership")}
                  onPress={() => gotoSignup()}
                />

                <View style={styles.footerContainer}>
                  <View>
                    <CircleButton
                      blur
                      onPress={() => openHelp()}
        
                      textStyle={styles.footerBtnTxt}
                      style={styles.styleCircle}
                      text={translate("signupScreen.registrationHelp")}
                      icon={
                        <Image
                          source={require("../../../assets/images/help-icon.png")}
                          style={styles.infoImage}
                        />
                      }
                    />
               
                  </View>
                  <View>
                    <CircleButton
                      blur
                      onPress={() =>
                        Communications.web(WashubClient.forgotPassword())
                      }
                      textStyle={styles.footerBtnTxt}
                      style={styles.styleCircle}
                      text={translate("loginScreen.resetPassword")}
                      icon={
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/reset-password.png")}
                          style={styles.infoImage}
                        />
                      }
                    />
               
                  </View>
                  <View>
                    <CircleButton
                      blur
                      onPress={() => openContact()}
                      textStyle={styles.footerBtnTxt}
                      style={styles.styleCircle}
                      text={translate("loginScreen.contactWashub")}
                      icon={
                        <Image
                          source={require("../../../assets/images/contact-icon.png")}
                          style={styles.infoImage}
                          resizeMode="contain"
                        />
                      }
                    />
                  </View>
                </View>
                </View>
              </WForm>
            </View>
          </View>
      </Screen>
    </View>
  )
};
