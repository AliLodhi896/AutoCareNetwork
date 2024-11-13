import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import PushNotificationHistory from "./push-notification"
import SavedForLater from "./saved-for-later-notifs"

const Tab = createMaterialTopTabNavigator()
export const PushNotification = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PushNotification" component={PushNotificationHistory} />
      <Tab.Screen name="SavedForLater" component={SavedForLater} />
    </Tab.Navigator>
  )
}
