import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./settings-common.style";
import { normalize } from "../../../../../shared/utils/normalize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScreenItems } from "../../../screens/washub/settings/settings";
import WashubClient from "../../../services/api/api";
import { navigate } from "../../../navigators";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { IRequestStatus } from "../../../washub-types";
import { Loader } from "../loader/loader";
import { useFocusEffect } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';

interface SettingsDeleteProps {
  handleActiveItem: (i: ScreenItems) => void;
}
const SettingsDelete = ({ handleActiveItem }: SettingsDeleteProps) => {
  const { setAuthState } = useAuthState();
  const [reqStatus, setReqStatus] = useState<IRequestStatus>(
    IRequestStatus.Idle
  );

  useEffect(() => {
    return () => {
      setReqStatus(IRequestStatus.Idle);
    };
  }, []);

  const deleteAccount = async () => {
    setReqStatus(IRequestStatus.Pending);
    await WashubClient.deleteAccount();
    setAuthState({ token: null });
    setReqStatus(IRequestStatus.Success);
    navigate("login");
  };

  if (reqStatus === IRequestStatus.Pending) {
    return <Loader />;
  }

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Settings - Delete',
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
        <Text style={styles.contactTitle} text="DELETE ACCOUNT?" />
        <Text style={[styles.contactText, { marginTop: normalize(25) }]}>
          By deleting your account, you will no longer be able to access your
          car wash membership/vouchers.
        </Text>
        <View style={styles.deleteActions}>
          <TouchableOpacity
            style={styles.deleteCancel}
            onPress={() => {
              handleActiveItem(ScreenItems.MAIN);
            }}
          >
            <Text style={styles.deleteCancelText} text="Cancel" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteConfirm}
            onPress={() => {
              deleteAccount();
            }}
          >
            <Text style={styles.deleteConfirmText} text="Confirm" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsDelete;
