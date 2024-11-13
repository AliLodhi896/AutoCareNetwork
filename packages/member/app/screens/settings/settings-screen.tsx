import React, { FC } from "react";
import {
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SettingItem } from './../../../../shared/components/settings-list-item/settings-list-item'
import { SettingsUerProfileCard } from './../../../../shared/components/settings-user-profile-card/settings-user-profile-card'
import { SettingsScreenContainer } from './../../../../shared/components/settings-screen-container/settings-screen-container'
import { TabNavigatorParamList } from "../../navigators/tab-bar";
import { navigate } from "../../navigators";
import { DeleteWarningModal, LinkNewMembershipCardModal } from "../../components/settings-modals/settings-modals";
import useModal from "../../../../shared/contexts/modal/useModal";
import { color } from "../../../../shared/theme";
import { translate } from "../../i18n";
import WashubClient from "../../services/api/api";

import Communications from "react-native-communications";
import {
  WASHUB_EMAIL,
  getAppName,
  getMemberNumber,
} from "../../../../shared/utils/common";
import Share from "react-native-share";
import { isDealerBundleApp } from "../../../../shared/services/api";
import { HelpContent } from "../../components/contact-modal/contact-modal";
import { useAppState } from "../../context/app-state-context";
import { logout } from "../../../../shared/services/actions";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";



export const SettingsScreen: FC<
  StackScreenProps<TabNavigatorParamList, "settings">
> = () => {

  const modal = useModal();

  const appContext = useAppState();
  const authContext = useAuthState()
  const { appState } = appContext;
  const { cards } = appState;

  const shareThisApp = () => {
    const url = isDealerBundleApp()
      ? "https://www.dealerbundle.com/apps"
      : "https://www.autocarenetwork.com/apps";

    const shareOptions = {
      title: "Share this app",
      message: `Try the ${getAppName()} app!`,
      url,
      subject: `Check Out ${getAppName()}!`, //  for email
    };

    Share.open(shareOptions);
  };

  const getEmailRef = async () => {
    const cardsCodes = cards ? cards.map(getMemberNumber) : [];
    const joint = `[Ref:  ${cardsCodes.join()}  ]`;
    return joint;
  };

  const onFeedback = () => {
    Communications.email(
      [WASHUB_EMAIL],
      null,
      null,
      "Washub App Feedback " + getEmailRef(),
      null
    )
  };
  const openContact = () => {
    modal.showModal(<HelpContent contactWashub />);
  };

  const onLogout = () => {
    logout(appContext, authContext, WashubClient)
  }

  const settingItems = [
    {
      label: translate("settingsScreen.items.pushNotifications"),
      onPress: () => navigate("pushNotificationsSettings")
    },
    {
      label: translate("settingsScreen.items.myMemberNumber"),
      onPress: () => navigate("myMemberNumbers"),
    },
    {
      label: translate("settingsScreen.items.linkNewMembershipCard"),
      onPress: () => modal.showModal(<LinkNewMembershipCardModal />),
    },
    {
      label: translate("settingsScreen.items.provideFeedback"),
      onPress: () => onFeedback(),
    },
    {
      label: translate("settingsScreen.items.contactAutoCare"),
      onPress: () => openContact(),
    },
    {
      label: translate("settingsScreen.items.deleteAccount"),
      onPress: () => modal.showModal(<DeleteWarningModal />),
      textStyle: { color: color.palette.red },
    }
  ];

  return (
    <SettingsScreenContainer
      WashubClient={WashubClient}
      onLogout={onLogout}
      appContext={appContext}
      translate={translate}
      client={WashubClient}
      appType="member"
      UserProfileCard={<SettingsUerProfileCard onPress={() => navigate("editProfile")} />}
      SettingItems={(
        <View>
          {settingItems.map((item, key) => <SettingItem
            key={key}
            label={item.label}
            onPress={item.onPress}
            textStyle={item.textStyle && item.textStyle}
          />)}
        </View>
      )}
    />
  )
};
