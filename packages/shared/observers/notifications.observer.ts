import { Notification } from "../services/notifications.service"
export class NotificationsObserver {
  private _listeners: Array<Function> = []
  private _notifications: Notification[] = []
  set listener(listFun: Function) {
    this._listeners.push(listFun)
  }
  set notifications(notifications: Notification[]) {
    this._notifications.push(...notifications)
    this._listeners.forEach(
      async (listener, index) =>
        await listener(notifications, () => {
          this._listeners.splice(index, 1)
        })
    )
  }
  get notifications() {
    return this._notifications
  }
}

