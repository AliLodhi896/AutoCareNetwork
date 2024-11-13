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
  Text,
} from "../../../../shared/components";
import { color } from "../../../../shared/theme";
import { NavigatorParamList } from "../../navigators";
import { object, ref, string } from "yup";
import { translate } from "../../i18n";
import { styles } from "./password-change-screen.styles";
import WashubClient from "../../services/api/api";
import { ScrollView } from "react-native-gesture-handler";
import { UserLogin } from "../../../../shared/services/api";
import useModal from "../../../../shared/contexts/modal/useModal";
import { AuthStateProps } from "../../../../shared/services/storage";
import { useAppState } from "../../context/app-state-context";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { WFormRef } from "../../../../shared/components/w-form";
import { screenDimensions } from '../../../../shared/theme/spacing';

const validations = object().shape({
  password: string().required(
    translate("passwordChangeScreen.validations.password.required")
  ),
  confirmPassword: string()
    .required(translate("passwordChangeScreen.validations.confirmPassword.required"))
    .when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref("password")],
        translate("passwordChangeScreen.validations.confirmPassword.equal")
      ),
    }),
});

export const PasswordChangeScreen: FC<StackScreenProps<NavigatorParamList, "login">> = ({
  navigation,
}) => {
  const WFormRef = useRef<WFormRef>(null);
  const { initializeApp , appState, setAppState} = useAppState();
  const {stations} = appState
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

  useEffect(() => {

    if (stations) {
      if (stations.length === 0) {
        setAppState({selectedStation: null})
      } else if (stations.length === 1) {
        setAppState({selectedStation: stations[0]})
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
        navigation.navigate("home");
      }
    }
  };

  return (
    <View testID="PasswordChangeScreen" style={styles.flex1}>
      <Screen
        style={styles.container}
        preset="fixed"
        backgroundColor={color.palette.lightBlackBackground}
        unsafe
      >
        <ScrollView>
          <View style={{ ...styles.logoContainer, paddingTop: 40 }}>
            <Image
              source={require("../../../assets/images/app-logo-red.png")}
              style={styles.logo}
            />
            <Text style={styles.subTitleText}>{translate("passwordChangeScreen.passwordChangeNeeded")}</Text>
          </View>

          <View style={styles.flex1}>
            <View style={styles.formContainer}>
              <WForm
                style={styles.form}
                ref={WFormRef}
                onSubmit={(value) => {
                  loginUser({ email: value.email, password: value.password });
                }}
                validationSchema={validations}
                initialValue={{
                  password: "",
                  confirmPassword: "",
                }}
              >
                <WashubInput
                  placeholder={translate("passwordChangeScreen.password")}
                  fieldName="password"
                  secureTextEntry
                />
                <WashubInput
                  placeholder={translate("passwordChangeScreen.confirmPassword")}
                  fieldName="confirmPassword"
                  secureTextEntry
                />
              <View style={styles.centerButtons}>
              <Button
                  loading={loading}
                  disabled={loading}
                  testID="submit-button"
                  style={styles.loginBtn}
                  text={translate("common.submit")}
                  onPress={() => {
                    WFormRef.current.submit();
                  }}
                />
              </View>
            
              </WForm>
            </View>
          </View>
        </ScrollView>
      </Screen>
    </View>
  );
};
