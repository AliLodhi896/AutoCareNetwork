/**
 * The app navigator (formerly "AppStack" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
 import React from "react";
 import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
 import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
 import { NotificationsProvider } from "../../../shared/contexts/notifications-contexts";
 import { AppStateContextProvider } from "../context/app-state-context";
import HomeScreen from "../screens/home-screen/home-screen";
import { SettingsScreen } from "../screens/settings-screen/settings-screen";
import LoadingScreen from "../../../shared/screens/loading-screen/loading-screen";
import appInitObserver from "../observers/app-init.observer";
import  WashubClient  from "../services/api/api";
import { AuthStateContextProvider, useAuthState } from "../../../shared/contexts/auth-state-context";
import { LoginScreen } from "../screens/login-screen/login-screen";
import { SignUpScreen } from "../screens/signup-screen/signup-screen";
import StationScreen from "../screens/station-screen/station-screen";
import { Station } from "../types";
import { PasswordChangeScreen } from "../screens/password-change-screen/password-change-screen";

import { DashboardScreen } from "../screens/dashboard/dashboard.screen"
import { PushSettingsScreen } from "../screens/push-settings-screen/push-settings-screen";
import { TaxInfoScreen } from "../screens/tax-info-screen/tax-info-screen";
import notificationsObserver from "../observers/notifications.observer"
import { ValidateWashScreen } from "../screens/validate-wash/validate-wash-screen";
 
 export type NavigatorParamList = {
   login: undefined;
   signup: {
    stationId?: string;
    station?: Station;
   };
   editProfile:{
    stationId?: string;
    station?: Station;
   };
   dashboard: undefined;
   home: undefined;
   loginSelectStation: undefined;
   passwordChangeScreen: undefined;
   scanner:{
    testWash?: boolean;
   };
   settings: undefined;
   pushSettings: undefined;
   taxInfo: undefined;
   validateWash: undefined;
 };
 
 const Stack = createNativeStackNavigator<NavigatorParamList>();
 
 export const AppStack = () => {
   const { authState } = useAuthState();

   if (authState.token === undefined){
    return <LoadingScreen />;
   }
   const screens = authState.token ? (
     <>
       <Stack.Screen name="home" component={HomeScreen} />
       <Stack.Screen name="dashboard" component={DashboardScreen} />
       <Stack.Screen name="settings" component={SettingsScreen} />
       <Stack.Screen name="loginSelectStation" component={StationScreen} />
       <Stack.Screen
         name="passwordChangeScreen"
         component={PasswordChangeScreen}
       />
       <Stack.Screen name="editProfile" component={SignUpScreen} />
       <Stack.Screen name="pushSettings" component={PushSettingsScreen} />
       <Stack.Screen name="taxInfo" component={TaxInfoScreen} />
       <Stack.Screen name="validateWash" component={ValidateWashScreen} />
     </>
   ) : (
     <>
       <Stack.Screen name="login" component={LoginScreen} />
       <Stack.Screen name="signup" component={SignUpScreen} />
     </>
   )
 
   return (
     <NavigationContainer
       onReady={() => {
         appInitObserver.isInitialized = true
       }}
       ref={navigationRef}
     >
       <Stack.Navigator
         screenOptions={{
           gestureEnabled: false,
           headerShown: false,
         }}
       >
         {screens}
       </Stack.Navigator>
     </NavigationContainer>
   )
 };
 
 interface NavigationProps
   extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
 
 export const AppNavigator = (props: NavigationProps) => {
   useBackButtonHandler(canExit);
 
   return (
     <AuthStateContextProvider  client={WashubClient}>
       <AppStateContextProvider client={WashubClient}>
         <NotificationsProvider observer={notificationsObserver}>
           <AppStack />
         </NotificationsProvider>
       </AppStateContextProvider>
     </AuthStateContextProvider>
   );
 };
 

 const exitRoutes = ["home"];
 export const canExit = (routeName: string) => exitRoutes.includes(routeName);
 
 AppNavigator.displayName = "AppNavigator";

 
