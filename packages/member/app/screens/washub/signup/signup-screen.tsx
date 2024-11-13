import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { View, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Button, Text } from "../../../../../shared/components";
import { NavigatorParamList } from "../../../navigators";
import { object, ref, string } from "yup";
import { styles } from "./signup-screen.styles";
import { translate } from "../../../i18n";
import { User } from "../../../../../shared/services/api";
import WashubClient from "../../../services/api/api";
import { getInitialValue } from "../../../../../shared/utils/common";
import { useAppState } from "../../../context/app-state-context";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import LayoutSecurity from "../../../components/washub/security/layout-security";
import { WForm, WFormRef } from "../../../../../shared/components/w-form";
import WashubInput from "../../../components/washub/w-input/w-input";
import { commonStyles } from "../../../components/washub/security/security-common.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import storage, { AuthStateProps } from "../../../../../shared/services/storage";
import { AvoidSoftInputView } from "react-native-avoid-softinput";
import analytics from "@react-native-firebase/analytics";

interface SignupUser {
  registrationCode: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const validations = object().shape({
  registrationCode: string().required(
    translate("signupScreen.validations.registrationCode.required")
  ),
  firstName: string().required(
    translate("signupScreen.validations.firstName.required")
  ),
  lastName: string().required(
    translate("signupScreen.validations.lastName.required")
  ),
  zipCode: string().required(
    translate("signupScreen.validations.zipCode.required")
  ),
  email: string()
    .required(translate("signupScreen.validations.emailAdress.required"))
    .email(translate("signupScreen.validations.emailAdress.email")),
  phoneNumber: string()
    .test(
      "is-us-phone",
      translate("signupScreen.validations.phoneNumber.validUsPhoneNumber"),
      (value) => {
        const isValid = isValidPhoneNumber(value, "US");
        return isValid;
      }
    )
    .required(translate("signupScreen.validations.phoneNumber.required")),
  password: string().required(
    translate("signupScreen.validations.password.required")
  ),
  confirmPassword: string()
    .required(translate("signupScreen.validations.confirmPassword.required"))
    .when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref("password")],
        translate("signupScreen.validations.confirmPassword.equal")
      ),
    }),
});

const getValidations = (initialValue: SignupUser | {}) => {
  const newValidations = object().shape({});
  Object.keys(initialValue).map((item) => {
    newValidations[item] = validations[item];
  });
  return newValidations;
};

export const SignUpScreen: FC<
  StackScreenProps<NavigatorParamList, "signup">
> = observer(() => {
  const WFormRef = useRef<WFormRef>(null);
  const navigation = useNavigation();
  const authContext = useAuthState();
  const appContext = useAppState();
  const { authState, setAuthState, initializeAuth } = authContext;
  const [loading, setLoading] = useState(false);
  const { initializeApp } = useAppState();
  const insets = useSafeAreaInsets();
  const requiredFields: string[] = authState.requiredFields ?? [];
  const hasRequiredFields = requiredFields.length > 0;
  const initialValue = getInitialValue(requiredFields, hasRequiredFields);
  const topInset = Platform.select({
    ios: 190 + insets.top,
    android: 240 + insets.top,
  });
  const [errMsg, setErrMsg] = useState<string>("");

  const setToken = async (AuthToken: string) => {
    const token = { token: AuthToken };
    setAuthState(token);
    WashubClient.setToken(AuthToken);

    const state: AuthStateProps = await initializeAuth();
    await initializeApp();
    setAuthState(state);

    navigation.navigate("login");
  };

  const signUpUser = async (data: SignupUser) => {
    setLoading(true);

    const user: User = {
      CardCode: data.registrationCode,
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phoneNumber,
      ZipCode: data.zipCode,
      Password: data.password,
    };

    const { error, AuthToken } = await WashubClient.createUser(user);

    if (!error) {
      await analytics().logEvent('sign_up', {
        sign_up: 'Succesfully Registered',
      });
      setToken(AuthToken);
    } else {
      await analytics().logEvent('sign_up', {
        sign_up: 'Failed to Registered',
      });
      setErrMsg(error.message);
    }

    setLoading(false);
  };


  useEffect(() => {
    const scrreenView = async () => {
      await analytics().logEvent('screen_view', {
        screen_name: 'Register With Provider',
      });
      console.log('Screen view logged');
    };

    scrreenView();
  }, []);


  return (
    <LayoutSecurity>
      <AvoidSoftInputView
        avoidOffset={100}
        easing="linear"
        enabled={true}
        hideAnimationDelay={100}
        hideAnimationDuration={100}
        // onSoftInputShown={() => {
        //   console.log("Soft Input shown");
        // }}
        // onSoftInputHidden={() => {
        //   console.log("Soft Input hidden");
        // }}
        // onSoftInputHeightChange={() => {
        //   console.log("Soft Input height changed");
        // }}
        showAnimationDelay={100}
        showAnimationDuration={100}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={[commonStyles.box, styles.formBox]}>
            <WForm
              ref={WFormRef}
              onSubmit={(value) => {
                signUpUser(value as SignupUser);
              }}
              validationSchema={validations}
              initialValue={initialValue}
            >
              <WashubInput
                placeholder="Registration Code"
                fieldName="registrationCode"
              />

              <WashubInput
                fieldName="zipCode"
                keyboardType={"numeric"}
                placeholder="Zip Code"
              />

              <WashubInput placeholder="First Name" fieldName="firstName" />

              <WashubInput placeholder="Last Name" fieldName="lastName" />

              <WashubInput
                fieldName="phoneNumber"
                formatter={(value, val) => {
                  const phone = new AsYouType("US").input(value);
                  return phone;
                }}
                // keyboardType={"phone-pad"}
                placeholder="Phone Number"
              />
              <WashubInput
                placeholder="Email Address"
                fieldName="email"
                autoComplete="email"
                keyboardType={"email-address"}
              />
              <WashubInput
                fieldName="password"
                placeholder="Password"
                secureTextEntry
              />
              <WashubInput
                fieldName="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />
            </WForm>
            <View style={styles.btnContainer}>
              {errMsg !== "" && <Text style={styles.errorText} text={errMsg} />}
              <Button
                loading={loading}
                disabled={loading}
                preset="primary"
                testID="login-button"
                style={styles.loginBtn}
                textStyle={styles.loginBtnText}
                loaderColor="#FFFFFF"
                text="REGISTER"
                onPress={() => {
                  WFormRef.current.submit();
                }}
              />
            </View>
          </View>
        </View>
      </AvoidSoftInputView>
    </LayoutSecurity>
  );
});
