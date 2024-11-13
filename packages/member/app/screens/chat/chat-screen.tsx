import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import intercomService from "../../../../shared/services/intercom.service";
import Intercom, { IntercomEvents } from "@intercom/intercom-react-native";
import { TabNavigatorParamList } from "../../navigators/tab-bar";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { useIsFocused } from "@react-navigation/native";

export const ChatScreen: FC<
  StackScreenProps<TabNavigatorParamList, "chat">
> = ({ navigation }) => {
  const { authState } = useAuthState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Intercom.displayMessenger();
    }
  }, [isFocused]);

  useEffect(() => {
    if (authState.profile?.Email) {
      Intercom.registerIdentifiedUser({email: authState.profile.Email});
      return;
    }
    Intercom.registerUnidentifiedUser();
  }, [authState.profile?.Email]);

  useEffect(() => {
    console.log("ChatScreen mounted");
    const hideListener = Intercom.addEventListener(IntercomEvents.IntercomHelpCenterWindowDidHide, () => {
      console.log("IntercomHelpCenterWindowDidHide");
      navigation.goBack();
    })
    const hideListener2= Intercom.addEventListener(IntercomEvents.IntercomHelpCenterWindowDidShow, () => {
      console.log("IntercomHelpCenterWindowDidShow");
      navigation.goBack();
    })
    const hideListener3 = Intercom.addEventListener(IntercomEvents.IntercomWindowDidShow, () => {
      console.log("IntercomWindowDidShow");
      navigation.goBack();
    })

    const hideListener4 = Intercom.addEventListener(IntercomEvents.IntercomWindowDidHide, () => {
      console.log("IntercomWindowDidHide");
      navigation.goBack();
    })

    return () => {
      hideListener.remove();
      hideListener2.remove();
      hideListener3.remove();
      hideListener4.remove();
    };
  }, [navigation]);

  return <></>;
};
