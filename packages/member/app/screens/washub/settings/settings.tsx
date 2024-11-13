import React, { FC, useCallback, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Layout } from "../../../components/washub/layout";
import { useAppState } from "../../../context/app-state-context";
import { Loader } from "../../../components/washub/loader/loader";
import { Pressable, View } from "react-native";
import { Text } from "../../../../../shared/components";
import { TabNavigatorParamList } from "../../../navigators/tab-bar";
import SettingsMain from "../../../components/washub/settings/settings-main";
import SettingsContact from "../../../components/washub/settings/settings-contact";
import SettingsDelete from "../../../components/washub/settings/settings-delete";
import { styles } from "./settings.styles";
import { ScrollView } from "react-native-gesture-handler";

export enum ScreenItems {
  MAIN = "main",
  CONTACT = "contact",
  DELETE = "delete",
}
const SettingsScreen: FC<
  StackScreenProps<TabNavigatorParamList, "settings">
> = ({ navigation, route }) => {
  const [activeItem, setActiveItem] = useState(ScreenItems.MAIN);

  const renderComponent = useCallback(() => {
    switch (activeItem) {
      case ScreenItems.CONTACT:
        return <SettingsContact />;
      case ScreenItems.DELETE:
        return <SettingsDelete handleActiveItem={setActiveItem} />;
      case ScreenItems.MAIN:
      default:
        return <SettingsMain handleActiveItem={setActiveItem} />;
    }
  }, [activeItem]);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          {activeItem !== ScreenItems.MAIN && (
            <Pressable
              onPress={() => setActiveItem(ScreenItems.MAIN)}
              style={styles.backContainer}
            >
              <Text
                style={{ ...styles.backButton, ...styles.backButtonXS }}
                text="<"
              />
              <Text style={styles.backButton} text="BACK" />
            </Pressable>
          )}
        </View>

        <View style={{ flex: 8 }}>{renderComponent()}</View>
        <View style={{ flex: 1 }} />
      </ScrollView>
    </Layout>
  );
};

export default SettingsScreen;
