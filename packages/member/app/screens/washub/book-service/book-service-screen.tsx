import React, { FC, useEffect, useState } from "react";
import { Text } from "../../../../../shared/components";
import { StackScreenProps } from "@react-navigation/stack";
import { Layout } from "../../../components/washub/layout";
import { useAppState } from "../../../context/app-state-context";
import { TabNavigatorParamList } from "../../../navigators/tab-bar";
import { View } from "react-native";
import { styles } from "./book-service.style";
import WebView from "react-native-webview";
import { getCardBookServiceUrl } from "../../../utils/common";

export const BookServiceScreen: FC<
  StackScreenProps<TabNavigatorParamList, "bookService">
> = ({ route, navigation }) => {
  const { appState } = useAppState();
  const card = appState.selectedCard;
  let cards = appState.registeredCard;

  const [bookServiceLink, setBookServiceLink] = useState<string>("");
console.log('bookServiceLink',bookServiceLink)
  useEffect(() => {
    return () => {
      setBookServiceLink("");
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      let bookServiceUrl = "";
      if (card) {
        bookServiceUrl = getCardBookServiceUrl(card == null ? cards : card);
      }
      setBookServiceLink(bookServiceUrl);
    });
    return unsubscribe;
  }, [navigation, card]);

  return (
    <Layout hasContainer={bookServiceLink === "" ? true : false}>
      <View style={{ flex: 1 }}>
        {bookServiceLink !== "" ? (
          <WebView
            source={{
              uri: bookServiceLink,
            }}
            style={{ flex: 1 }}
          />
        ) : (
          <>
            <View style={{ flex: 2 }} />
            <View style={[styles.container, { flex: 8 }]}>
              <Text text="No Service found" style={styles.emtpyList} />
            </View>
            <View style={{ flex: 2 }} />
          </>
        )}
      </View>
    </Layout>
  );
};
