import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen,  Story, UseCase } from "../../storybook/views"
import { LineInput } from "./l-input"

declare let module

storiesOf("L-Input", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Line input", () => (
    <Story>
      <UseCase text="Home" usage="Line input with fieldName, label, onChange() and value">
        <LineInput  fieldName="fieldName" label="Label Here" onChange={(e) => console.log(e)} value="Initial value" />
      </UseCase>
    </Story>
  ))
