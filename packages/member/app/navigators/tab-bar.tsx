import React, { useEffect } from "react";
import { TouchableOpacity, View, Platform } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { fontsize, spacings } from "../../../shared/theme";
import HomeNavigatorStack from "../screens/washub/home/home-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeIcons } from "../../../shared/components/svg/home-icons";
import { Text } from "../../../shared/components";
import { BookServiceScreen } from "../screens/washub/book-service/book-service-screen";
import SettingsScreen from "../screens/washub/settings/settings";
import { normalize } from "../../../shared/utils/normalize";
import { getCardBookServiceUrl, isAndroidFontLargest } from "../utils/common";
import { useAppState } from "../context/app-state-context";
import { useAuthState } from "../../../shared/contexts/auth-state-context";
import Intercom from "@intercom/intercom-react-native";

export type TabNavigatorParamList = {
  home: undefined;
  bookService: undefined;
  settings: undefined;
  chat: undefined;
  editStation: undefined;
};
export const TAB_BAR_HEIGHT = {
  android: isAndroidFontLargest() ? 110 : 80,
  ios: 70,
};
const isIOS = Platform.OS === "ios";
enum ROUTES_NAMES {
  HOME = "home",
  BOOK_SERVICE = "bookService",
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { appState } = useAppState();

  const routes: React.ReactElement[] = [];

  state.routes.forEach((route, index) => {
    const { options } = descriptors[route.key];
    const width = route.name === ROUTES_NAMES.HOME ? { width: 40 } : {};

    const label = options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;

    const onPress = () => {
      if (route.name === ROUTES_NAMES.BOOK_SERVICE &&
        appState.selectedCard &&
        getCardBookServiceUrl(appState.selectedCard) === "") {
        return;
      }
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        if (route.name === ROUTES_NAMES.HOME) {
          navigation.navigate("home", { screen: "default" });
        } else {
          navigation.navigate({ name: route.name, params: route.params, merge: true });
        }
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    routes.push(
      <TouchableOpacity
        accessibilityRole="button"
        key={index.toString()}
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: spacings.mediumOne,
        }}
      >
        <HomeIcons
          fill={isFocused ? "rgba(255, 255, 255, 1)" : "rgba(0, 188, 255, 0.5)"}
          type={route.name as Parameters<typeof HomeIcons>[0]["type"]}
          {...width} />

        <Text
          style={{
            color: isFocused ? "white" : "rgb(0, 188, 255)",
            fontSize: fontsize["tiny-"],
            marginTop: spacings.tiny,
          }}
        >
          {typeof label === "string" ? label : ""}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <View
      style={{
        display: "flex",
        height: normalize(
          isIOS ? TAB_BAR_HEIGHT.ios + insets.bottom : TAB_BAR_HEIGHT.android
        ),
        backgroundColor: "#1B588A",
        borderTopWidth: 0,
        borderRadius: 0,
        flexDirection: "row",
        paddingHorizontal: normalize(20),
      }}
    >
      {routes}
    </View>
  );
}
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export default function TabsView() {
  const { authState } = useAuthState();

  useEffect(() => {
    if (authState.profile?.Email) {
      Intercom.registerIdentifiedUser({email: authState.profile.Email});
      return;
    }
    Intercom.registerUnidentifiedUser();
  }, [authState.profile?.Email]);

  return (
    <Tab.Navigator
      initialRouteName={ROUTES_NAMES.HOME}
      tabBar={(props) => (
          <TabBar {...props} />
      )}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={ROUTES_NAMES.HOME}
        component={HomeNavigatorStack}
        options={{ tabBarLabel: "Home" }}
      />

      <Tab.Screen
        name={'bookService'}
        component={BookServiceScreen}
        options={{
          tabBarLabel: "Book Service",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ tabBarLabel: "Settings", unmountOnBlur: true }}
      />

      <Tab.Screen
        name="chat"
        listeners={{
          tabPress(e) {
            e.preventDefault();
            Intercom.displayMessenger();
          }
        }}
        options={{ tabBarLabel: "Chat Help", }}
        component={EmptyComponent}
      />     
    </Tab.Navigator>
  );
}

function EmptyComponent() {
  return <></>;
}
