import { View } from "react-native";
import React from "react";
import { styles } from "./account-plans.style";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../../../../shared/components";
import { normalize } from "../../../../../../shared/utils/normalize";
import { Card } from "../../../../services/api";
import { ICardStatus, ICardType } from "../../../../washub-types";

const AccountPlanHisotry = ({ cards }: { cards: Card[] }) => {
  const listHeight = cards.length > 2 ? { height: normalize(490) } : {};

  const renderCardItem = ({ item }: { item: Card }) => {
    if (!item.VehicleInfo) return null;

    const { Make, Model, Year } = item.VehicleInfo;
    let planTitle = item.CardDescription;
    let planDescription = item.PlanTerm ?? "";
    if (item.CardType === ICardType.Service) {
      planTitle = "Wash Voucher";
      planDescription = item.CardDescription ?? "";
    }

    let planExpiration = `Expires: ${item.ExpirationDate}`;
    if (item.CardStatus === ICardStatus.Expired) {
      planExpiration = `Expired: ${item.ExpirationDate}`;
    }

    return (
      <View style={styles.box}>
        <Text style={styles.title} text={planTitle} />

        <Text
          style={styles.text}
          text={`${planDescription} ${planExpiration} `}
        />
        <Text text={Year + " " + Make + " " + Model} style={styles.text} />
      </View>
    );
  };

  return (
    <View style={{ ...listHeight, ...styles.container }}>
      <FlatList
        data={cards}
        keyExtractor={(item: Card, index) =>
          item.CardCode.toString() + index.toString()
        }
        renderItem={renderCardItem}
      />
    </View>
  );
};

export default AccountPlanHisotry;
