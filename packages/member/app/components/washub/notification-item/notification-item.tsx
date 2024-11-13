import React from "react";
import { Text } from "../../../../../shared/components/text/text";
import { Pressable, View } from "react-native";
import { styles } from "./notification-item.style";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconTrash from "../../svg/icon-trash";
import { normalize } from "../../../../../shared/utils/normalize";
import { typography } from "../../../../../shared/theme";

export interface INotificationItem {
  id: number;
  title: string;
  description: string;
  date: string;
  isNew: boolean;
  btnAction: string;
}

export function NotificationItem({
  notification,
}: {
  notification: INotificationItem;
}) {
  const navigation = useNavigation();

  const styleTitle = !notification.isNew
    ? styles.title
    : { ...styles.title, ...{ fontFamily: typography.bold } };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styleTitle} text={notification.title} />
        <Text style={styles.baseText} text={notification.date} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.description]} text={notification.description} />
        <TouchableOpacity onPress={() => {}}>
          <IconTrash />
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { marginTop: normalize(20) }]}>
        <Pressable onPress={() => {}}>
          <Text style={styles.btnAction} text={notification.btnAction} />
        </Pressable>
      </View>
    </View>
  );
}
