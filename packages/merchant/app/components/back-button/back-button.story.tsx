import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { BackButton } from "./back-button";

declare let module;

storiesOf("BackButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary BackButton.">
        <BackButton type="back" />
      </UseCase>
      <UseCase
        text="Disabled"
        usage="The disabled behaviour of the primary BackButton."
      >
        <BackButton type="close" />
      </UseCase>
    </Story>
  ));
