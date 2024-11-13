import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen,  Story, UseCase } from "../../storybook/views";
import { WForm } from "./w-form";
import { useRef } from "react";
import { object, string } from "yup";
import { Text, View, TextInputProps, Pressable } from "react-native";
import { color, spacings } from "../../theme";
import { WFormRef } from "./w-form.type";
import WashubInput from "../w-input/w-input";
declare let module;

const validations = object().shape({
  name: string().required("The name is required"),
  email: string()
    .required("The email is required")
    .email("This must be a valid email"),
  amount: string().required("The amount field is required"),
  password: string().required("The password field is required"),
});

interface FormInputType extends TextInputProps {
  onChange?: (value: any) => void;
  onBlur?: () => void;
  value?: any;
  fieldName: string;
}
const FormInput = (props: FormInputType) => {
  return <WashubInput {...props} />;
};
const WFormStory = () => {
  const WFormRef = useRef<WFormRef>(null);

  return (
    <WForm
      ref={WFormRef}
      onSubmit={(value) => {
        console.warn("Submitting from: ", value);
      }}
      validationSchema={validations}
      onChange={(value) => {
        console.warn(" handling change: ", value);
      }}
      initialValue={{
        email: "",
        amount: "",
        password: "",
        forgotPassword: "",
      }}
    >
      <View>
        <View>
          <FormInput placeholder={"Enter name"} fieldName="name" />
        </View>
        <View>
          <FormInput
            fieldName="email"
            keyboardType={"email-address"}
            placeholder={"Enter email"}
          />
        </View>
        <View>
          <FormInput
            fieldName="amount"
            keyboardType={"numeric"}
            placeholder={"Enter amount"}
          />
        </View>
        <View>
          <FormInput
            fieldName="password"
            placeholder={"Enter password"}
            secureTextEntry
          />
        </View>
        <View>
          <FormInput
            fieldName="forgotPassword"
            placeholder={"Enter password"}
            secureTextEntry
          />
        </View>
        <Pressable
          onPress={() => WFormRef.current.submit()}
          style={{ padding: spacings.medium }}
        >
          <Text style={{ color: color.palette.black }}>{"Submit Form"}</Text>
        </Pressable>
      </View>
    </WForm>
  );
};
storiesOf("W-Form", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default Form behavior", () => {
    return (
      <Story>
        <UseCase text="Default" usage="The default W-Form behavior">
          <WFormStory />
        </UseCase>
      </Story>
    );
  });
