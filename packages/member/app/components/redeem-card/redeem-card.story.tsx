/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../shared/storybook/views"
import { RedeemCard } from "./redeem-card"

declare let module

storiesOf("Redeem Card", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("General redeem card", () => (
    <Story>
      <UseCase text="default" usage="Redeem card with all information">
        <RedeemCard redeem={{ id: 1, name: 'MAGIC CARWASH', street: '494 Bushwick Avenue', address: 'Brooklyn, NY 11206', phone: '(718) 578 3832', type: 'FULL SERVICE', mile: 1 }} />
      </UseCase>
    </Story>
  ))

