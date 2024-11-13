import React, { FC } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { WebView } from "react-native-webview";
import { Layout } from "../../../components/washub/layout";

export const BrowserScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "browserScreen">
> = ({ route }) => {
  const { url } = route.params;

  return (
    <Layout hasContainer={false}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: url,
          }}
          style={{ flex: 1 }}
        />
      </View>
    </Layout>
  );
};
