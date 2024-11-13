import { View, Pressable } from "react-native";
import { AutoImage as Image } from "../../../../../../shared/components/auto-image/auto-image";
import React, { useEffect, useState } from "react";
import { styles } from "./account-vehicles.style";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../../../../shared/components";
import { normalize } from "../../../../../../shared/utils/normalize";
import { useAppState } from "../../../../context/app-state-context";
import { CircleActionButton } from "../../circle-action-button/circle-action-button";
import { Card } from "../../../../services/api";
import WashubClient from "../../../../services/api/api";
import { IRequestStatus } from "../../../../washub-types";
import { IUnlinkResponse } from "./account-plans";
import analytics from "@react-native-firebase/analytics";

interface IRemovingCard {
  card: Card | null;
  status: IRequestStatus;
  error: string;
}
const defaultRemovingCard: IRemovingCard = {
  card: null,
  status: IRequestStatus.Idle,
  error: "",
};

const AccountVehicles = ({
  cards,
  handleAddNew,
  handleAddVin,
}: {
  cards: Card[];
  handleAddNew: (s: boolean) => void;
  handleAddVin: (card: Card) => void;
}) => {
  const listHeight = cards.length > 2 ? { height: normalize(490) } : {};
  const { appState, setAppState } = useAppState();
  const [unlinkResponse, setUnlinkResponse] = useState<IUnlinkResponse | null>(
    null
  );

  useEffect(() => {
    return () => {
      setUnlinkResponse(null);
    };
  }, []);

  const removeVehicle = async (card: Card) => {
    setAppState({ isLoading: true });
    const { error, response } = await WashubClient.unlinkCard(card.CardCode);
    if (response.status === 200) {
      appState.reInit();
    } else {
      setUnlinkResponse({
        success: false,
        error: error.message,
        cardCode: card.CardCode,
      });
      setAppState({ isLoading: false });
    }
  };

    const scrreenView = async () => {
      await analytics().logEvent('screen_view', {
        screen_name: 'My Profile - Add Vin Number',
      });
      console.log('Screen view logged');
    };



  const renderCardItem = ({ item }: { item: Card }) => {
    if (!item.VehicleInfo) return null;
    const {
      PhotoUrl,
      Make,
      Model,
      Year,
      VehicleIdNumber: VIN,
    } = item.VehicleInfo;

    return (
      <View style={styles.box}>
        <View style={styles.vechicleContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{ uri: PhotoUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.vechileInfo}>
            <Text style={styles.text} text={Make + " " + Model} />
            <Text style={styles.text}>{Year}</Text>
            {!VIN ? (
              <Text style={styles.vinText}>{`VIN# ${VIN}`}</Text>
            ) : (
              <Pressable onPress={() => handleAddVin(item)}>
                <Text style={styles.vinLinkAction}>Add VIN #</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={
            appState.primaryCard?.CardCode === item.CardCode
              ? [styles.vehicleActions, styles.vehicleActionsPrimary]
              : styles.vehicleActions
          }
        >
          <Pressable onPress={() => removeVehicle(item)}>
            <Text style={styles.linkAction}>remove</Text>
          </Pressable>
          {appState.primaryCard?.CardCode !== item.CardCode && (
            <Pressable onPress={() => appState.togglePrimaryCard(item)}>
              <Text style={[styles.linkAction, styles.linkActionNonPrimary]}>
                make primary
              </Text>
            </Pressable>
          )}
          {appState.primaryCard?.CardCode === item.CardCode && (
            <View style={styles.primary}>
              <Image
                resizeMode="contain"
                source={require("../../../../../assets/images/icon-check-fill.png")}
                style={styles.primaryIcon}
              />
              <Text style={styles.textPrimary}>primary</Text>
            </View>
          )}
        </View>
        {unlinkResponse?.cardCode === item.CardCode && (
          <Text style={styles.itemError} text={unlinkResponse.error} />
        )}
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
      <CircleActionButton
        style={styles.actionButton}
        text="ADD NEW"
        onPress={() => {
          scrreenView()
          handleAddNew(true);
        }}
      />
    </View>
  );
};

export default AccountVehicles;
