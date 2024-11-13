import React, { FC, useState } from "react";
import {
  View,
  FlatList,
  Text as RnText,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { GradientBackground, Screen, Tabs, Text } from "../../../../shared/components";
import { NotificationCard } from "../../components/notification-card/notification-card";
import { color } from "../../../../shared/theme";
import { NavigatorParamList } from "../../navigators";
import { translate } from "../../i18n";
import { styles } from "./notifications-screen.styles";
import { useNotifications } from "../../../../shared/contexts/notifications-contexts";
import { Notification } from "../../services/notification.service";
import dayjs from "dayjs";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import NotifOnIcon from "../../../../shared/components/svg/notif-icon-active"

type KeyType = "all" | "saved"

const tabs: Array<{value: string; key: KeyType}> = [
  {
    value: translate("notificationsScreen.allNotifications"),
    key: "all",
  },
  {
    value: translate("notificationsScreen.savedForLater"),
    key: "saved",
  },
]

export const NotificationsScreen: FC<
  StackScreenProps<NavigatorParamList, "notifications">
> = ({ navigation }) => {
  const [type, setType] = useState<KeyType>("all");
  const notifications = useNotifications();
  return (
    <Screen
      preset="fixed"
      style={styles.container}
    >
      <GradientBackground />
      <View  style={styles.safeArea}>
        <View style={styles.body}>
      <View style={styles.card}>
        <Text preset="header" style={[styles.title, { marginBottom: 15 }]}>
          {translate("notificationsScreen.notifications")}
          <RnText style={{ color: color.primary }}>.</RnText>
        </Text>
        <Tabs<KeyType> tabs={tabs} onChange={(value) => setType(value)} value={type} isNotif/>
        <FlatList
          data={arrayUniqueByKey(
            notifications.data.notifications,
            "id"
          ).filter((item) => (type == "all" ? true : item.isSavedForLater))}
          renderItem={({ item }) => {
            return (
              <NotificationCard
                notification={{
                  id: item.data?.message_id || item.id,
                  title: item.title,
                  customMessage: item.data?.endpoint,
                  content: item.data?.message_content,
                  isRead: item.isRead,
                  date: dayjs(item.date).format(),
                }}
              />
            );
          }}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
      </View>
     </View>
      <CustomHeader
            leftContent={
              <BackButton text={translate("common.close")} onPress={navigation.goBack} type="close" />
            }
            centerContent={<NotifOnIcon />}
      />
    </Screen>
  );
};

const arrayUniqueByKey = (array, key: string) =>
  [
    ...new Map(array.map((item) => [item[key], item])).values(),
  ] as Notification[];

