import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Text, VIcon } from './../../components'
import { fontsize, color, } from './../../theme'
import { styles } from './settings-user-profile-card.style';
import { useAuthState } from "../../contexts/auth-state-context";
import { formatToPhone } from '../../utils/common';


interface SettingsUerProfileCardProps {
  onPress?: () => any
}

export const SettingsUerProfileCard = (props: SettingsUerProfileCardProps) => {
  const authContext = useAuthState();
  const { authState } = authContext;
  const { profile } = authState;

  if (!profile) {
    return null;
  }

  const { LastName, FirstName, Phone, Email } = profile;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => props.onPress && props.onPress()}
      style={styles.profileContainer}
    >
      <View style={styles.profileDetails}>
        <Text
          style={styles.profileText}
        >{`${FirstName||""} ${LastName||""}`}</Text>
        {Phone && <Text style={styles.profileText}>{formatToPhone(Phone)}</Text>}
        {Email && <Text style={styles.profileText}>{Email}</Text>}
      </View>
      {props.onPress && <View style={styles.editIconContainer}>
        <VIcon
          family="FontAwesome"
          name="edit"
          color={color.primary}
          size={fontsize.medium}
        />
      </View>}
    </TouchableOpacity>
  );
};