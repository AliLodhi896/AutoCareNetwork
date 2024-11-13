import React, { FC, useRef, useState } from "react";
import { StyleSheet, View, ViewStyle, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import {
  Screen,
  AutoImage as Image,
  VIcon,
  Button,
  WForm,
  WashubInput
} from "../../../../shared/components";
import { goBack, navigate, NavigatorParamList } from "../../navigators";
import { object, ref, string } from "yup";
import { color,  spacings } from "../../../../shared/theme";
import { styles } from "./signup-screen.styles";
import { translate } from "../../i18n";
import useModal from "../../../../shared/contexts/modal/useModal";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import {
  DealerBundleUser,
  isDealerBundleApp,
  User,
} from "../../../../shared/services/api";
import WashubClient from "../../services/api/api";
import { HelpContent } from "../../components/contact-modal/contact-modal";
import { formatToPhone, getInitialValue } from "../../../../shared/utils/common";
import { useAppState } from "../../context/app-state-context";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { Text } from "../../../../shared/components/text/text";
import { WFormRef } from "../../../../shared/components/w-form";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { completeSignup } from "../../services/actions";
import { isValidPhoneNumber } from "libphonenumber-js";
import AvoidingView from "../../../../shared/components/avoiding-view/avoiding-view-screen";

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

const FULL: ViewStyle = { flex: 1 };

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
    phoneNumber: string().test(
      "is-us-phone",
      translate(
        "signupScreen.validations.phoneNumber.validUsPhoneNumber"
      ),
      (value) => {
        const isValid = isValidPhoneNumber(value, "US")
        return isValid
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
  const modal = useModal();
  const authContext = useAuthState();
  const appContext = useAppState();
  const { authState, setAuthState } = authContext;
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets()
  const requiredFields: string[] = authState.requiredFields ?? [];
  const hasRequiredFields = requiredFields.length > 0;
  const initialValue = getInitialValue(requiredFields, hasRequiredFields);
  const topInset = Platform.select({
    ios: 190 + insets.top,
    android: 240 + insets.top
  })
  const innerStyles = StyleSheet.create({
    container: { flex: 1, marginTop: topInset },
    header: {
      backgroundColor: color.palette.red,
      flexDirection: "column",
      height: topInset,
      paddingBottom: spacings.medium,
      position: "absolute",
      top: 0,
      paddingTop: insets.top,
      width: "100%",
    },
    back: {
      flexDirection: "row",
      paddingLeft: spacings.smaller,
      marginTop: Platform.select({
        android: 35,
        ios: 0,
      }),
    },
  })


  const showField = (name: string) => {
    return Object.keys(initialValue).includes(name);
  };

  const openHelp = () => {
    modal.showModal(<HelpContent />);
  };

  const setToken = (AuthToken: string) => {
    const token = { token: AuthToken };
    setAuthState(token);
    WashubClient.setToken(AuthToken);
    navigate("login");
  };

  const signUpUser = async (data: SignupUser) => {
    setLoading(true);
    if (isDealerBundleApp()) {
      const user: DealerBundleUser = {
        MemberNumber: data.registrationCode,
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        Phone: data.phoneNumber,
        ZipCode: data.zipCode,
        Password: data.password,
      };
      const { error, AuthToken } = await WashubClient.createDealerBundleUser(
        user
      );
      if (error) {
        WFormRef.current?.setErrors({ confirmPassword: error.message });
      } else if (AuthToken) {
        setToken(AuthToken);
      }
    } else {
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
        setToken(AuthToken);
      }
    }
    setLoading(false);
  };

  const updateInfo = async (data: SignupUser) => {
    setLoading(true);
    const info: any = isDealerBundleApp()
      ? {
          MemberNumber: data?.registrationCode,
          FirstName: data?.firstName,
          LastName: data?.lastName,
          Email: data?.email,
          Phone: data?.phoneNumber,
          ZipCode: data?.zipCode,
          Password: data?.password,
        }
      : {
          CardCode: data?.registrationCode,
          FirstName: data?.firstName,
          LastName: data?.lastName,
          Email: data?.email,
          Phone: data?.phoneNumber,
          ZipCode: data?.zipCode,
          Password: data?.password,
        };
    Object.keys(info).forEach((key) => {
      if (info[key] === undefined) {
        delete info[key];
      }
    });
    await completeSignup(appContext, authContext, info, data.registrationCode);
    goBack();
    setLoading(false);
  };

  return (
    <AvoidingView
    withoutBackgroundImage
    backgroundColor={color.palette.lightGreyBackground}
    header={    <View style={innerStyles.header}>

    <View style={innerStyles.back}>
      <BackButton
        type="back"
        text={translate("common.back")}
        onPress={goBack}
        textStyle={{ color: color.palette.white}}
        color={color.palette.white}
      />
    </View>
    <View>
      <View style={styles.logoView}>
        <Image
          source={require("../../../assets/images/app-logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.titleView}>
        <Text
          style={styles.title}
          text={translate("signupScreen.registerMembership")}
        />
      </View>
    </View>
  </View>}
   >
   <View style={innerStyles.container}>
          <WForm
            style={styles.form}
            ref={WFormRef}
            onSubmit={(value) => {
              hasRequiredFields
                ? updateInfo(value as SignupUser)
                : signUpUser(value as SignupUser)
            }}
            validationSchema={getValidations(initialValue)}
            initialValue={initialValue}
          >
            {showField("registrationCode") && (
              <WashubInput
                placeholder={translate("signupScreen.appRegistrationCode")}
                fieldName="registrationCode"
              />
            )}

            {showField("firstName") && (
              <WashubInput
                placeholder={translate("signupScreen.firstName")}
                autoCapitalize={"words"}
                fieldName="firstName"
              />
            )}

            {showField("lastName") && (
              <WashubInput
                placeholder={translate("signupScreen.lastName")}
                autoCapitalize={"words"}
                fieldName="lastName"
              />
            )}

            {showField("zipCode") && (
              <WashubInput
                fieldName="zipCode"
                keyboardType={"numeric"}
                placeholder={translate("signupScreen.zipCode")}
              />
            )}

            {showField("email") && (
              <WashubInput
                placeholder={translate("signupScreen.emailAdress")}
                fieldName="email"
                autoComplete="email"
                keyboardType={"email-address"}
              />
            )}

            {showField("phoneNumber") && (
              <WashubInput
                fieldName="phoneNumber"
                formatter={formatToPhone}
                keyboardType={"phone-pad"}
                placeholder={translate("signupScreen.phoneNumber")}
              />
            )}

            {showField("password") && (
              <WashubInput
                fieldName="password"
                placeholder={translate("signupScreen.password")}
                secureTextEntry
              />
            )}

            {showField("password") && (
              <WashubInput
                fieldName="confirmPassword"
                placeholder={translate("signupScreen.confirmPassword")}
                secureTextEntry
              />
            )}

            <Button
              loading={loading}
              disabled={loading}
              onPress={() => WFormRef.current?.submit()}
              style={styles.registerBtn}
            >
              <Text style={styles.registerBtnTxt}>
                {translate("signupScreen.register")}
              </Text>
            </Button>

            <View style={styles.help}>
              <View style={styles.helpInner}>
                <CircleButton
                  blur
                  text={translate("signupScreen.registrationHelp")}
                  style={styles.sideCircle}
                  textStyle={styles.sideText}
                  onPress={() => openHelp()}
                  icon={
                    <Image style={styles.helpIconStyle}  source={require('../../../assets/images/help-icon.png')} />
                  }
                />
              </View>
            </View>
          </WForm>
        </View>
   </AvoidingView>
   
  )
});