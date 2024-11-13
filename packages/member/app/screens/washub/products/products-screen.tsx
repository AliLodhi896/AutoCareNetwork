import React, { useCallback, FC, useEffect, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Text } from "../../../../../shared/components";

import { styles } from "./products-screen.style";

import { Product } from "../../../../../shared/services/api";
import { HomeNavigatorParamList } from "../home/home-stack";
import { FlatList } from "react-native-gesture-handler";
import {
  ActionType,
  ProductItem,
} from "../../../components/washub/product-item/product-item";
import { Layout } from "../../../components/washub/layout";
import { useAppState } from "../../../context/app-state-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';
import storage from "../../../../../shared/services/storage";

export const ProductsScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "products">
> = ({ navigation, route }) => {
  const { appState } = useAppState();
  const navigations = useNavigation();
  XMLHttpRequest
  const [cardData, setCardData] = React.useState(null)
  const [products, setProducts] = useState<Product[]>([]);
  let card = appState.selectedCard;

  console.log('card,,,,',card?.Products[1])

  const getCard = async () => {

    if(card !== null){
  console.log('if runing')

      const bookServices = card.Products.filter(
        (p) => p.Actions.indexOf(ActionType.BookService) === 0
      );
      const fileClaims = card.Products.filter(
        (p) => p.Actions.indexOf(ActionType.FileClaim) === 0
      );
      setProducts([...bookServices, ...fileClaims]);
    }else{
  console.log('else runing')
      
      const primaryCard = await storage.getItem('registeredCard');
      setCardData(primaryCard?.cards[0])
      const bookServices = cardData.Products.filter(
        (p) => p.Actions.indexOf(ActionType.BookService) === 0
      );
      const fileClaims = cardData.Products.filter(
        (p) => p.Actions.indexOf(ActionType.FileClaim) === 0
      );
      setProducts([...bookServices, ...fileClaims]);
    }
  }

  useEffect(() => {
    getCard()
  }, [card]);

  const productAnalytics = async () => {
    try {
      if (card?.Products?.length !== 0) {
        const items = card?.Products?.map(item => ({
          item_brand: card?.DealerName + ' ' + card?.DealerId,
          item_name: item?.ProductName,
          item_id: item?.DealerProductId,
          location_id: card?.DealerAddress,
          affiliation: card?.DealerName + ' ' + card?.DealerId,
        }));
        await analytics().logEvent('view_item_list', {
          item_list_id: 'products_servicecs',
          item_list_name: 'Products and Services',
          items: items
        })
      }
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }


  const scrreenView =  async () => {

    await analytics().logEvent('screen_view', {
      screen_name: 'Product And Services',
    });
  }

  useFocusEffect(
    useCallback(() => {
      productAnalytics()
      scrreenView()
    }, []),
  );


  return (
    <Layout>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={card?.Products}
        renderItem={({ item }: { item: Product }) => (
          <ProductItem product={item} card={card} />
        )}
        keyExtractor={({ item }: { item: Product }, key) => key.toString()}
        ListHeaderComponent={
          <Text style={styles.title}>Products & Service</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.emtpyList} text="No Products found" />
        )}
      />
      <Button
        preset="primary"
        testID="login-button"
        style={styles.loginBtn}
        textStyle={styles.loginBtnText}
        loaderColor="#FFFFFF"
        text="Book Service"
        onPress={() => {
          // WFormRef.current.submit();
          navigations.navigate("bookService");
        }}
      />
    </Layout>
  );
};