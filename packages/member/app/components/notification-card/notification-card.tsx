import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./notification-card.style";
import { color, fontsize } from "../../../../shared/theme";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { NotificationCardProps } from "./notification-card.props";
import { translate } from "../../i18n";
import { useNotifications } from "../../../../shared/contexts/notifications-contexts";
import useModal from "../../../../shared/contexts/modal/useModal";
// import { MessageComponent } from "../../screens";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";
dayjs.extend(relativeTime);

export const NotificationCard = (props: NotificationCardProps) => {
  const { notification } = props;
  const notif = useNotifications();
  const saveForLater = () => {
    notif.moveToSavedForLater({ id: notification.id });
  };
  const modal = useModal();
  const openMessage = (customMessage) => {
    modal.showModal(
      <View>
        <Text>Message component screen</Text>
      </View>,
      // <MessageComponent customMessage={customMessage} dontNavigate />,
      {
        onHide: () => {},
      }
    );
  };
  const deleteNotification = () => {
    Alert.alert(
      "Deleting notification",
      "Are you sure you want to delete this notification",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: () => {
            notif.deleteNotification({ id: notification.id });
          },
        },
      ]
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (notification.customMessage) {
          openMessage(notification.customMessage);
        }
        notif.markAsRead({ id: notification.id });
      }}
      style={styles.container}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text
          style={[
            styles.content,
            { fontWeight: notification.isRead ? "400" : "bold" },
          ]}
        >
          {notification.content}
        </Text>
        <Text style={styles.date}>
          {/* {notification.date}  */}
          {dayjs(notification.date).fromNow()}
        </Text>
      </View>

      <Menu
        onSelect={(value) => alert(`Selected number: ${value}`)}
        style={styles.rightContainer}
      >
        <MenuTrigger>
          <View style={styles.seeMoreIconContainer}>
            <VIcon
              family="MaterialIcons"
              name="more-vert"
              color={color.palette.black}
              size={fontsize.medium}
            />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOptions}>
          <MenuOption
            onSelect={saveForLater}
            value={1}
            style={styles.menuOption}
          >
            <VIcon
              family="FontAwesome"
              name="heart-o"
              color={"green"}
              size={fontsize.small}
            />
            <Text style={styles.saveLaterText}>
              {translate("notificationsScreen.saveForLater")}
            </Text>
          </MenuOption>
          <MenuOption
            onSelect={deleteNotification}
            value={2}
            style={styles.menuOption}
          >
            <VIcon
              family="FontAwesome"
              name="trash-o"
              color={color.palette.red}
              size={fontsize.small}
            />
            <Text style={styles.deleteText}>{translate("common.delete")}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};
