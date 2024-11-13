
import React, { FC, useCallback, useEffect, useState } from "react";


import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "./home-screen.styles";
import { screenDimensions } from "../../../../../shared/theme";
import { useAppState } from "../../../context/app-state-context";
import { Card } from "../../../../../shared/services/api";
import { HomeNavigatorParamList } from "./home-stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { Text } from "../../../../../shared/components/text/text";
import { normalize } from "../../../../../shared/utils/normalize";
import CarsCarousel from "../../../components/washub/cars-carousel/cars-carousel";
import { Layout } from "../../../components/washub/layout";
import { Loader } from "../../../components/washub/loader/loader";
import { AutoImage } from "../../../../../shared/components";
import TermsAndConditions from "../../../components/washub/terms-and-conditions/terms-and-conditions";
import { AuthStateProps } from "../../../../../shared/services/storage";
import analytics from "@react-native-firebase/analytics";
import { useFocusEffect } from "@react-navigation/native";

import { ICardStatus } from "../../../washub-types";

import NoWashError from "../../../components/washub/no-wash/no-wash-error";
import WashubClient from "../../../services/api/api";

export const HomeScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "default">
> = ({ navigation, route }) => {
  const { authState, initializeAuth } = useAuthState();
  const { appState } = useAppState();
  const [errorModal, setErrorModal] = useState(false);
  const [carouselCards, setCarouselCards] = useState<Card[]>([]);
  const { profile } = authState;
  const cards: Array<Card> = appState.cards;

  const activeCards = cards?.filter((c) => c.CardStatus === "Active");
  const updateEvent = async () => {
    const state: AuthStateProps = await initializeAuth();
    await analytics().setUserId(JSON.stringify(state?.profile?.UserId));
  }


  useFocusEffect(
    useCallback(() => {
      updateEvent()
    }, []),
  );

  useEffect(() => {
    const scrreenView = async () => {
      await analytics().logEvent('screen_view', {
        screen_name: 'Welcome',
      });
      console.log('Welcome Screen view logged');
    };

    scrreenView();
  }, []);


  const getCards = async () => {
    const sliderCards = [];
    cards?.forEach((card) => {
      if (card.CardStatus === ICardStatus.Active) {
        sliderCards.push(card);
      } else {
        appState.recentWashes.forEach((rw) => {
          if (rw.CardCode === card.CardCode) {
            sliderCards.push(card);
          }
        });
      }
    });
    setCarouselCards(sliderCards);
    return () => {
      setCarouselCards([]);
    };

  }

  useEffect(() => {
    getCards()
    if (appState.selectedCard == null) {
      setErrorModal(true)
    } else {
      setErrorModal(false)
    }
  }, [cards])

  return (
    <Layout headerManufacturer hasContainer={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: screenDimensions.height,
          width: screenDimensions.width,
        }}
      >
        {!appState.isLoading ? (
          <>
            <TermsAndConditions />
            <View
              style={{
                minHeight: screenDimensions.height,
                width: screenDimensions.width,
              }}
            >
              <View style={styles.container}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Welcome, {profile?.FirstName}</Text>
                </View>
                {appState.isLoading ? (
                  <View style={{ flex: 1, position: "relative" }}>
                    <Loader />
                  </View>
                ) : carouselCards.length === 0 ? (
                  <View style={{ flex: 1, position: "relative" }}>
                    <View style={styles.noCardsView}>
                      <Text style={styles.noCardsText}>You have no Cards</Text>
                    </View>
                  </View>
                ) : (
                  <CarsCarousel cards={carouselCards} />
                )}
              </View>
              {/* {appState.selectedCard && ( */}
              <View style={[styles.bottomView, { marginTop: normalize(20) }]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("redeem");
                  }}
                >
                  <AutoImage
                    style={styles.bntCircle}
                    source={require("../../../../assets/images/btn-find-wash.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate("products");
                  }
                  }
                >
                  <AutoImage
                    style={styles.bntCircle}
                    source={require("../../../../assets/images/btn-book-service.png")}
                  />
                </TouchableOpacity>
              </View>
              {/* )} */}

            </View>
            <NoWashError
              modalVisible={errorModal}
              setModalVisible={() => setErrorModal(false)}
              text={'You are not entitled to any wash.'}
            />
          </>
        )
          :
          <View style={{ flex: 1, position: "relative" }}>
            <Loader />
          </View>
        }
      </ScrollView>
    </Layout>
  );
};
