import { WashubPNService } from "../../../shared/services/notifications.service"
import { navigate } from "../navigators"
import appInitObserver from "../observers/app-init.observer"
import notificationsObserver from "../observers/notifications.observer"
import WashubClient from "./api/api"
export * from "../../../shared/services/notifications.service"

export default new WashubPNService(
  WashubClient,
  notificationsObserver,
  navigate,
  appInitObserver
)
