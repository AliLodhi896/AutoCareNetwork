import React from "react";
import { Image, Linking, View } from "react-native";
import { Text, DottedLine } from "../../../../shared/components";
import { fontsize, spacings } from "../../../../shared/theme";
import { DealerButtonPromo } from "../../services/api";
import { sectionStyles, styles } from "./product-card.style";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";

type ItemProductPropType = {
  item: DealerButtonPromo;
};
export const ProductPromoCard = ({ item }: ItemProductPropType) => {
  const getQuote = () => {
    Linking.canOpenURL(item.ButtonSettings.Url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + item.ButtonSettings.Url);
        } else {
          return Linking.openURL(item.ButtonSettings.Url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <View style={sectionStyles.card}>
      <View style={sectionStyles.detailsCard}>
        <View style={sectionStyles.cardHeader}>
          <Text preset="bold" style={sectionStyles.bigText}>
            {item.ButtonSettings.Title}
          </Text>
        </View>
        <DottedLine />
        <View style={{ padding: spacings.medium }}>
          <View style={sectionStyles.promoCardContainer}>
            <View
              style={{
                width: "65%",
                paddingEnd: 20,
              }}
            >
              <Text>{item.ButtonSettings.BodyText}</Text>
            </View>
            <View style={{ width: "35%" }}>
              <Image
                resizeMode="contain"
                style={sectionStyles.promoCardImg}
                source={{ uri: item.ButtonSettings.BodyImageUrl }}
              />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: fontsize.mediumOne, marginTop: 20 }}>
              {item.ButtonSettings.FooterCTA}
            </Text>
          </View>
        </View>
      </View>
      <CircleButton
        innerText
        noText
        style={styles.sideCircle}
        textStyle={styles.sideText}
        text="Get Quoate"
        onPress={() => {
          getQuote();
        }}
        icon={
          <Image
            resizeMode="contain"
            style={{
              width: spacings.icons.medium,
              height: spacings.icons.medium,
            }}
            source={require("../../../assets/images/icon-getquote.png")}
          />
        }
      />
    </View>
  );
};
