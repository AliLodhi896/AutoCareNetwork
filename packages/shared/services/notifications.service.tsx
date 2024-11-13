import AsyncStorage from "@react-native-async-storage/async-storage"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { Platform } from "react-native"
import PushNotification, { Importance } from "react-native-push-notification"
import { NOTIFICATIONS_STORAGE_KEY } from "../contexts/notifications-contexts"
import { NotificationsObserver } from "../observers/notifications.observer"
import dayjs from "dayjs"
import { Api } from "./api"
import { AppInitObserver } from "../observers/app-init.observer"
type NavigateFunc = (route: string, params: any) => void

export const DEFAULT_CHANNEL_ID = "rn-push-notification-channel'"
export class WashubPNService {
  constructor(client: Api, notificationsObserver: NotificationsObserver, navigate: NavigateFunc , appInitObserver: AppInitObserver, handlerScreen = "default") {
    this.client = client
    this.notificationsObserver = notificationsObserver
    this.navigate = navigate
    this.appInitObserver = appInitObserver
    this.handlerScreen = handlerScreen
  }
  appInitObserver: AppInitObserver
  client: Api
  handlerScreen: string
  notificationsObserver: NotificationsObserver
  navigate: NavigateFunc 
  token: string
  async savePushToken(pushToken: string) {
    this.token = pushToken
    const platform = Platform.select<"APNS" | "FCM">({
      ios: "APNS",
      default: "FCM",
    })

    if (!platform) {
      return
    }
    return await this.client.registerPushNotifications(pushToken)
  }
  createPushNotificationChannel() {
    PushNotification.channelExists(DEFAULT_CHANNEL_ID, (exists) => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: DEFAULT_CHANNEL_ID, // (required)
            channelName: "Washub Notification Channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          (created) => console.log(`createChannel returned '${created}'`)
        ) // (optional) callback returns whether the channel was created, false means it already existed.
      }
    })
  }
  getInitialNotifications() {
    PushNotification.getDeliveredNotifications(
      (notifications: Notification[]) => {
        PushNotification.removeAllDeliveredNotifications()
      }
    )
  }
  async pushNotification(...notification: Notification[]) {
    const notificationsString = await AsyncStorage.getItem(
      NOTIFICATIONS_STORAGE_KEY
    )
    let notifications = JSON.parse(notificationsString as string)?.notifications
    if (notifications.length > 0) {
      notifications.unshift(...notification)
    } else {
      notifications = [...notification]
    }

    await AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify({ notifications })
    )
    this.notificationsObserver.notifications = notification
  }
  async scheduleLocalNotification({
    channelId,
    message,
    date,
    userInfo,
  }: {
    channelId: string
    message: string
    date: Date
    userInfo: any
  }) {
    return await PushNotification.localNotificationSchedule({
      channelId,
      message,
      date,
      allowWhileIdle: false,
      userInfo: { ...userInfo },
    })
  }
  handleNotification = async (notification: Notification) => {
    const messageId = this.getNotificationPayloadKey(notification, "message-id")
    if (messageId) {
      notification.id = messageId
    }
    if (!notification.date) {
      notification.date = new Date(dayjs().format())
    }

    if (!notification.id) {
      // calculate a notification id from the date
      let timeID = new Date().getTime()
      timeID = new Date(notification.date).getTime()

      notification.id = `${timeID}`
    }
    if (notification.userInteraction) {
      const route = this.getNotificationPayloadKey(notification, "route")
      const navigatePayload = this.getNotificationPayloadKey(
        notification,
        "navigate"
      )
      if (route === "custom_message") {
        const endpoint = this.getNotificationPayloadKey(
          notification,
          "endpoint"
        )
        this.navigate(this.handlerScreen, {
          custom_message_endpoint: endpoint,
        })
      } else if (navigatePayload) {
        this.navigate(navigatePayload.route, navigatePayload.params)
      }
    }
    const message =
      this.getNotificationPayloadKey(notification, "message_content") ||
      this.getNotificationPayloadKey(notification, "message")
    const title = notification.title || "Washub"
    const notifId = notification.data?.message_id || notification.id
    if (!notification.userInteraction) {
      // save notification to local
      notification.isRead = false
      await this.pushNotification(notification)
      //Show notification android
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: DEFAULT_CHANNEL_ID, // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: "Washub Notification Ticket", // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        //largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: message, // (optional) default: "message" prop
        subText: "", // (optional) default: none
        bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        //bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: notifId, // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

        //actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        category: "", // (optional) default: empty string
        subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

        /* iOS and Android properties */
        //id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: title, // (optional)
        message: message, // (required)
        //picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
        userInfo: notification.data || {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: parseInt(notification.data.badge, 10), // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      })
    }

    notification?.finish?.(PushNotificationIOS.FetchResult.NoData)
  }
  addNotificationListener() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async (token) => {
        this.createPushNotificationChannel()
        this.appInitObserver.listener = async (
          started: boolean,
          unSubscribe?: Function
        ) => {
          if (started) {
            await this.client.registerPushNotifications(token.token)
          }
          unSubscribe?.()
        }
        await this.getInitialNotifications()
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async (notification: Notification) => {
        await this.handleNotification(notification)
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: (notification: Notification) => {
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: (err) => {
        console.error(err.message, err)
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
      ignoreInForeground: true,
    })
    PushNotification.popInitialNotification((notification) => {
      if (notification) {
        //hack to work around: https://github.com/react-native-push-notification-ios/push-notification-ios/pull/245
        this.handleNotification(notification)
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      }
    })
  }
  async resetBadgeCount() {
    await this.client.resetBadgeCount()
    await PushNotification.setApplicationIconBadgeNumber(0)
  }

  getNotificationPayloadKey(notification: any, key: string) {
    const data = notification.data ?? {}
    return data[key] || notification[key]
  }

  async setup() {
    this.addNotificationListener()
  }
}

export interface Notification {
  isRead?: boolean
  id?: string
  identifier?: string
  date?: Date
  title?: string
  body?: string
  userInteraction?: boolean
  data?: any
  foreground?: boolean
  isSavedForLater?: boolean
  action?: any
  finish?(result: PushNotification.FetchResult): void
}

