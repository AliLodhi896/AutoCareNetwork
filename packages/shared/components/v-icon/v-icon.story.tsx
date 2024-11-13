import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen,  Story, UseCase } from "../../storybook/views"
import { VIcon } from "./v-icon"

declare let module

storiesOf("V-Icon", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Vector icons", () => (
    <Story>
      <UseCase text="Home" usage="Home Icon with red color from MaterialCommunityIcons">
        <VIcon name="home" family="MaterialCommunityIcons" size={22} color="red" />
      </UseCase>
      <UseCase text="Play" usage="Play Icon with green color, size 40 from Ionicons">
        <VIcon name="play-circle" family="Ionicons" size={40} color="green" />
      </UseCase>
      <UseCase text="Facebook" usage="Facebook Icon with brand color, size 70 from FontAwesome">
        <VIcon name="facebook-square" family="FontAwesome" size={40} color="#1877f2" />
      </UseCase>
      {/* <UseCase text="bullet" usage="The icon for a bullet point">
        <VIcon icon="bullet" />
      </UseCase> */}
    </Story>
  ))
