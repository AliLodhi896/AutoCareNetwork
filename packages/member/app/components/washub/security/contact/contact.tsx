import React, { useCallback } from "react";
import { View } from "react-native";
import { Text } from "../../../../../../shared/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconWSPhone from "../../../svg/icon-ws-phone";

import {
  WASHUB_EMAIL,
  WASHUB_SMS_NUMBER,
  contactViaPhone,
} from "../../../../../../shared/utils/common";
import Communications from "react-native-communications";
import { commonStyles } from "../security-common.style";
import IconWSText from "../../../svg/icon-ws-text";
import IconWSEnvelop from "../../../svg/icon-ws-envelop";
import { styles } from "./contact.style";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';
const Contact = () => {

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Contact Us',
    });
  }
  
  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.box}>
        <Text style={styles.title} text="Contact Autocare" />
        <View style={styles.contactIcons}>
          <TouchableOpacity
            style={styles.contactTouchable}
            onPress={() => {
              contactViaPhone("Contact Autocare");
            }}
          >
            <IconWSPhone fill="#1B588A" />
            <Text style={styles.text} text="Call us" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactTouchable}
            onPress={() => {
              Communications.text(WASHUB_SMS_NUMBER, null);
            }}
          >
            <IconWSText fill="#1B588A" />
            <Text style={styles.text} text="Text us" />
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
            <IconWSEnvelop fill="#1B588A" />
            <Text style={styles.text} text="Email us" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Contact;
