import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SettingsScreen } from "./settings-screen";
import { EditProfileScreen } from "../edit-profile/edit-profile-screen";
import { PushNotificationsSettingsScreen } from "../push-notifications-settings/push-notifications-settings-screen";
import { MyMemberNumbersScreen } from "../my-member-numbers/my-member-numbers-screen";

export type SettingsNavigatorParamList = {
	pushNotificationsSettings: undefined;
	myMemberNumbers: undefined;
	editProfile: undefined;
  index: undefined;

	// 🔥 Your screens go here
};
const SettingsStack = createNativeStackNavigator<SettingsNavigatorParamList>();

const SettingsNavigatorStack = () => {
	return (
		<SettingsStack.Navigator
			screenOptions={{
				gestureEnabled: false,
				headerShown: false,
			}}
			initialRouteName="index"
		>

			<SettingsStack.Screen name="index" component={SettingsScreen} />
			<SettingsStack.Screen
				name="pushNotificationsSettings"
				component={PushNotificationsSettingsScreen}
			/>
			<SettingsStack.Screen name="myMemberNumbers" component={MyMemberNumbersScreen} />
			<SettingsStack.Screen name="editProfile" component={EditProfileScreen} />
			{/** 🔥 Your screens go here */}
		</SettingsStack.Navigator>
	);
};

export default SettingsNavigatorStack;
