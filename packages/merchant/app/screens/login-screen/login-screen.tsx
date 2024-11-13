import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  Screen,
  AutoImage as Image,
  WashubInput,
  VIcon,
  WForm,
} from "../../../../shared/components";
import { color } from "../../../../shared/theme";
import { NavigatorParamList } from "../../navigators";
import Communications from "react-native-communications";
import { object, string } from "yup";
import { translate } from "../../i18n";
import { styles } from "./login-screen.styles";
import WashubClient from "../../services/api/api";
import { ScrollView } from "react-native-gesture-handler";
import { UserLogin } from "../../../../shared/services/api";
import useModal from "../../../../shared/contexts/modal/useModal";
import { HelpContent } from "../../components/contact-modal/contact-modal";
import { AuthStateProps } from "../../../../shared/services/storage";
import { useAppState } from "../../context/app-state-context";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { WFormRef } from "../../../../shared/components/w-form";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import { screenDimensions } from '../../../../shared/theme/spacing';

const validations = object().shape({
  email: string()
    .email(translate("loginScreen.validations.emailAddress.email"))
    .required(translate("loginScreen.validations.emailAddress.required")),
  password: string().required(
    translate("loginScreen.validations.password.required")
  ),
});

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = ({
  navigation,
}) => {
  const WFormRef = useRef<WFormRef>(null);
  const { initializeApp, appState, setAppState } = useAppState();
  const { stations } = appState
  const modal = useModal();
  const circleIconSize = 0.13*screenDimensions.width
  const [loading, setLoading] = useState(false);
  const gotoSignup = () => navigation.navigate("signup");
  const { setAuthState, initializeAuth, authState } = useAuthState();
  const [allowSelfOnboarding, setAllowSelfOnboarding] = useState(false);



  useEffect(() => {
    WashubClient.allowSelfOnboarding().then(res => {
      if (res?.result?.AllowSelfOnboarding) {
        setAllowSelfOnboarding(true);
      }
    });
  }, []);

  const gotoPasswordChangeRequired = () => {
    navigation.navigate("passwordChangeScreen");
  }
  useEffect(() => {

    if (stations) {
      if (stations.length === 0) {
        setAppState({ selectedStation: null })
      } else if (stations.length === 1) {
        setAppState({ selectedStation: stations[0] })
      } else if (stations.length > 1) {
        navigation.navigate('loginSelectStation');
      }
    }
  }, [stations, navigation]);

  const loginUser = async (data: UserLogin) => {
    setLoading(true);
    const { error, result } = await WashubClient.emailLogin(data);
    if (error) {
      WFormRef.current?.setErrors({ password: error.message });
      setLoading(false);
    } else if (result.AuthToken) {

       

        if (!authState?.profile) {
          const state: AuthStateProps = await initializeAuth();
          await initializeApp();
          setAuthState(state);
        }

        setLoading(false);

        if (result?.PasswordChangeRequired) {
          gotoPasswordChangeRequired();
        }else{
          setAuthState({
            token: result.AuthToken,
          });
      WashubClient.setToken(result.AuthToken);
          navigation.navigate("home");

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
        backgroundColor={color.palette.lightBlackBackground}
        unsafe
      >
     
          <View style={{ ...styles.logoContainer, paddingTop: 40 }}>
            <Image
              source={require("../../../../assets/images/logo.png")}
              style={styles.logo}
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
                noAnimation
              >
               <View style={styles.innerForm}>
              
               <View>
               <WashubInput
                  placeholder={translate("loginScreen.emailAddress")}
                  keyboardType="email-address"
                  autoComplete="email"
                  fieldName="email"
                />
                <WashubInput
                  placeholder={translate("loginScreen.password")}
                  fieldName="password"
                  secureTextEntry
                />
               </View>

                <View style={styles.centerButtons}>
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

                  {allowSelfOnboarding && (
                    <Button
                      preset="primary"
                      testID="login-button"
                      style={styles.registerBtn}
                      textStyle={styles.registerBtnTxt}
                      text={translate("loginScreen.registerMyMembership")}
                      onPress={() => gotoSignup()}
                    />
                  )}
                </View>

                <View style={styles.footerContainer}>
                  <CircleButton
                    style={styles.styleCircle}
                    text={translate("signupScreen.registrationHelp")}
                    onPress={() => openHelp()}
                    textStyle={styles.footerBtnTxt}
                    icon={
                      <Image
                      source={require("../../../assets/images/help-icon.png")}
                      style={styles.infoImage}
                    />
                    }
                  />
                  <CircleButton
                    style={styles.styleCircle}
                    text={translate("loginScreen.resetPassword")}
                    onPress={() =>
                      Communications.web(WashubClient.forgotPassword())
                    }
                    textStyle={styles.footerBtnTxt}
                    icon={
                      <Image
                      resizeMode="contain"
                      source={require("../../../assets/images/reset-password.png")}
                      style={styles.infoImage}
                    />
                    }
                  />
                  <CircleButton
                    style={styles.styleCircle}
                    text={translate("loginScreen.contactWashub")}
                    onPress={() => openContact()}
                    textStyle={styles.footerBtnTxt}
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
              </WForm>
            </View>
          </View>
  
      </Screen>
    </View>
  )
};
