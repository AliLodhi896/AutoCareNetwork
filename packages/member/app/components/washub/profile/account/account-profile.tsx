import { ActivityIndicator, View } from "react-native";
import { Field, Formik, useFormikContext } from "formik";

import React, { useEffect, useRef, useState } from "react";
import { Profile } from "../../../../services/api";
import { styles } from "./account-profile.style";
import { object, string } from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import AppFormField from "../../form/AppFormField";
import { Text } from "../../../../../../shared/components";
import WashubClient from "../../../../services/api/api";
import { IRequestStatus } from "../../../../washub-types";
import { useAuthState } from "../../../../../../shared/contexts/auth-state-context";
import { CircleActionButton } from "../../circle-action-button/circle-action-button";
import { set } from "react-native-reanimated";
import { formatToPhone } from "../../../../../../shared/utils/common";

// const AutoSubmitToken = () => {
//   const { authState } = useAuthState();
//   const { values, submitForm } = useFormikContext();
//   const [canSubmit, setCanSubmit] = useState(false);
//   useEffect(() => {
//     if (JSON.stringify(values) !== JSON.stringify(authState.profile)) {
//       // submitForm();
//       setCanSubmit(true);
//     }
//   }, [values, submitForm]);

//   useEffect(() => {
//     // if (canSubmit) {
//     //   submitForm();
//     // }
//     return () => {
//       submitForm();
//       console.log("unmount -  submit", canSubmit);
//     };
//   }, []);
//   return null;
// };

const validations = object().shape({
  FirstName: string().required("The first name is required"),
  LastName: string().required("The last name is required"),
  Email: string()
    .required("The email is required")
    .email("This must be a valid email"),
  Phone: string()
    .required("The phone number field is required")
    .test("is-us-phone", "Please enter a valid US phone number", (value) => {
      if (typeof value !== "string") {
        return false;
      }
      const isValid = isValidPhoneNumber(value, "US");
      return isValid;
    }),
});

interface IProfileForm {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}
interface Props {
  user: Profile;
}

const AccountProfile = ({ user }: Props) => {
  const { setAuthState, authState } = useAuthState();
  const [reqStatus, setReqStatus] = useState<IRequestStatus>(
    IRequestStatus.Idle
  );
  const formRef = useRef(null);
  const formValues: IProfileForm = {
    Email: user.Email,
    FirstName: user.FirstName,
    LastName: user.LastName,
    Phone: formatToPhone(user.Phone),
  };

  useEffect(() => {
    return () => {
      setReqStatus(IRequestStatus.Idle);
    };
  }, []);

  const onSubmit = (values: IProfileForm) => {
    setReqStatus(IRequestStatus.Pending);
    const saveProfile = async () => {
      const { error } = await WashubClient.updateProfile(values);
      let status = IRequestStatus.Error;
      if (!error) {
        setAuthState({ profile: { ...user, ...values } });
        status = IRequestStatus.Success;
      }
      setReqStatus(status);
    };
    saveProfile();
  };

  if (reqStatus === IRequestStatus.Pending) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={"#00BCFF"} />
      </View>
    );
  }

  return (
    <View>
      {reqStatus === IRequestStatus.Error && (
        <View>
          <Text>There was an error</Text>
        </View>
      )}
      <Formik
        initialValues={formValues}
        onSubmit={(values: IProfileForm) => onSubmit(values)}
        validationSchema={validations}
        innerRef={formRef}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <Field
              component={AppFormField}
              name="FirstName"
              placeholder="First Name"
              label="First Name"
            />
            <Field
              component={AppFormField}
              name="LastName"
              placeholder="Last Name"
              label="Last Name"
            />
            <Field
              component={AppFormField}
              name="Email"
              placeholder="Email address"
              label="Email Address"
            />
            <Field
              component={AppFormField}
              name="Phone"
              placeholder="Phone Number"
              label="Phone Number"
            />
            <View style={{ alignItems: "center" }}>
              <CircleActionButton
                style={styles.actionButton}
                text="SAVE"
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AccountProfile;
AccountProfile.defaultProps = {
  externalSubmit: false,
};
