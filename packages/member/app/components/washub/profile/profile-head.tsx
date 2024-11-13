import React from "react";

import { Pressable, View } from "react-native";
import ArrowBlue from "../../svg/arrow-blue";
import { Text } from "../../../../../shared/components";
import { Profile } from "../../../services/api";
import { styles } from "./profile-head.style";

export function ProfileHead({
  user,
  handleClose,
}: {
  user: Profile;
  handleClose: () => void;
}) {
  return (
    <View style={styles.headerMenu}>
      <Pressable onPress={handleClose}>
        <ArrowBlue />
      </Pressable>
      <View style={styles.letterContainer}>
        <Pressable>
          <View style={styles.profileButton}>
            {user.FirstName !== "" && user.FirstName.length > 0 && (
              <Text style={styles.profileButtonTxt} text={user.FirstName[0]} />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
