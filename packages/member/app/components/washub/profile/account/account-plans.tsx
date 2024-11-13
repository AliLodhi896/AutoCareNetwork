import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./account-plans.style";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../../../../shared/components";
import { normalize } from "../../../../../../shared/utils/normalize";
import { CircleActionButton } from "../../circle-action-button/circle-action-button";
import { Card } from "../../../../services/api";
import { ICardStatus, ICardType } from "../../../../washub-types";
import { useAppState } from "../../../../context/app-state-context";
import AccountMembershipAdd from "./account-membership-add";
import WashubClient from "../../../../services/api/api";
import { useNavigation } from "@react-navigation/native";
import AccountVehicleVinAdd from "./account-vehicle-vin-add";
import analytics from "@react-native-firebase/analytics";

export interface IUnlinkResponse {
  success: boolean;
  error: string;
  cardCode: string;
}

const AccountPlans = ({
  cards,
  openNew,
  addVinNumberCard,
  handleClose,
  setAddVinNumberFromApp
}: {
  cards: Card[];
  openNew?: boolean;
  addVinNumberCard: Card | null;
  handleClose: () => void;
  setAddVinNumberFromApp: any;
}) => {
  const navigation = useNavigation();
  const { appState, setAppState } = useAppState();
  const listHeight = cards.length > 2 ? { height: normalize(490) } : {};
  const [unlinkResponse, setUnlinkResponse] = useState<IUnlinkResponse | null>(
    null
  );
  const [addNew, setAddNew] = useState(false);
  
  // const scrreenView = async () => {
  //     await analytics().logEvent('screen_view', {
  //       screen_name: 'My Profile - Add Vin Number',
  //     });
  //     console.log('Starting Add vin event logging');
  // };
  

    useEffect(() => {
      setAddNew(openNew);
      return () => {
        setAddNew(false);
        setUnlinkResponse(null);
      };
    }, []);

    const unlinkCard = async (card: Card) => {
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

    const renderCardItem = ({ item }: { item: Card }) => {
      //default is MEMBERSHIP (MEMBER cart type)
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
          {item.VehicleInfo &&
            item.VehicleInfo.Year &&
            item.VehicleInfo.Make &&
            item.VehicleInfo.Model && (
              <Text
                text={
                  item.VehicleInfo.Year +
                  " " +
                  item.VehicleInfo.Make +
                  " " +
                  item.VehicleInfo.Model
                }
                style={styles.text}
              />
            )}

          <View style={styles.actions}>
            <Text style={styles.text}>{item.CardCode}</Text>

            <Pressable onPress={() => unlinkCard(item)}>
              <Text style={styles.link} text="Unlink" />
            </Pressable>
          </View>
          {unlinkResponse && unlinkResponse.cardCode === item.CardCode && (
            <Text style={styles.error} text={unlinkResponse.error} />
          )}
        </View>
      );
    };

    useEffect(() => {
      const scrreenView = async () => {
        await analytics().logEvent('screen_view', {
          screen_name: 'My Profile - Add New Number/Vouchers',
        });
        console.log('Screen view logged');
      };
  
      scrreenView();
    }, [addNew]);

    if (addNew) {
      return (
        <AccountMembershipAdd handleClose={handleClose} />
      )
    }

    if (addVinNumberCard) {
     
      return (
        <AccountVehicleVinAdd card={addVinNumberCard} handleClose={handleClose} />
      );
    }

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
            setAddVinNumberFromApp('App');
            setAddNew(true);
            // scrreenView();
          }}
        />
      </View>
    );
  };

  export default AccountPlans;
  AccountPlans.defaultProps = {
    isHistory: false,
  };
