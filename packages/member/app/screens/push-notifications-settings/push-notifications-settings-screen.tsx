import React, { FC, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { TabNavigatorParamList } from "../../navigators/tab-bar";
import { translate } from "../../i18n";
import { color, fontsize, spacings } from "../../../../shared/theme";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import WashubClient from "../../services/api/api";
import { getAppID } from "../../../../shared/utils/common";
import { PushSetting } from "../../../../shared/global-types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PageWithCard } from "../../../../shared/components/page-with-card/page-with-card";
import { PushSettingCard } from "../../../../shared/components/push-setting-card/push-setting-card";
import BellIcon from "../../../../shared/components/svg/bell-icon";
import { normalize } from "../../../../shared/utils/normalize";

export const PushNotificationsSettingsScreen: FC<
  StackScreenProps<TabNavigatorParamList, "settings">
> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pushSettings, setPushSettings] = useState<PushSetting[]>([]);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      getPushNotificationsSettings();
    }, [])
  );

  const getPushNotificationsSettings = async () => {
    setLoading(true);
    const { result } = await WashubClient.getPushNotificationsSettings(
      "44935fb7-9864-4062-8bb9-58e7adecfe9d"
    );
    if (result?.Settings) {
      setPushSettings(result.Settings);
    }
    setLoading(false);
  };

  return (
    <PageWithCard
      appType="member"
      nav={{
        title: translate("pushNotificationsScreen.pushNotifications"),
        iconFamily: "FontAwesome",
        iconName: "bell",
      }}
      icon={
        <BellIcon
          fill={color.primary}
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
          onPress={navigation.goBack}
        />
      }
      testID="PushNotificationsSettingsScreen"
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
          renderItem={({ item }) => (
            <PushSettingCard
              WashubClient={WashubClient}
              pushSetting={item}
              onToggle={(e) => console.log(e)}
            />
          )}
          keyExtractor={(item) => String(Math.random() * 3433)}
        />
      </View>
    </PageWithCard>
  );
};
