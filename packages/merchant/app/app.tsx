/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
 import "./i18n";
 import "./utils/ignore-warnings";
 import React, { useEffect } from "react";
 import { initFonts } from "../../shared/theme/fonts"; // expo
 import * as storage from "./utils/storage";
 import { AppNavigator, useNavigationPersistence } from "./navigators";
 import { ToggleStorybook } from "../storybook/toggle-storybook";
 import { ModalProvider } from "../../shared/contexts/modal/modal.context";
 import { MenuProvider } from "react-native-popup-menu";
 import RNBootSplash from "react-native-bootsplash";
 import { StatusBar } from "react-native";
import { ErrorBoundary } from "./screens";
import { WashubToast } from "./components/custom-toast/custom-toast";
import { appName } from "./services/api";
 
 // This puts screens in a native ViewController or Activity. If you want fully native
 // stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
 // https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
 
 export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";
 appName.name = "merchant";
 /**
  * This is the root component of our app.
  */
 function App() {
   const {
     isRestored: isNavigationStateRestored,
   } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
 
   // Kick off initial async loading actions, like loading fonts and RootStore
   useEffect(() => {
     (async () => {
       await initFonts(); // expo
     })();
   }, []);
 
   useEffect(() => {
     RNBootSplash.hide({ fade: true });
   }, []);
 
   // Before we show the app, we have to wait for our state to be ready.
   // In the meantime, don't render anything. This will be the background
   // color set in native by rootView's background color.
   // In iOS: application:didFinishLaunchingWithOptions:
   // In Android: https://stackoverflow.com/a/45838109/204044
   // You can replace with your own loading component if you wish.
   if (!isNavigationStateRestored) return null;
   console.warn('isNavigation', isNavigationStateRestored)
 
   // otherwise, we're ready to render the app
   return (
     <ToggleStorybook>
       <StatusBar barStyle={"dark-content"} translucent={true} />
       <MenuProvider>
         <ModalProvider>
           <ErrorBoundary catchErrors={"always"}>
             <AppNavigator/>
             <WashubToast />
           </ErrorBoundary>
         </ModalProvider>
       </MenuProvider>
     </ToggleStorybook>
   );
 }
 
 export default App;
 