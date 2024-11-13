import Intercom, { Visibility } from "@intercom/intercom-react-native"
import { Platform } from "react-native"

class InterComService {
  loadIntercom(email?: string) {
    const padding = Platform.select({
      ios: 30,
      android: 120,
    })
    if (email) {
      Intercom.registerIdentifiedUser({ userId: email, email })
    } else {
      Intercom.registerUnidentifiedUser()
    }
    Intercom.setBottomPadding(padding || 0)
    Intercom.setLauncherVisibility(Visibility.GONE)
  }
  logout() {
    Intercom.logout()
    Intercom.registerUnidentifiedUser()
    Intercom.setLauncherVisibility("VISIBLE")
  }
  updateProfile(user) {
    Intercom.updateUser(user)
  }
}

export default new InterComService();
