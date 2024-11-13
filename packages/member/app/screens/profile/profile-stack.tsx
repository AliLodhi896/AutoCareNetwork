import React, { useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "../../services/api";
import TermsScreen from "../terms/terms-screen";
import ProfileScreen from "./profile-screen";
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

export type ProfileNavigatorParamList = {
  default: {
    title?: string;
    cards?: Card[];
    onCardSelected: (card: Card) => void;
  };
  Terms: undefined;
};
const ProfileStack = createNativeStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigatorStack = () => {
  const navigation = useNavigation<NavigationProp<ProfileNavigatorParamList>>()
  useFocusEffect(useCallback(() => {
    navigation.navigate('default')
  }, []))
  return (
    <ProfileStack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      initialRouteName="default"
    >
      <ProfileStack.Screen name="default" component={ProfileScreen} />
      <ProfileStack.Screen name="Terms" component={TermsScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigatorStack;
