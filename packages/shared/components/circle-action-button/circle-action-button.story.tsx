import * as React from "react";
import { Alert } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen,  Story, UseCase } from "../../storybook/views"
import Icon from "react-native-vector-icons/Ionicons";
import { CircleActionButton } from "./circle-action-button";
import { color, fontsize } from "../../theme";
Icon.loadFont();

declare let module;

storiesOf("CircleActionButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Circle Action Button Large" usage="Circle action button">
        <CircleActionButton
          family={"Octicons"}
          name={"checklist"}
          text={"Submit Claim"}
          size={fontsize.huge}
          color={color.palette.white}
          backgroundColor={color.primary}
          onPress={() => Alert.alert("Leave me alone")}
        />
      </UseCase>
    </Story>
  ));
