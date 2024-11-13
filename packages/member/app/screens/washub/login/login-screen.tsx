import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { object, string } from "yup";
import { translate } from "../../../i18n";
import { styles } from "./login-screen.styles";
import { WForm, WFormRef } from "../../../../../shared/components/w-form";
import WashubClient from "../../../services/api/api";
import { UserLogin } from "../../../../../shared/services/api";
import { AuthStateProps } from "../../../../../shared/services/storage";
import { useAppState } from "../../../context/app-state-context";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { Button } from "../../../../../shared/components/button/button";
import { Text } from "../../../../../shared/components";
import Communications from "react-native-communications";
import LayoutSecurity from "../../../components/washub/security/layout-security";
import WashubInput from "../../../components/washub/w-input/w-input";
import GoogleAuthButton from "../../../components/washub/google-auth-button/GoogleAuthButton";
import AppleSignin, {
  IAppleAuth,
} from "../../../components/washub/apple-signin/apple-signin";
import appleAuth from "@invertase/react-native-apple-authentication";
import analytics from "@react-native-firebase/analytics";
import { normalize } from "../../../../../shared/utils/normalize";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import IconKey from "../../../components/svg/icon-key";
import IconWSText from "../../../components/svg/icon-ws-text";
import { isAndroidFontLargest } from "../../../utils/common";

const validations = object().shape({
  email: string()
    .email(translate("signupScreen.validations.emailAdress.email") ?? "")
    .required(translate("signupScreen.validations.emailAdress.required") ?? ""),
  password: string().required(
    translate("signupScreen.validations.password.required") ?? ""
  ),
});

const Logo = require("../../../../assets/images/logo-transparent.png");
const BackgroundDrops = require("../../../../assets/images/washub-app-background.png");

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = ({
  navigation,
}) => {
  const WFormRef = useRef<WFormRef>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const gotoSignup = () => navigation.navigate("signup");
  const { setAuthState, initializeAuth, authState } = useAuthState();
  const { initializeApp } = useAppState();

  useEffect(() => {
    return () => {
      setLoading(false);
      setGoogleLoading(false);
      setAppleLoading(false);
    };
  }, []);

  useEffect(() => {
    const scrreenView = async () => {
      await analytics().logEvent("screen_view", {
        screen_name: "Login",
      });
      console.log('Screen view logged login');
    };

    scrreenView();
  }, []);


  const loginUser = async (data: UserLogin) => {
    setLoading(true);
    const { error, result } = await WashubClient.emailLogin(data);

    if (error) {
      WFormRef.current?.setErrors({ password: error.message });
      setLoading(false);
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
          console.log("state", state?.profile?.UserId);
          await analytics().logLogin({
            method: "email&password",
          });
          await analytics().setUserId(JSON.stringify(state?.profile?.UserId));
        }
        setLoading(false);
        // navigation.navigate("account");
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
        navigation.navigate("account");
      }
    }
  };

  const doAppleLogin = async (appleAuth: IAppleAuth) => {
    setAppleLoading(true);
    const { result, error } = await WashubClient.oauthLogin({
      provider: "Apple",
      clientId: "com.washub.member",
      code: appleAuth.authorizationCode,
      FirstName: appleAuth.firstName,
      LastName: appleAuth.lastName,
    });
    if (error) {
    } else if (result && result.AuthToken) {
      WashubClient.setToken(result.AuthToken);

      if (result.RequiredFields && result.RequiredFields.length > 0) {
        navigation.navigate("signupProvider", {
          requiredFields: result.RequiredFields,
          authToken: result.AuthToken,
        });
      } else {
        const token = { token: result.AuthToken };
        setAuthState(token);
        WashubClient.setToken(result.AuthToken);

        const state: AuthStateProps = await initializeAuth();
        await initializeApp();
        setAuthState(state);

        navigation.navigate("account");
      }
    }
  };

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: "#1B588A",
        },
      ]}
      contentContainerStyle={{ position: "relative", paddingHorizontal: 20 }}
    >
      <ImageBackground
        source={BackgroundDrops}
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // zIndex: 1,
        }}
        imageStyle={{ opacity: 0.3 }}
      />
      <View style={{ minHeight: Dimensions.get("window").height }}>
        <View style={{ flex: 1 }} />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <Image source={Logo} />
        </View>
        <Button
          preset="primary"
          testID="register-button"
          style={{
            ...styles.loginBtn,
            width: normalize(260),
            alignSelf: "center",
            marginBottom: normalize(35),
          }}
          textStyle={styles.loginBtnText}
          text="REGISTER A NEW ACCOUNT"
          onPress={() => gotoSignup()}
        />
        <View style={styles.form}>
          <WForm
            style={styles.form}
            ref={WFormRef}
            onSubmit={(value) => {
              loginUser({ email: value.email, password: value.password });
            }}
            validationSchema={validations}
            initialValue={{
              email: "",
              password: "",
            }}
          >
            <View>
              <WashubInput
                placeholder="Email address"
                keyboardType={"email-address"}
                autoComplete={"email"}
                fieldName="email"
              />
              <WashubInput
                placeholder="Password"
                fieldName="password"
                secureTextEntry
              />
            </View>
          </WForm>
        </View>
        <View style={styles.btnContainer}>
          <Button
            loading={loading}
            disabled={loading}
            preset="primary"
            testID="login-button"
            style={styles.loginBtn}
            textStyle={styles.loginBtnText}
            text="LOGIN"
            onPress={() => {
              WFormRef.current?.submit();
            }}
          />
          <Text text="OR" style={styles.orText} />
          <GoogleAuthButton
            disabled={loading}
            loading={googleLoading}
            onLogin={(code) => doOauthLogin("Google", undefined, code)}
            text="LOGIN WITH GOOGLE"
          />
          {/* {appleAuth.isSupported && (
            <AppleSignin
              disabled={loading}
              loading={appleLoading}
              onLogin={async (appleAuth: IAppleAuth | null) => {
                doAppleLogin(appleAuth!);
              }}
            />
          )} */}
        </View>
        <View style={{ flex: 1 }} />
        <FooterContainer>
          <ResetPasswordButton />
          <ContactUsButton />
        </FooterContainer>
      </View>
    </ScrollView>
  );
};

function FooterContainer({ children }: { children?: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

function ResetPasswordButton() {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: normalize(isAndroidFontLargest() ? 5 : 15),
        width: normalize(isAndroidFontLargest() ? 110 : 90),
      }}
      onPress={() => {
        Communications.web(WashubClient.forgotPassword());
      }}
    >
      <View style={{ marginBottom: 15 }}>
        <IconKey />
      </View>
      <Text
        text="Reset Password"
        style={{
          color: "#fff",
          fontSize: normalize(16),
          lineHeight: normalize(18),
          textAlign: "center",
        }}
      />
    </TouchableOpacity>
  );
}

function ContactUsButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: normalize(isAndroidFontLargest() ? 5 : 15),
        width: normalize(isAndroidFontLargest() ? 110 : 90),
      }}
      onPress={() => {
        navigation.navigate("contact");
      }}
    >
      <View style={{ marginBottom: 15 }}>
        <IconWSText />
      </View>
      <Text
        text="Contact us"
        style={{
          color: "#fff",
          fontSize: normalize(16),
          lineHeight: normalize(18),
          textAlign: "center",
        }}
      />
    </TouchableOpacity>
  );
}
