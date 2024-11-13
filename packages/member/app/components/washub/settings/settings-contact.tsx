import React, { useCallback } from "react";
import { View } from "react-native";
import { Text } from "../../../../../shared/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconWSPhone from "../../svg/icon-ws-phone";
import { styles } from "./settings-common.style";
import IconWSText from "../../svg/icon-ws-text";
import IconWSEnvelop from "../../svg/icon-ws-envelop";
import {
  WASHUB_EMAIL,
  WASHUB_SMS_NUMBER,
  contactViaPhone,
} from "../../../../../shared/utils/common";
import Communications from "react-native-communications";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';

const SettingsContact = () => {

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Settings - Contact',
    });
  }
  
  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );

  return (
    <View style={styles.contactContainer}>
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle} text="Contact Autocare" />
        <View style={styles.contactIcons}>
          <TouchableOpacity
            style={styles.contactTouchable}
            onPress={() => {
              contactViaPhone("Contact Autocare");
            }}
          >
            <IconWSPhone />
            <Text style={styles.contactText} text="Call us" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactTouchable}
            onPress={() => {
              Communications.text(WASHUB_SMS_NUMBER, null);
            }}
          >
            <IconWSText />
            <Text style={styles.contactText} text="Text us" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactTouchable}
            onPress={() => {
              Communications.email(
                [WASHUB_EMAIL],
                null,
                null,
                "Autocare Support Request",
                null
              );
            }}
          >
            <IconWSEnvelop />
            <Text style={styles.contactText} text="Email us" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsContact;
