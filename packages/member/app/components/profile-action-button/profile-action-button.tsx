import React from "react";
import { Alert, Platform, Pressable, TouchableOpacity, View } from "react-native";
import { Text, VIcon } from "../../../../shared/components";
import { prefix } from "../../../../shared/theme";
import { Profile } from "../../services/api";
import { styles } from "./profile-action-button.style";
import { useNavigation } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";

interface ProfileActionButtonProps {
  profile: Profile;
}
import { DrawerActions } from "@react-navigation/native";

export const ProfileActionButton = ({ profile }: ProfileActionButtonProps) => {
  const navigator = useNavigation();

  const scrreenView = async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'My Profile Menu',
    });
  }
  // React.useEffect(() => {
  //   const scrreenView = async () => {
  //     await analytics().logEvent('screen_view', {
  //       screen_name: 'My Profile Menu',
  //     });
  //     console.log('My Profile Menu Screen view logged');
  //   };

  //   scrreenView();
  // }, []);



  return (
    <View style={styles.letterContainer}>
      <Pressable
        onPress={() => {
          scrreenView(),
          navigator.dispatch(DrawerActions.openDrawer());
        }}
      >
        <View style={styles.profileButton}>
          <Text style={styles.profileButtonTxt}>{profile?.FirstName[0]}</Text>
        </View>
      </Pressable>
    </View>
  );
};
