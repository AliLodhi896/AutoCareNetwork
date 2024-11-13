import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen,  Story, UseCase } from "../../storybook/views";
import WashubInput from "./w-input";

declare let module;

storiesOf("W-Input", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Different Inputs types", () => (
    <Story>
      <UseCase text="Basic textinput " usage="default input with no extra">
        <WashubInput
          fieldName={"username"}
          placeholder={"User Name"}
          value={""}
          onChange={(e) => console.log(e)}
        />
      </UseCase>

      <UseCase text="Input with secureText">
        <WashubInput
          secureTextEntry
          fieldName={"createpassword"}
          placeholder={"Name"}
          onChange={(e) => console.log(e)}
        />
      </UseCase>
    </Story>
  ));
