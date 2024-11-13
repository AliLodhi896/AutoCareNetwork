import React, { FC, useState, useEffect } from "react";
import {
  View,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { SettingItem } from './../../../../shared/components/settings-list-item/settings-list-item'
import { SettingsUerProfileCard } from './../../../../shared/components/settings-user-profile-card/settings-user-profile-card'
import { SettingsScreenContainer } from './../../../../shared/components/settings-screen-container/settings-screen-container'
import { NavigatorParamList as TabNavigatorParamList } from "../../navigators/app-navigator";
import { navigate } from "../../navigators";
import { translate } from "../../i18n";
import Communications from "react-native-communications";
import Share from "react-native-share";
import { useAppState } from "../../context/app-state-context";
import { Station } from "../../services/api";
import  WashubClient  from "../../services/api/api";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { logout } from "../../../../shared/services/actions";


export const SettingsScreen: FC<
  StackScreenProps<TabNavigatorParamList, "settings">
> = () => {

  const appContext = useAppState();
  const authContext = useAuthState()
  const { appState } = appContext;
  const { selectedStation } = appState
  const isManager = selectedStation?.IsManager ?? false;

  const [stationInfo, setStationInfo] = useState<Station>(null)

  useEffect(() => {
    (async () => {
      if (isManager && selectedStation) {
        const response = await WashubClient.getStationInfo(selectedStation.StationId)
        if (response.result) {
          setStationInfo(response.result);
        } else {
          setStationInfo(selectedStation)
        }
      } else {
        setStationInfo(selectedStation)
      }
    })();
  }, [isManager, selectedStation])


  const shareThisApp = () => {
    let url = 'https://www.autocarenetwork.com/apps';
    let shareOptions = {
      title: translate("settingsScreen.share.title"),
      message: translate("settingsScreen.share.message", { url: Platform.OS === 'android' ? `\n ${url}` : '' }),
      url,
      subject: translate("settingsScreen.share.subject"), //  for email
    };

    Share.open(shareOptions);
  }

  const aboutAutoCare = () => {
    Communications.web('https://autocarenetwork.com/About');
  };

  const onLogout = () => {
    logout(appContext, authContext, WashubClient);
  }


  const settingItems = [
    {
      label: translate("settingsScreen.items.editStation"),
      onPress: () => navigate("editProfile", { stationId: selectedStation.StationId, station: stationInfo })
    },
    {
      label: translate("settingsScreen.items.pushNotifications"),
      onPress: () => navigate("pushSettings")
    },
    {
      label: translate("settingsScreen.items.taxInfo"),
      onPress: () => navigate("taxInfo"),
    },
    {
      label: translate("settingsScreen.items.sendCustomerApp"),
      onPress: () => shareThisApp(),
    },
    {
      label: translate("settingsScreen.items.aboutAutocare"),
      onPress: () => aboutAutoCare(),
    },
  ];

  return (
    <SettingsScreenContainer
      WashubClient={WashubClient}
      onLogout={onLogout}
      appContext={appContext}
      appType="merchant"
      client={WashubClient}
      translate={translate}
      UserProfileCard={<SettingsUerProfileCard />}
      SettingItems={(
        <View>
          {settingItems.map((item, key) => <SettingItem
            key={key}
            label={item.label}
            onPress={item.onPress}
          />)}
        </View>
      )}
    />
  )
};
