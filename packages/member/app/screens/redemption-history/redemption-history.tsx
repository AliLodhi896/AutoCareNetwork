import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import moment from "moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WashubClient from "../../services/api/api";
import { Card } from "../../../../shared/services/api";
import { styles } from "./redemption-history.styles";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import {
  GradientBackground,
  Screen,
  VIcon,
} from "../../../../shared/components";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { color, fontsize } from "../../../../shared/theme";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { centerContent } from "../../../../shared/components/screen/screen.styles";
import { translate } from "../../i18n";
import { useNavigation } from "@react-navigation/native";

export default function RedemptionHistory(props: any) {
  const { cards } = props.route.params;
  const [redemptions, setRedemptions] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(cards);
    if (cards.length) {
      Promise.all(
        cards.map(async (c: Card) => WashubClient.getTransactions(c.CardCode))
      ).then((values) => {
        const redemptions = values.map((r: any) => r.LastRedemptions ?? []);
        const merged = [].concat
          .apply([], redemptions)
          .sort((a: { DateTime: string }, b: { DateTime: string }) => {
            return (
              new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
            );
          });

        console.log(merged);
        setRedemptions(merged);
      });
    }
  }, [cards]);

  return (
    <View testID="redeemHistoryScreen" style={styles.safeArea}>
      <Screen
        statusBar="light-content"
        style={[
          styles.container,
          centerContent({ insets: { top: insets.top, bottom: insets.bottom } }),
        ]}
        unsafe
      >
        <GradientBackground />

        <View style={[cardStyles.card, styles.card]}>
          {!redemptions.length ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                color="#222"
                animating
                style={[{ height: 80 }]}
                size="large"
              />
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={redemptions}
              keyExtractor={(item: any) => item.DateTime}
              renderItem={({ item: redemption }: any) => (
                <View key={redemption.LocationName} style={styles.row}>
                  <View style={styles.content}>
                    <View style={styles.details}>
                      <View style={{ flexDirection: "column", flex: 1 }}>
                        <Text style={{ fontSize: 15 }}>
                          {redemption.Station}
                        </Text>
                        <Text>
                          {`${new Date(
                            `${redemption.DateTime}+00:00`
                          ).toLocaleDateString()} ${moment(
                            `${redemption.DateTime}+00:00`
                          ).format("h:mm a")}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
        <CustomHeader
          leftContent={
            <BackButton
              text={translate("common.close")}
              onPress={navigation.goBack}
              type="close"
            />
          }
          centerContent={
            <View>
              <VIcon
                family="MaterialCommunityIcons"
                name="history"
                size={fontsize.large}
                color={color.palette.red}
              />
            </View>
          }
        />
      </Screen>
    </View>
  );
}
