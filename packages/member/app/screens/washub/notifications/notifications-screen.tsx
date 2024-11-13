import { View, FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect, FC, useCallback } from "react";
import MCReactModule from "react-native-marketingcloudsdk";
import { HomeNavigatorParamList } from "../home/home-stack";

import { styles } from "./notifications-screen.styles";
import { Layout } from "../../../components/washub/layout";
import {
  INotificationItem,
  NotificationItem,
} from "../../../components/washub/notification-item/notification-item";

import analytics from '@react-native-firebase/analytics';
import { useFocusEffect } from "@react-navigation/native";

import { Text } from "../../../../../shared/components";


const data: INotificationItem[] = [
  {
    id: 1,
    title: "ONE FREE CAR WASH",
    description:
      "Applied to Toyota Highlander. Redeem at any car wash in network. Voucher will be applied before any plan redemptions. Exp. 12/31/2025    ",
    date: "08-21-23",
    isNew: true,
    btnAction: "Redeem Wash",
  },
  {
    id: 2,
    title: "$15 OFF SYNTHETIC OIL CHANGE",
    description:
      "Up to 5 quarts oil, lube, and filter. Offer valid until 8-21-23.",
    date: "07-03-23",
    isNew: false,
    btnAction: "Schedule Service",
  },
];





export function NotificationsScreen(_: StackScreenProps<HomeNavigatorParamList, "notifications">) {
  useFocusEffect(
    () => {
      analytics().logEvent('screen_view', {
        screen_name: 'Notifications',
      });
    }
  );

  // const notifications = useNotifications();
  useEffect(() => {
    const updatePushData = async () => {
      const enabled = await MCReactModule.isPushEnabled();

      const systemToken = await MCReactModule.getSystemToken();

      console.log(enabled, systemToken);
    };
    updatePushData();
  }, []);

  // const notifications = useNotifications();
  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text style={styles.title} text="Notifications" />
        </View>
        <View style={{ flex: 25 }}>
          <View style={{ ...styles.flatListContainer }}>
            <FlatList
              contentContainerStyle={styles.flatList}
              data={[]}
              renderItem={({ item }: { item: INotificationItem; }) => (
                <NotificationItem notification={item} />
              )}
              keyExtractor={(item, key) => {
                return item.id.toString() + key.toString();
              } }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={() => <View style={styles.footer} />}
              ListEmptyComponent={() => (
                <Text style={styles.emptyList} text="No notifications" />
              )} />
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </Layout>
  );
}

export default NotificationsScreen;
