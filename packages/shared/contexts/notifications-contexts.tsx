import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { Notification } from "../services/notifications.service"
import { NotificationsObserver } from "../observers/notifications.observer"
export const NOTIFICATIONS_STORAGE_KEY = "notifications";

export interface NotificationsContextProps {
  data: {
    notifications: Notification[];
  };
  setNotifications: (notifications: Notification[]) => void;
  moveToSavedForLater: (notification: Notification) => void;
  removeFromSavedForLater: (notification: Notification) => void;
  markAsRead: (notification: Notification) => void;
  deleteNotification: (notification: Notification) => void;
}

const defaultNotificationsContext: NotificationsContextProps = {
  data: {
    notifications: [],
  },
  setNotifications: () => null,
  moveToSavedForLater: () => null,
  removeFromSavedForLater: () => null,
  markAsRead: () => null,
  deleteNotification: () => null,
};
const NotificationsContext = createContext<NotificationsContextProps>(
  defaultNotificationsContext
);

export const NotificationsProvider = ({ children, observer }: {children: React.ReactElement; observer: NotificationsObserver}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    let unsubscribe = null;
    observer.listener = (
      notifications: Notification[],
      unsubscribeFunc?: Function
    ) => {
      setNotifications((previousNotifs) => [
        ...notifications,
        ...previousNotifs,
      ]);
      unsubscribe = unsubscribeFunc;
    };
    const initNotificationStore = async () => {
      const data = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        setNotifications(parsedData.notifications);
      }
    };

    initNotificationStore();
    return () => unsubscribe?.();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify({ notifications })
    );
  }, [notifications]);

  const updateNotifications = (notifications: Notification[]) => {
    setNotifications(notifications);
  };

  const changeSavedForLater = (
    newNotification: Notification,
    newValue: boolean
  ) => {
    const newNotifications = [...notifications];
    newNotifications.forEach((notification) => {
      if (notification.id === newNotification.id) {
        notification.isSavedForLater = newValue;
      }
    });
    updateNotifications(newNotifications);
  };

  const moveToSavedForLater = async (notification: Notification) => {
    changeSavedForLater(notification, true);
  };

  const removeFromSavedForLater = async (notification: Notification) => {
    changeSavedForLater(notification, false);
  };
  const markAsRead = async (newNotification: Notification) => {
    const newNotifications = [...notifications];
    newNotifications.forEach((notification) => {
      if (notification.id === newNotification.id) {
        notification.isRead = true;
      }
    });
    updateNotifications(newNotifications);
  };

  const deleteNotification = async (newNotification: Notification) => {
    const newNotifications = notifications.filter(
      (ele) => ele.id !== newNotification.id
    );
    updateNotifications(newNotifications);
  };

  return (
    <NotificationsContext.Provider
      value={{
        data: {
          notifications,
        },
        setNotifications: updateNotifications,
        moveToSavedForLater,
        removeFromSavedForLater,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};
