import React, { FC, useState, useRef } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  WForm,
  LineInput,
  AutoImage,
} from "../../../../shared/components";
import { styles } from "./edit-profile-screen.style";
import { translate } from "../../i18n";
import { object, string } from "yup";
import { Profile } from "../../services/api";
import WashubClient from "../../services/api/api";
import { SettingsNavigatorParamList } from "../settings/settings-stack";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { Text } from "../../../../shared/components/text/text";
import { WFormRef } from "../../../../shared/components/w-form";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../../shared/utils/normalize";
import AvoidingView from "../../../../shared/components/avoiding-view/avoiding-view-screen";
import { formatToPhone } from "../../../../shared/utils/common";
import { isValidPhoneNumber } from "libphonenumber-js";

const validations = object().shape({
  firstName: string().required(
    translate("signupScreen.validations.firstName.required")
  ),
  lastName: string().required(
    translate("signupScreen.validations.lastName.required")
  ),
  emailAddress: string()
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
});

//TODO: remove this screen
export const EditProfileScreen: FC<
  StackScreenProps<SettingsNavigatorParamList, "editProfile">
> = () => {
  const WFormRef = useRef<WFormRef>(null);
  const { authState, setAuthState } = useAuthState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { profile } = authState;
  const editProfile = async (data: Profile) => {
    setLoading(true);

    const { error } = await WashubClient.updateProfile(data);

    // Update appstate
    if (!error) {
      setAuthState({ profile: { ...profile, ...data } });
    }
    setLoading(false);
  };

  return (
    <AvoidingView
      header={
        <CustomHeader
          leftContent={
            <BackButton
              type="close"
              text={translate("common.close")}
              onPress={navigation.goBack}
            />
          }
          centerContent={
            <View>
              <AutoImage
                resizeMode="contain"
                source={require("../../../assets/images/profile-icon-red.png")}
                style={{
                  height: normalize(35),
                  width: normalize(30),
                }}
              />
            </View>
          }
        />
      }
    >
      <View style={cardStyles.card}>
        <Text preset="header" style={styles.title}>
          {translate("editProfileScreen.editProfile")}
          <Text style={styles.pointStyle}>{"."}</Text>
        </Text>

        <WForm
          style={styles.form}
          ref={WFormRef}
          onSubmit={(value) => {
            editProfile({
              FirstName: value.firstName,
              LastName: value.lastName,
              Email: value.emailAddress,
              Phone: value.phoneNumber,
            });
          }}
          validationSchema={validations}
          initialValue={{
            firstName: profile?.FirstName,
            lastName: profile?.LastName,
            emailAddress: profile?.Email,
            phoneNumber: profile?.Phone,
          }}
        >
          <LineInput
            fieldName="firstName"
            autoCapitalize="words"
            containerStyle={styles.textInputContainer}
            labelStyle={styles.textInputLabel}
            label={translate("editProfileScreen.firstName")}
          />
          <LineInput
            fieldName="lastName"
            autoCapitalize="words"
            containerStyle={styles.textInputContainer}
            labelStyle={styles.textInputLabel}
            label={translate("editProfileScreen.lastName")}
          />
          <LineInput
            fieldName="emailAddress"
            containerStyle={styles.textInputContainer}
            keyboardType="email-address"
            autoComplete="email"
            labelStyle={styles.textInputLabel}
            label={translate("editProfileScreen.emailAddress")}
          />
          <LineInput
            fieldName="phoneNumber"
            keyboardType={"phone-pad"}
            formatter={formatToPhone}
            containerStyle={styles.textInputContainer}
            labelStyle={styles.textInputLabel}
            label={translate("editProfileScreen.phoneNumber")}
          />
          <Button
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
            onPress={() => WFormRef.current.submit()}
            text={translate("common.save")}
          />
        </WForm>
      </View>
    </AvoidingView>
  );
};
