import * as React from "react";
import { ViewStyle, TextStyle, Alert } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen,  Story, UseCase } from "../../storybook/views"
import Icon from "react-native-vector-icons/Ionicons";
import { CircleButton } from "./circle-button";
import { spacings } from "../../theme";
Icon.loadFont();

declare let module;

const buttonStyleArray: ViewStyle[] = [
  { width: 200, height: 200 },
  { borderRadius: 100 },
];

const buttonTextStyleArray: TextStyle[] = [{ color: "#a511dc" }];

storiesOf("CircleButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase
        text="CircleButton Large"
        usage="CircleButton With  Style Overrides"
      >
        <CircleButton
          blur
          text="Click It"
          onPress={() => Alert.alert("pressed")}
          style={buttonStyleArray}
          textStyle={buttonTextStyleArray}
          icon={
            <Icon
              name="help-circle-outline"
              size={3 * spacings.icons.large}
              color="#ffffff"
            />
          }
        />
      </UseCase>
    </Story>
  ));
