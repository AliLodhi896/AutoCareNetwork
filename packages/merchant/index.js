/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from "./app/app.tsx"
import { name as appName } from './app.json'
import washubPNService from './app/services/notification.service'
// Must be outside of any component LifeCycle (such as `componentDidMount`).
washubPNService.setup()
AppRegistry.registerComponent(appName, () => App)
