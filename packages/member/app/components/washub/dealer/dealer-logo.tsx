import React from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import { Card } from "../../../services/api";
import { normalize } from "../../../../../shared/utils/normalize";

interface Props {
  card: Card;
  size?: {
    w: number;
    h: number;
  };
}
const DealerLogo = ({ card, size = {w: 220,h: 88} }: Props) => {
  const openDealerUrl = () => {
    if (card.DealerWebSite) {
      Linking.canOpenURL(card.DealerWebSite)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle url: " + card.DealerWebSite);
          } else {
            return Linking.openURL(card.DealerWebSite);
          }
        })
        .catch((err) => console.error("An error occurred", err));
    }
  };

  return (
    <View style={{ display: "flex" }}>
      <TouchableOpacity onPress={() => openDealerUrl()}>
        <Image
          resizeMode="contain"
          style={{ width: normalize(size.w), height: normalize(size.h) }}
          source={{ uri: card.DealerLogoUrl }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DealerLogo;
