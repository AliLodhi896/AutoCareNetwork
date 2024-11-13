import React, { FC, useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { PageWithCard } from '../../../../shared/components/page-with-card/page-with-card'
import { PushSettingCard } from '../../../../shared/components/push-setting-card/push-setting-card'
import { NavigatorParamList as TabNavigatorParamList } from "../../navigators/app-navigator";
import { translate } from "../../i18n";
import WashubClient from "../../services/api/api";
import { fontsize, spacings, color } from "../../../../shared/theme";
import { PushSetting } from "../../../../shared/global-types";
import { getAppID } from "../../../../shared/utils/common";
import { DottedLine } from "../../../../shared/components";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { normalize } from "../../../../shared/utils/normalize"
import BellIcon from '../../../../shared/components/svg/bell-icon';


export const PushSettingsScreen: FC<
  StackScreenProps<TabNavigatorParamList, "pushSettings">
> = ({navigation}) => {

  const [pushSettings, setPushSettings] = useState<PushSetting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPushSettings = async () => {
    setLoading(true);
    const appID = await getAppID();
    const { result } = await WashubClient.getPushNotificationsSettings(appID);
    if (result?.Settings) {
      setPushSettings(result.Settings);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPushSettings()
  }, [])

  return (
    <PageWithCard
      nav={{
        title: translate("pushNotificationsScreen.pushNotifications"),
        iconFamily: "FontAwesome",
        iconName: "bell",
      }}
      icon={
        <BellIcon
          fill={color.palette.white}
          style={{
            height: normalize(40),
            width: normalize(40),
          }}
        />
      }
      BackButton={
        <BackButton
          type="close"
          text={translate("common.close")}
          color={color.palette.white}
          onPress={navigation.goBack}
        />
      }
      testID="pushNotificationSettingsID"
      appType="merchant"
    >
      <View>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: spacings.medium }}
            size={fontsize.huge}
            color={color.primary}
          />
        )}

        <FlatList
          style={{ marginVertical: spacings.medium }}
          data={pushSettings}
          renderItem={({ item, index }) => (
            <>
              <PushSettingCard
                WashubClient={WashubClient}
                pushSetting={item}
                onToggle={(e) => console.log(e)}
              />
              {pushSettings.length - 1 !== index && <DottedLine />}
            </>
          )}
          keyExtractor={(item) => String(Math.random() * 3433)}
        />
      </View>
    </PageWithCard>
  )
};
