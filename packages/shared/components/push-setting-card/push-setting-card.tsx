import React, { useState, useEffect } from "react";
import {
  Switch,
  Alert,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./push-setting-card.style";
import { color } from "../../theme";
import { PushSetting } from "../../global-types";
import { Text } from "../text/text";
interface PushSettingProps {
  pushSetting: PushSetting;
  onToggle: (e: any) => void;
  textStyle?: TextStyle;
  WashubClient: any;
  containerStyle?: ViewStyle;
}

export const PushSettingCard = (props: PushSettingProps) => {
  const [pushSetting, setPushSetting] = useState<PushSetting>(
    props.pushSetting
  );

  useEffect(() => {
    setPushSetting(props.pushSetting);
  }, [props.pushSetting])


  const onToggle = async (d: "True" | "False") => {

    const res = await props.WashubClient.updateSettings({
      SettingName: pushSetting.SettingName,
      Value: d ? "True" : "False",
    });

    if (res.error) {
      Alert.alert("Error updating push settings", res.error.message);
    } else {
      if (res?.Settings) {
        setPushSetting(res.Settings);
      }
    }
  };


  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, props.textStyle]}>
          {pushSetting.SettingName}
        </Text>
        <Text
          fontFamily="secondary"
          style={[styles.description, props.textStyle]}
        >
          {pushSetting.SettingInfo}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Switch
          thumbColor={color.primary}
          trackColor={{
            false: color.palette.lightGreyBackground,
            true: color.palette.lighterGreyBackground,
          }}
          onValueChange={onToggle}
          value={pushSetting.Value === "True"}
        />
      </View>
    </View>
  );
};

