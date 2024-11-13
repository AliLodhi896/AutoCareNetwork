import React from 'react';
import { Pressable, TouchableOpacity, View } from "react-native";
import { Text, VIcon } from "../../../../shared/components";
import { prefix, screenDimensions, spacings } from "../../../../shared/theme";
import { navigate } from '../../navigators';
import { Profile, Station } from "../../services/api";
import { styles } from "./profile-action-button.style";
import UserAvatar from "react-native-user-avatar";
import useModal from '../../../../shared/contexts/modal/useModal';
import { translate } from '../../i18n';
import { CircleButton } from '../../../../shared/components/circle-button/circle-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProfileActionButtonProps {
  selectedStation?: Station;
  profile: Profile
}

export const ProfileActionButton = ({selectedStation, profile}: ProfileActionButtonProps ) => {
      const modal = useModal()
      const insets = useSafeAreaInsets()
      const editStation = () => {
        modal.hideModal()
        navigate('editProfile', {
            stationId: selectedStation?.StationId,
          });
        }
      const goToSetting = () => {
        modal.hideModal()
        navigate('settings');
      }

      const ActionView = () => {
        return (
          <View style={{...styles.actionContainer,  
          top: 56 + insets.top }}>
            <TouchableOpacity onPress={editStation}>
              <View style={styles.actionButton}>
            <View style={styles.circleView}>
            <CircleButton
              noText
              style={styles.circle}
              text={translate("homeScreen.contactWashub")}
              icon={
                <VIcon
                  family="Ionicons"
                  name={`${prefix}-create`}
                  style={styles.actionButtonIcon}
                />
              }
            />
            </View>
               
                <Text style={styles.actionText}>{translate("homeScreen.editStation")}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToSetting}>
              <View style={styles.actionButton}>
              <View  style={styles.circleView}>
              <CircleButton
              noText
              style={styles.circle}
              text={translate("homeScreen.contactWashub")}
              icon={
                <VIcon
                family="Ionicons"
                name={`${prefix}-settings-outline`}
                style={styles.actionButtonIcon}
              />
              }
            />
            </View>
               
                 <Text style={styles.actionText}>{translate("homeScreen.settings")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      const openActions = () => {
        modal.showModal(<ActionView />, {modalProps: {backdropOpacity: 0.1}})
      }

      return (
        <View style={styles.container}>
          <Pressable onPress={openActions}>
            <View style={styles.imageOuter}>
              <View style={styles.imageInner}>
                <UserAvatar
                  size={spacings.icons["medium+"]}
                  name={profile?.FirstName[0] + " " + profile?.LastName[0]}
                />
              </View>
            </View>
          </Pressable>
        </View>
      )
   
  }
