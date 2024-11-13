import "./i18n";
import "./utils/ignore-warnings";
import React, { useEffect, useState } from "react";
import { initFonts } from "../../shared/theme/fonts"; // expo


import { Linking } from 'react-native';


import * as storage from "./utils/storage";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import { ErrorBoundary } from "./screens/error/error-boundary";
import { ModalProvider } from "../../shared/contexts/modal/modal.context";
import { MenuProvider } from "react-native-popup-menu";
import RNBootSplash from "react-native-bootsplash";
import { StatusBar } from "react-native";
import { appName } from "./services/api";
import { SPlashView } from "../../shared/components";
import analytics from "@react-native-firebase/analytics";
import PushNotification from "react-native-push-notification";
import PermissionPopup from "./components/washub/permission-popup/permission-popup";
import PermissionPopupNotAllowed from "./components/washub/permission-popup/permission-popup-notallowed";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";
appName.name = "member";

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [reloadCount, setReloadCount] = useState(0);
  const [isPushNotification, setIsPushNotification] = useState(true);
  const [isPushNotificationNotAllowed, setIsPushNotificationNotAllowed] = useState(true);
  
  useEffect(() => {
    // Set a custom device name for the simulator
    analytics().setUserProperty('device_name', 'Ali Iphone');
  }, []);

  useEffect(() => {
    (async () => {
      await initFonts(); // expo
    })();
  }, []);



  const checkNotificationPermission = async () => {
    PushNotification.checkPermissions((permission) => {
      const {
        alert,
        badge,
        critical,
        lockScreen,
        notificationCenter,
        sound,
      } = permission;
      setIsPushNotification(
        alert || badge || critical || lockScreen || notificationCenter || sound
      );
    });
  };

  useEffect(() => {
    if (reloadCount < 2) {
      // Perform your reloading logic here
      checkNotificationPermission();
      scrreenView();
      RNBootSplash.hide({ fade: true });

      // Increment the reload count
      setReloadCount((prevCount) => prevCount + 1);
    }
  }, [reloadCount]);

  const scrreenView = async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Splash Screen',
    });
  }

  if (!isNavigationStateRestored) return null;

  return (
    <GestureHandlerRootView>
      <StatusBar barStyle={"dark-content"} translucent={true} />
      <SPlashView>
        <MenuProvider>
          <ModalProvider>
            <ErrorBoundary catchErrors={"always"}>
              <PermissionPopup
                modalVisible={!isPushNotification}
                setModalVisible={() => {setIsPushNotification(true),setIsPushNotificationNotAllowed(false)}}
                onPress={() => { setIsPushNotification(true), Linking.openSettings() }}
                text={'This app would like to send push notifications so your dealer can alert you about specials and discounts for your automobile '}
                textBottom={'To access dealer specials for app users, turn on push notifications under settings'}
              />
              <PermissionPopupNotAllowed
                modalVisible={!isPushNotificationNotAllowed}
                setModalVisible={() => setIsPushNotificationNotAllowed(true)}
                onPress={() => { setIsPushNotificationNotAllowed(true)}}
                text={'To access dealer specials for app users, turn on push notifications under settings'}
              />
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </ErrorBoundary>
          </ModalProvider>
        </MenuProvider>
      </SPlashView>
    </GestureHandlerRootView>
  );
}

export default App;
