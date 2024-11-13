import { Text, RefreshControl, View, FlatList, Platform } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ProfileNavigatorParamList } from "./profile-stack"
import { useAppState } from "../../context/app-state-context"
import { Card } from "../../services/api"
import { translate } from "../../i18n"
import {
  AutoImage,
  Button,
  GradientBackground,
  Screen,
} from "../../../../shared/components"
import { styles } from "./profile-screen.style"
import WashCard from "../../components/wash-card/wash-card"
import CustomHeader from "../../../../shared/components/custom-header/custom-header"
import { BackButton } from "../../../../shared/components/back-button/back-button"
import {
  color,
  fontsize,
  screenDimensions,
  spacings,
} from "../../../../shared/theme"
import { navigate } from "../../navigators"
import { Circle } from "react-native-progress"
import { getRandomInt } from "../../../../shared/utils/common"
import LoadingScreen from "../../../../shared/screens/loading-screen/loading-screen"
import { normalize } from "../../../../shared/utils/normalize"

type ProfileScreenRouteProp = RouteProp<ProfileNavigatorParamList, "default">

function ProfileComponent({}): JSX.Element {
  const { appState, initializeApp } = useAppState()
  const route = useRoute<ProfileScreenRouteProp>()
  const [loaded, setLoaded] = useState(false)
  const cards = route.params?.cards ?? appState.cards
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const noActiveCards = !loading && appState.noActiveCards && cards?.length > 0
  const hasOnlyOneCard = cards?.length === 1
  const footerBottom = {
    bottom:
      noActiveCards || cards?.length === 0
        ? 0.04 * screenDimensions.height
        : 0.15 * screenDimensions.height,
  }

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 100)
  }, [])

  const refresh = async () => {
    setLoading(true)
    await initializeApp()
    setLoading(false)
  }

  let content: JSX.Element | JSX.Element[]

  let onSelect: any = null

  if (route.params) {
    const { onCardSelected } = route.params
    if (onCardSelected) {
      onSelect = (card: Card) => {
        onCardSelected(card)
      }
    }
  }

  const sortedCards = useMemo(
    () =>
      cards?.sort((a, b) => {
        if (a.DealerName < b.DealerName) {
          return -1
        } else if (a.DealerName > b.DealerName) {
          return 1
        }
        return 0
      }),
    [cards]
  )

  if (!loaded) {
    return <LoadingScreen />
  }

  const washMessage = translate("profileScreen.washMessage")
  
  if (loading) {
    content = (
      <View style={styles.loading}>
        <Circle
          thickness={fontsize.medium}
          color={color.palette.red}
          size={spacings.icons.medium}
          indeterminate={true}
        />
      </View>
    )
  } else if (!loading && cards && cards?.length > 0) {
    content = (
      <>
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{
            paddingBottom: 120,
            paddingTop: Platform.OS === "android" ? 80 : 100,
          }}
          data={sortedCards}
          keyExtractor={(card) =>
            card.CardCode || getRandomInt(10000).toString()
          }
          renderItem={(card) => {
            return (
              <WashCard
                hideCode={true}
                onSelect={onSelect}
                card={card.item}
                singleCard={hasOnlyOneCard}
              />
            )
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
        />
      </>
    )
  } else {
    content = <Text style={styles.emptyText}>{washMessage}</Text>
  }

  return (
    <View testID="ProfileScreen" style={styles.flex1}>
      <Screen style={styles.container} statusBar="light-content" unsafe>
        <GradientBackground />
        {!loaded ? (
          <LoadingScreen />
        ) : (
          <View
            style={
              noActiveCards || cards?.length === 0
                ? styles.containerNoCardInner
                : styles.containerInner
            }
          >
            <View style={styles.content}>
              {noActiveCards && (
                <Text style={styles.noCardsText}>
                  {translate("profileScreen.noActiveCarWash")}
                </Text>
              )}
              {content}
            </View>

            {cards?.length > 0 && !hasOnlyOneCard && (
              <View
                pointerEvents="box-none"
                style={[styles.footer, footerBottom]}
              >
                <Button
                  textStyle={styles.buttonStyle}
                  text={`${translate("profileScreen.whatDoMyPlanIncludes")}?`}
                  onPress={() => navigate("profile", { screen: "Terms" })}
                />
              </View>
            )}
          </View>
        )}
        <CustomHeader
          leftContent={
            <BackButton
              text={translate("common.close")}
              onPress={navigation.goBack}
              type="close"
            />
          }
          centerContent={
            <AutoImage
              resizeMode="contain"
              source={require("../../../assets/images/profile-icon-red.png")}
              style={{
                height: normalize(35),
                width: normalize(30),
              }}
            />
          }
        />
      </Screen>
    </View>
  )
}

export default ProfileComponent
