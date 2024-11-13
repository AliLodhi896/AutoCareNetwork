import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View, Alert, Platform } from "react-native";
import Communications from "react-native-communications";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useAppState } from "../../context/app-state-context";
import { Card } from "../../services/api";
import {
  getCityStateZip,
  openDirections,
  validateWash,
} from "../../../../shared/utils/common";
import {
  addFavoriteLocation,
  hasLocation,
  removeFavoriteLocation,
} from "../../services/actions";
import { Location } from "../../../../shared/global-types";
import {
  AutoImage as Image,
  Button,
  GradientBackground,
  Screen,
  VIcon,
} from "../../../../shared/components";
import { styles } from "./station-detail.styles";
import { translate } from "../../i18n";
import useModal from "../../../../shared/contexts/modal/useModal";
import { color, spacings } from "../../../../shared/theme";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../washub/home/home-stack";
import { MileageModal } from "../../components/mileage-modal/mileage-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { centerContent } from "../../../../shared/components/screen/screen.styles";
import { Text } from "../../../../shared/components/text/text";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import LogoIcon from "../../../../shared/components/svg/logo-icon";
import { normalize } from "../../../../shared/utils/normalize";
import { RedeemEverwashProps } from "../redeem-screen/redeem-everwash-screen";

export const RedeemAtLocationMessage = () => {
  const modal = useModal();
  return (
    <View style={styles.selfValModal}>
      <View>
        <Text style={styles.selfValTitle}>
          {translate("stationDetailScreen.redeemMessageModal0")}
        </Text>
        <Text style={styles.selfValBody}>
          {translate("stationDetailScreen.redeemMessageModal1")}{" "}
          <Text style={styles.selfValAccentRedeem}>
            {translate("stationDetailScreen.redeemMessageModal2")}
          </Text>{" "}
          {translate("stationDetailScreen.redeemMessageModal3")}{" "}
          <Text style={[styles.boldItalic, styles.selfValAccentYellow]}>
            {translate("stationDetailScreen.redeemMessageModal4")}
          </Text>
          .{"\n\n"}
          {translate("stationDetailScreen.redeemMessageModal5")}
          <Text style={styles.boldItalic}>
            {" "}
            {translate("stationDetailScreen.redeemMessageModal6")}{" "}
          </Text>
          {translate("stationDetailScreen.redeemMessageModal7")}
        </Text>
      </View>
      <TouchableOpacity style={styles.okBtn} onPress={modal.hideModal}>
        <Text style={styles.okBtnText}>{translate("common.ok")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const callIcon = Platform.select({
  ios: "ios-call",
  android: "md-call",
});

const navigateIcon = Platform.select({
  ios: "ios-navigate",
  android: "md-navigate",
});

const StationDetailScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "stationDetail">
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const appContext = useAppState();
  const { authState } = useAuthState();
  const { profile } = authState;
  const { appState } = appContext;
  const { cards } = appState;
  const modal = useModal();
  const route = useRoute<any>();
  const { station, distance } = route?.params || null;
  const favoriteLocations = appState.favoriteLocations || [];
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(hasLocation(favoriteLocations, station));
  }, [station]);

  const redeemWash = () => {
    //check if show mileage

    if (!station) {
      console.error("Can't redeem empty station");
      return;
    } else if (!validateWash(cards)) {
      return;
    }

    let message = `${station.LocationName}\n${station.LocationAddress}\n${
      station.LocationCity
    }, ${station.LocationState}, ${station.LocationZip}\n\n${translate(
      "stationDetailScreen.pressingWillRedeem"
    )}`;

    if (station.AllowsSelfValidation) {
      message += "\n\n" + translate("stationDetailScreen.clickWhenReadyToShow");
    }

    const redeem = (card: Card, completion?: () => void) => {
      Alert.alert(
        translate("stationDetailScreen.confirmLocation") + ":",
        message,
        [
          {
            text: translate("common.ok"),
            onPress: () => {
              navigation.navigate("redeemWash", { station, card });
              if (completion) {
                completion();
              }
            },
          },
          { text: translate("common.cancel") },
        ]
      );
    };

    const shouldReportMileage = (card: Card) => {
      return profile.ReportMileage.includes(card.CardCode);
    };

    if (cards && cards.length > 0) {
      if (cards.length === 1) {
        if (shouldReportMileage(cards[0])) {
          modal.showModal(
            <MileageModal
              Code={cards[0].CardCode}
              callback={() => redeem(cards[0])}
            />
          );
        } else {
          redeem(cards[0]);
        }
      } else {
        //multiple cards
        navigation.navigate("selectCard", {
          onCardSelected: (card: Card) => {
            card.LastRedemption = "2021-09-27T17:32:05.087";

            if (validateWash([card])) {
              if (station.LocationRedemptionType === "EverWash") {
                const redeemEverwash: RedeemEverwashProps = {
                  CardCode: card.CardCode,
                  LocationId: station.LocationId,
                  LocationIdentifier: station.LocationIdentifier,
                  Latitude: station.LocationLatitude,
                  Longitude: station.LocationLongitude,
                };
                navigation.navigate("redeemEverwash", redeemEverwash);
              } else {
                if (shouldReportMileage(card)) {
                  modal.showModal(
                    <MileageModal
                      Code={card.CardCode}
                      callback={() => redeem(card)}
                    />
                  );
                } else {
                  redeem(card);
                }
              }
            }
          },
        });
      }
    } else {
      //No cards alert
      Alert.alert("Error", translate("stationDetailScreen.noPlanAttached"), [
        {
          text: translate("common.ok"),
        },
      ]);
    }
  };

  const onToggleFavorite = (station: Location) => {
    if (isFavorite) {
      setIsFavorite(removeFavoriteLocation(appContext, station));
    } else {
      setIsFavorite(addFavoriteLocation(appContext, station));
    }
  };

  const favoriteIcon = isFavorite ? "favorite" : "favorite-border";

  const {
    LocationAddress,
    LocationCity,
    LocationName,
    LocationPhone,
    LocationState,
    LocationZip,
    ServiceLevel,
    AllowsSelfValidation,
  } = station || ({} as any);

  const navigationDest = `${LocationAddress}, ${LocationCity}, ${LocationState}, ${LocationZip}`;
  const containerStyle = {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Screen
      statusBar="light-content"
      style={[
        styles.main,
        centerContent({
          height: normalize(85),
          insets: { top: 0, bottom: insets.bottom },
        }),
      ]}
      unsafe
    >
      <GradientBackground />

      <View style={styles.list}>
        <FlatList
          style={styles.flex}
          indicatorStyle="black"
          nestedScrollEnabled={true}
          data={station?.AdditionalServices}
          keyExtractor={(item: any) => item.ServiceName}
          renderItem={({ item: service, key }: any) => (
            <View style={styles.row} key={key}>
              <View style={styles.rowContent}>
                <View style={styles.details}>
                  <Image
                    source={{ uri: service.ServiceLogo }}
                    style={styles.image}
                  />
                  <View style={styles.flexColumn}>
                    <Text style={styles.font15}>{service.ServiceName}</Text>
                    <Text>{service.ServiceDescription}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => {
            return (
              <View>
                <View>
                  <Button
                    style={styles.acceptButton}
                    textStyle={styles.acceptButtonText}
                    onPress={redeemWash}
                    text={translate("homeScreen.redeemWash")}
                  />
                </View>

                <View style={styles.content}>
                  <View style={styles.description}>
                    <Text style={styles.title}>{LocationName}</Text>
                    <Text style={styles.distance}>
                      {translate("stationDetailScreen.serviceLevel")}:{" "}
                      {ServiceLevel}
                    </Text>
                    <Text style={[styles.distance, { color: color.primary }]}>
                      {distance}
                    </Text>
                    <Text style={styles.subtitle}>{LocationAddress}</Text>
                    <Text style={styles.subtitle}>
                      {station && getCityStateZip(station)}
                    </Text>
                    {!!LocationPhone && (
                      <Text style={styles.subtitle}>{LocationPhone}</Text>
                    )}
                    {AllowsSelfValidation && (
                      <TouchableOpacity
                        style={styles.selfValContainer}
                        onPress={() =>
                          modal.showModal(<RedeemAtLocationMessage />)
                        }
                      >
                        <Image
                          style={styles.selfValImage}
                          source={require("../../../assets/images/smartphone_approve.png")}
                          resizeMode="contain"
                        />
                        <Text style={styles.selfValText}>
                          {translate("redeemLocationsScreen.selfVal")}
                        </Text>
                        <VIcon
                          family="Ionicons"
                          name="information-circle-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={containerStyle}
                      onPress={() => onToggleFavorite(station)}
                    >
                      <VIcon
                        family="MaterialIcons"
                        name={favoriteIcon}
                        size={spacings.icons.medium}
                        color={color.palette.red}
                      />
                      <Text fontFamily="secondary" style={[styles.iconText]}>
                        {translate("common.favorite")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[containerStyle, { marginLeft: 5 }]}
                      onPress={() =>
                        Communications.phonecall(LocationPhone, false)
                      }
                    >
                      <VIcon
                        family="Ionicons"
                        name={callIcon}
                        size={spacings.icons.medium}
                        color={color.palette.red}
                      />
                      <Text fontFamily="secondary" style={styles.iconText}>
                        {translate("common.call")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openDirections(navigationDest)}
                      style={containerStyle}
                    >
                      <VIcon
                        family="Ionicons"
                        name={navigateIcon}
                        size={spacings.icons.medium}
                        color={color.palette.red}
                      />
                      <Text fontFamily="secondary" style={styles.iconText}>
                        {translate("common.directions")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
          <View style={styles.logo}>
            <LogoIcon />
          </View>
        }
        styles={styles.header}
      />
    </Screen>
  );
};

export default StationDetailScreen;
