import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
// import {
//   WashEngagement,
//   EverwashApiCredential,
// } from "@everwash/everwash-sdk-qrcode";
import { Card } from "../../services/api";
import WashubClient from "../../services/api/api";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { useRoute } from "@react-navigation/native";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { translate } from "../../i18n";
import { Screen } from "../../../../shared/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type RedeemEverwashProps = {
  CardCode: string;
  Latitude: number;
  LocationId: number;
  LocationIdentifier: string;
  Longitude: number;
  callback?: (card: Card) => void;
};

export const RedeemEverwashScreen = ({ navigation }) => {
  const route = useRoute<any>();
  const params: RedeemEverwashProps = route.params;
  const [productId, setProductId] = useState<string>("");
  // const everwashApiCredential = EverwashApiCredential.getInstance();

  console.log(params);
  useEffect(() => {
    WashubClient.redeemEWWash({
      CardCode: params.CardCode,
      LocationId: params.LocationId,
      LocationIdentifier: params.LocationIdentifier,
      Latitude: params.Latitude,
      Longitude: params.Longitude,
    })
      .then((redeemResponse) => {
        if (
          redeemResponse !== null &&
          typeof redeemResponse.result !== undefined &&
          typeof redeemResponse.result.freewashUuid !== undefined
        ) {
          // WashubClient.getEWToken()
          //   .then((response) => {
          //     everwashApiCredential.jwt = response.result;
          //     if (everwashApiCredential.jwt !== null) {
          //       setProductId(redeemResponse.result.freewashUuid);
          //     }
          //   })
          //   .catch((e) => console.error(e));
        }
      })
      .catch((e) => console.error(e));

    return () => {
      setProductId("");
    };
  }, [params.LocationId]);

  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <View style={styles.engagementContainer}>
          {/* {productId !== "" && <WashEngagement serviceUuid={productId} />} */}
        </View>
      </SafeAreaView>
      <CustomHeader
        leftContent={
          <BackButton
            onPress={() => navigation.goBack()}
            text={translate("common.close")}
            type="close"
          />
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F0E6",
    flex: 1,
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 70,
  },
  engagementContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
