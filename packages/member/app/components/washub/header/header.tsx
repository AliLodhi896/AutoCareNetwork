import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./header.style";
import { CustomButtonType } from "../../../services/api";
import { useAppState } from "../../../context/app-state-context";
import ManufactureLogo from "../dealer/manufacture-logo";
import DealerLogo from "../dealer/dealer-logo";
import { ProfileActionButton } from "../../profile-action-button/profile-action-button";
import BellIcon from "../../../../../shared/components/svg/bell-icon";
import { normalize } from "../../../../../shared/utils/normalize";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { useNavigation } from "@react-navigation/native";
import { ICardStatus } from "../../../washub-types";

interface Props {
  showManufacturer: boolean;
}

export function Header({ showManufacturer = false }: Props) {
  const { appState } = useAppState();
  const { authState } = useAuthState();
  const navigation = useNavigation();

  let card = appState.selectedCard;
  let cardss = appState.registeredCard;

  const activeCards = appState.cards?.filter(
    (c) => c.CardStatus === ICardStatus.Active
  );
  if (activeCards.length === 0 && appState.lastRedemption !== null) {
    cardss = appState.lastRedemption.card;
  }

  const mobileAppButtons: Array<CustomButtonType> = appState.mobileAppButtons;
  const mobileAppButtons2: Array<CustomButtonType> = appState.mobileAppButtons2;

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View style={styles.leftContent}>
          {mobileAppButtons !== undefined && card && (
            <>
              {showManufacturer ? (
                <ManufactureLogo card={card == null ? cardss : card} customButtons={mobileAppButtons?.length == 0 ? mobileAppButtons2 : mobileAppButtons} />
              ) : (
                <DealerLogo card={card == null ? cardss : card} size={{ w: 160, h: 64 }} />
              )}
            </>
          )}
        </View>

        <View style={styles.rightContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("notifications");
            }}
          >
            <View style={{ marginRight: normalize(20), position: "relative" }}>
              <BellIcon
                style={{ height: normalize(44), width: normalize(50) }}
              />
              {/* <Text style={styles.notificationBatchCount}>2</Text> */}
            </View>
          </TouchableOpacity>
          <ProfileActionButton profile={authState.profile} />
        </View>
      </View>
      {showManufacturer && (
        <View style={styles.dealerLogoWrapper}>
          {mobileAppButtons !== undefined && card && <DealerLogo card={card == null ? cardss : card} />}
        </View>
      )}
    </View>
  );
}
