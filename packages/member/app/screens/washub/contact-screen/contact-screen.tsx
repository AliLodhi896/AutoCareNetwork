import React, { FC, useRef, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";

import LayoutSecurity from "../../../components/washub/security/layout-security";
import Contact from "../../../components/washub/security/contact/contact";

export const ContactScreen: FC<
  StackScreenProps<NavigatorParamList, "contact">
> = ({ navigation }) => {
  return (
    <LayoutSecurity>
      <Contact />
    </LayoutSecurity>
  );
};
