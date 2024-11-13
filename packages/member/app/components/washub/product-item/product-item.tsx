import React, { useCallback } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View } from "react-native";
import { styles } from "./product-item.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, Product } from "../../../../../shared/services/api";
import { CircleActionButton } from "../circle-action-button/circle-action-button";
import { formatToPhone } from "../../../../../shared/utils/common";

export enum ActionType {
  FileClaim = "FileClaim",
  BookService = "BookService",
}

function ProdBookService({
  product,
  handlePress,
}: {
  product: Product;
  handlePress: () => void;
}) {
  return (
    <>
      <View>
        <Text style={styles.text}>{product.ProductDescription}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.textLabel}>CONTACT:</Text>
          <Text style={styles.text}>{formatToPhone(product.PhoneNumber)}</Text>
        </View>
      </View>
      <CircleActionButton
        style={styles.buttonAction}
        text="BOOK SERVICE"
        onPress={() => handlePress()}
      />
    </>
  );
}
function ProdFileClaim({
  product,
  handlePress,
}: {
  product: Product;
  handlePress: () => void;
}) {
  return (
    <>
      <View>
        <Text style={styles.text}>{product.ProductDescription}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.textLabel}>CONTRACT#</Text>
          <Text style={styles.text}>{product.ContractNumber}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.textLabel}>EXP. DATE</Text>
          <Text style={styles.text}>{product.ExpirationDate}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.textLabel}>CONTACT:</Text>
          <Text style={styles.text}>{formatToPhone(product.PhoneNumber)}</Text>
        </View>
      </View>
      <CircleActionButton
        style={styles.buttonAction}
        text="SUBMIT CLAIM"
        onPress={() => handlePress()}
      />
    </>
  );
}

export function ProductItem({
  product,
  card,
}: {
  product: Product;
  card: Card;
}) {
  const navigation = useNavigation();

  const isFileClaim = product.Actions.indexOf(ActionType.FileClaim) === 0;
  const isBookService = product.Actions.indexOf(ActionType.BookService) === 0;

  const pressButton = () => {
    let url = "";
    if (isFileClaim && product.FileClaimLink) {
      url = product.FileClaimLink;
    }

    if (isBookService && product.BookServiceLink) {
      url = product.BookServiceLink;
    }

    if (url !== "") {
      navigation.navigate("browserScreen", { url: url });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.ProductName}</Text>
      {isBookService ? (
        <ProdBookService product={product} handlePress={pressButton} />
      ) : isFileClaim ?
        (
          <ProdFileClaim product={product} handlePress={pressButton} />
        ) :
        <ProdBookService product={product} handlePress={pressButton} />
      }
    </View>
  );
}
