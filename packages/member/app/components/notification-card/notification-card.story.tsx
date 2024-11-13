/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../shared/storybook/views"
import { NotificationCard } from "./notification-card"

declare let module

storiesOf("Notification Card", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("General notification", () => (
    <Story>
      <UseCase text="default" usage="Notification with title, content and date">
        <NotificationCard notification={{id: 1, title: 'This is my title', content: 'This is the content', date: '22/02/2022'}} />
      </UseCase>
    </Story>
  ))

