import React, { useCallback, useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./settings-main.style";
import { Switch } from "react-native-gesture-handler";
import { ScreenItems } from "../../../screens/washub/settings/settings";
import { CircleActionButton } from "../circle-action-button/circle-action-button";
import { logout } from "../../../../../shared/services/actions";
import { useAppState } from "../../../context/app-state-context";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import WashubClient from "../../../services/api/api";
import Geolocation from "@react-native-community/geolocation";
import PushNotification from "react-native-push-notification";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';

interface SettingsMainProps {
  handleActiveItem: (i: ScreenItems) => void;
}
const SettingsMain = ({ handleActiveItem }: SettingsMainProps) => {
  const appContext = useAppState();
  const authContext = useAuthState();

  const [isPushNotification, setIsPushNotification] = useState(true);
  const [isLocation, setIsLocation] = useState(false);

  const checkNotificationPerimission = async () => {
    PushNotification.checkPermissions((permission) => {
      const {
        alert,
        badge,
        critical,
        lockScreen,
        notificationCenter,
        sound,
      } = permission;
      setIsPushNotification(
        alert || badge || critical || lockScreen || notificationCenter || sound
      );
    });
  };

  useEffect(() => {
    checkNotificationPerimission();

    Geolocation.getCurrentPosition(
      (position) => {
        setIsLocation(true);
      },
      (error) => {
        setIsLocation(false);
      }
    );
    return () => {
      setIsLocation(false);
    };
  }, []);

  const toggleNotification = () => {
    Linking.openSettings();
  };

  const toggleLocation = () => {
    Linking.openSettings();
  };

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Settings',
    });
  }
  
  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title} text="Settings" />
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle} text="Push Notification" />
          <Switch
            trackColor={{ false: "#DEE5E9", true: "#DEE5E9" }}
            thumbColor={isPushNotification ? "#00BCFF" : "#BCC4C8"}
            ios_backgroundColor="#DEE5E9"
            onValueChange={toggleNotification}
            value={isPushNotification}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle} text="Location services" />
          <Switch
            trackColor={{ false: "#DEE5E9", true: "#DEE5E9" }}
            thumbColor={isLocation ? "#00BCFF" : "#BCC4C8"}
            ios_backgroundColor="#DEE5E9"
            onValueChange={toggleLocation}
            value={isLocation}
          />
        </View>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => handleActiveItem(ScreenItems.CONTACT)}
            style={styles.itemTouchable}
          >
            <Text style={styles.itemTitle} text="Contact us" />
            <Text style={styles.textXS} text=">" />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => handleActiveItem(ScreenItems.DELETE)}
            style={styles.itemTouchable}
          >
            <Text style={styles.itemTitle} text="Delete Account" />
            <Text style={styles.textXS} text=">" />
          </TouchableOpacity>
        </View>
        <CircleActionButton
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
          text={"LOG OUT"}
          onPress={() => {
            logout(appContext, authContext, WashubClient);
          }}
        />
      </View>
    </View>
  );
};

export default SettingsMain;
