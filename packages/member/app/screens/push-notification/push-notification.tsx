import React from "react";
import { Screen, Text } from "../../../../shared/components";
import { translate } from "../../i18n";
import { StyleSheet } from "react-native";
import { color } from "../../../../shared/theme";
import { useNotifications } from "../../../../shared/contexts/notifications-contexts";

export default function PushNotificationHistory() {
  const notifications = useNotifications();
  return (
    <Screen>
      <Text style={styles.title}>
        {translate("pushNotification.history.title")}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.text,
  },
});
