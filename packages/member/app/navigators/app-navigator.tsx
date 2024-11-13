import React from "react";
import TabsView from "./tab-bar";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useBackButtonHandler } from "./navigation-utilities";
import { color } from "../../../shared/theme";
import appInitObserver from "../observers/app-init.observer";
import {
  AuthStateContextProvider,
  useAuthState,
} from "../../../shared/contexts/auth-state-context";
import {
  AppStateContextProvider,
  useAppState,
} from "../context/app-state-context";
import WashubClient from "../services/api/api";
import LoadingScreen from "../../../shared/screens/loading-screen/loading-screen";
import { ProfileDrawer } from "../components/washub/profile/profile-drawer";
import { normalize } from "../../../shared/utils/normalize";
import { RdeemFlowContextProvider } from "../context/redeem-context";
import { LoginScreen } from "../screens/washub/login/login-screen";
import { ContactScreen } from "../screens/washub/contact-screen/contact-screen";
import { SignUpScreen } from "../screens/washub/signup/signup-screen";
import {
  ISingupProviderParams,
  SignUpProviderScreen,
} from "../screens/washub/signup/signup-provider-screen";

export type NavigatorParamList = {
  account: undefined;
  login: undefined;
  signup: undefined;
  signupProvider: ISingupProviderParams;
  contact: undefined;
  tabs: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();
const Drawer = createDrawerNavigator();

function AccountNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: "right",
        drawerStyle: {
          width: normalize(365),
          opacity: 0.9,
          backgroundColor: color.palette.white,
        },
      }}
      drawerContent={(props) => <ProfileDrawer {...props} />}
    >
      <Stack.Screen name="tabs" options={{ header: () => null, title: "" }} component={TabsView} />
    </Drawer.Navigator>
  );
}

export const AppStack = () => {
  const { authState } = useAuthState();
  const { appState } = useAppState();

  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationContainerRef<NavigatorParamList>|null>(null);

  if (authState.token === undefined || appState.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        appInitObserver.isInitialized = true;
        if (navigationRef.current && navigationRef.current) {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        if (navigationRef.current && navigationRef.current) {
          const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            // await analytics().logScreenView({
            //   screen_name: currentRouteName,
            //   screen_class: currentRouteName,
            // });
          }
          routeNameRef.current = currentRouteName;
        }
      }}
    >
      <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
        {authState.token ? (
          <Stack.Group>
            <Stack.Screen name="account" component={AccountNavigator} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen
              name="signupProvider"
              component={SignUpProviderScreen}
            />
            <Stack.Screen name="contact" component={ContactScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler(canExit);

  return (
    <AuthStateContextProvider client={WashubClient}>
      <AppStateContextProvider client={WashubClient}>
        <RdeemFlowContextProvider>
          <AppStack />
        </RdeemFlowContextProvider>
      </AppStateContextProvider>
    </AuthStateContextProvider>
  );
};

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.Anything not on this
 * list will be a standard `back` action in react-navigation.
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["tabs"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);

AppNavigator.displayName = "AppNavigator";
