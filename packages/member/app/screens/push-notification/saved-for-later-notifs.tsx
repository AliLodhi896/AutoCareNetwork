import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../../shared/components";
import { translate } from "../../i18n";
import { color } from "../../../../shared/theme";

export default function SavedForLater() {
  return (
    <View>
      <Text style={styles.title}>
        {translate("pushNotification.savedForLater.title")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.text,
  },
});
