import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Text } from "../../../../../shared/components";
import { NavigatorParamList } from "../../../navigators";
import { object, string } from "yup";
import { styles } from "./signup-screen.styles";
import WashubClient from "../../../services/api/api";
import { useAppState } from "../../../context/app-state-context";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import LayoutSecurity from "../../../components/washub/security/layout-security";
import { WForm, WFormRef } from "../../../../../shared/components/w-form";
import WashubInput from "../../../components/washub/w-input/w-input";
import { commonStyles } from "../../../components/washub/security/security-common.style";
import { AuthStateProps } from "../../../../../shared/services/storage";
import { getInitialValue } from "../../../../../shared/utils/common";

export interface ISingupProviderParams {
  requiredFields: [keyof IProviderRequiredFields];
  authToken: string;
}
export interface IProviderRequiredFields {
  MemberNumber: string;
  FirstName: string;
  LastName: string;
  ZipCode: string;
  Phone: string;
}

interface ISignupProvider {
  MemberNumber: string;
  FirstName?: string;
  LastName?: string;
  ZipCode?: string;
  Phone?: string;
}

interface IField {
  name: string;
  initialValue: any;
  type: any;
}
const fields: IField[] = [
  {
    name: "MemberNumber",
    initialValue: "",
    type: string().required("Registration Code is required"),
  },
  {
    name: "FirstName",
    initialValue: "",
    type: string().required(),
  },
  {
    name: "LastName",
    initialValue: "",
    type: string().required(),
  },
  {
    name: "ZipCode",
    initialValue: "",
    type: string().required(),
  },
  {
    name: "Phone",
    initialValue: "",
    type: string().test(
      "is-us-phone",
      "Please enter a valid US phone number",
      (value) => {
        if (value) {
          const isValid = isValidPhoneNumber(value, "US");
          return isValid;
        }
        return false;
      }
    ),
  },
];

export const SignUpProviderScreen: FC<
  StackScreenProps<NavigatorParamList, "signupProvider">
> = ({ navigation, route }) => {
  const WFormRef = useRef<WFormRef>(null);
  const authContext = useAuthState();
  const { setAuthState, initializeAuth, authState } = authContext;
  const [loading, setLoading] = useState(false);
  const { initializeApp } = useAppState();

  const { requiredFields, authToken } = route.params as ISingupProviderParams;

  const initialValues = Object.fromEntries(
    fields.map((field) => [field.name, field.initialValue])
  );

  const SchemaObject = Object.fromEntries(
    fields.map((field) => [field.name, field.type])
  );

  for (const item in SchemaObject) {
    if (!requiredFields.includes(item)) {
      delete SchemaObject[item];
      delete initialValues[item];
    }
  }
  const ProviderSchema = object().shape(SchemaObject);

  useEffect(() => {
    console.log(requiredFields);
    return () => {
      setLoading(false);
    };
  }, []);

  const setToken = async (AuthToken: string) => {
    const token = { token: AuthToken };
    setAuthState(token);
    WashubClient.setToken(AuthToken);

    const state: AuthStateProps = await initializeAuth();
    await initializeApp();
    setAuthState(state);

    navigation.navigate("account");
  };

  const signUpProvider = async (formData: ISignupProvider) => {
    setLoading(true);

    if (formData.MemberNumber) {
      const { error: errorCardCode, data } = await WashubClient.linkCard(
        formData.MemberNumber
      );
      if (errorCardCode && errorCardCode.message) {
        WFormRef.current?.setErrors({ MemberNumber: errorCardCode.message });
        return;
      }
      delete formData.MemberNumber;
    }

    const { error: errorProfile, response } = await WashubClient.updateProfile({
      ...formData,
    });
    if (!errorProfile) {
      setToken(authToken);
    }
    setLoading(false);
  };

  return (
    <LayoutSecurity>
      <View style={styles.container}>
        <View style={[commonStyles.box, styles.formBox]}>
          <WForm
            ref={WFormRef}
            onSubmit={(value) => {
              signUpProvider(value as ISignupProvider);
            }}
            validationSchema={ProviderSchema}
            initialValue={initialValues}
          >
            {requiredFields.includes("MemberNumber") && (
              <WashubInput
                placeholder="Registration Code"
                fieldName="MemberNumber"
              />
            )}
            {requiredFields.includes("ZipCode") && (
              <WashubInput
                fieldName="ZipCode"
                keyboardType={"numeric"}
                placeholder="Zip Code"
              />
            )}
            {requiredFields.includes("FirstName") && (
              <WashubInput placeholder="First Name" fieldName="FirstName" />
            )}
            {requiredFields.includes("LastName") && (
              <WashubInput placeholder="Last Name" fieldName="LastName" />
            )}
            {requiredFields.includes("Phone") && (
              <WashubInput
                fieldName="Phone"
                formatter={(value, val) => {
                  const phone = new AsYouType("US").input(value);
                  return phone;
                }}
                placeholder="Phone Number"
              />
            )}
          </WForm>
          <View style={styles.btnContainer}>
            <Button
              loading={loading}
              disabled={loading}
              preset="primary"
              style={styles.loginBtn}
              textStyle={styles.loginBtnText}
              loaderColor="#FFFFFF"
              text="LAUNCH APP"
              onPress={() => {
                WFormRef.current.submit();
              }}
            />
          </View>
        </View>
      </View>
    </LayoutSecurity>
  );
};
