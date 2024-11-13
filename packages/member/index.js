/**
 * @format
 */
import "react-native-reanimated";

import { AppRegistry } from "react-native";
import App from "./app/app.tsx";
import { name as appName } from "./app.json";
import washubPNService from "./app/services/notification.service";
// import {EverwashSDK} from "@everwash/everwash-sdk-qrcode";
import { EverwashSDKStyles } from "./app/screens/redeem-screen/EverwashSDKStyles";
import analytics from '@react-native-firebase/analytics';


// Must be outside of any component LifeCycle (such as `componentDidMount`).
washubPNService.setup();



// const everwashSDK = EverwashSDK.getInstance();
// everwashSDK.config = {
//   baseURL: "https://api-qa.everwash.com/2/_ig",
//   partnerProgram: "acn",
//   activityIndicatorColor: EverwashSDKStyles.activityIndicatorColor,
//   buttonStyle: EverwashSDKStyles.buttonStyle,
//   buttonTextStyle: EverwashSDKStyles.buttonTextStyle,
//   textStyle: EverwashSDKStyles.textStyle
// };
AppRegistry.registerComponent(appName, () => App);
