import { View, Text, Linking, TouchableOpacity, AppState, ScrollView, Platform } from "react-native"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import moment from "moment"
import { DOCUSIGN_URL } from "../../../../shared/services/api/api-constant"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuthState } from "../../../../shared/contexts/auth-state-context"
import { useAppState } from "../../context/app-state-context"
import CustomMessageComponent from "../../../../shared/screens/message/message-screen"
import useModal from "../../../../shared/contexts/modal/useModal"
import { NavigatorParamList } from "../../navigators"
import {
  AutoImage as Image,
  GradientBackground,
  Screen,
  VIcon,
} from "../../../../shared/components"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { UserRatingModal } from "../../components/user-rating-modal/user-rating-modal"
import UserFeedback from "../../../../shared/components/user-feedback"
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import {
  color,
  prefix,
  screenDimensions,
  spacings,
} from "../../../../shared/theme"
import { translate } from "../../i18n"
import WashubClient from "../../services/api/api"
import { styles } from "./home-screen.styles"
import { HelpContent } from "../../components/contact-modal/contact-modal"
import { shareMerchant } from "../../utils/common"
import { AlertModal } from "../../components/alert-modal/alert-modal"
import intercomService from "../../../../shared/services/intercom.service"
import Intercom from "@intercom/intercom-react-native"
import { ProfileActionButton } from "../../components/profile-action-button/profile-action-button"
import ChatIcon from '../../../../shared/components/svg/chat-icon'
import ValidateIcon from '../../components/svg/validate-icon'
import RecentWashIcon from '../../components/svg/recent-washes-icon'
import ShareIcon from '../../components/svg/share-icon'
import ContactIcon from '../../components/svg/contact-icon'

interface MessageComponentProps {
  customMessage?: string
  dontNavigate?: boolean
  navigation: StackNavigationProp<NavigatorParamList, "home">
}
export const MessageComponent = (props: MessageComponentProps) => {
  const { customMessage } = props
  const modal = useModal()
  return (
    <CustomMessageComponent
      visible={modal.visible}
      client={WashubClient}
      onClose={() => {
        /*modal.hideModal();
       !props.dontNavigate &&
          navigation.navigate("home", { custom_message_endpoint: null });*/
      }}
      endpoint={customMessage}
    />
  )
}

const formattedTime = () => {
  return new Date().toDateString()
}

const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = ({
  navigation,
}) => {
  const {
    authState: { profile },
  } = useAuthState()
  const modal = useModal()
  const insets = useSafeAreaInsets()
  const { appState, setAppState, initializeApp } = useAppState()
 const {
    hasSubmittedW9,
    feedbackRating,
    lastFeedbackTime,
    selectedStation,
    transactions,
  } = appState

  const todaysRedemptions = transactions?.transactions?.Today || []
  const redemptionCount = todaysRedemptions?.length || 0
  const [collectFeedback, setCollectFeedback] = useState(false)
  const [stationActivated, setStationActivated] = useState(false)
  const circleIconSize = 0.13 * screenDimensions.width
  const isManager = selectedStation?.IsManager ?? false
  const canValidateWash = selectedStation && selectedStation.W9

  const checkFeedback = useCallback(() => {
    const onCollectFeedback = (
      data: {
        feedbackRating: number
        lastFeedbackTime: string
      } | null
    ) => {
      data && setAppState(data)
      setCollectFeedback(false)
    }

    if (lastFeedbackTime) {
      const lastFeedback = moment(lastFeedbackTime)
      const now = moment()
      const monthDiff = now.diff(lastFeedback, "months")
      setCollectFeedback(monthDiff > 3)
      monthDiff > 0 &&
        modal.showModal(
          <UserRatingModal
            navigation={navigation}
            onCollectFeedback={onCollectFeedback}
            collectFeedback={collectFeedback}
          />
        )
    }
  }, [lastFeedbackTime])

  useEffect(checkFeedback, [lastFeedbackTime, checkFeedback])
  useFocusEffect(useCallback(checkFeedback, [lastFeedbackTime, checkFeedback]))

  const onForeground = useCallback(() => {
    if (AppState.currentState === "active") {
      checkFeedback()
    }
  }, [checkFeedback])

  useEffect(() => {
    const listener = AppState.addEventListener("change", onForeground)
    return () => {
      listener.remove()
    }
  }, [lastFeedbackTime, onForeground])

  useEffect(() => {
    if (
      selectedStation &&
      selectedStation?.RequiresActivation &&
      !stationActivated
    ) {
      setStationActivated(true)
      modal.showModal(
        <AlertModal
          title={translate("common.success")}
          content={translate("homeScreen.alert.submitted_message4")}
          onPress={() =>
            WashubClient.activateStation(selectedStation.StationId)
          }
          backgroundColor={color.palette.success}
        />
      )
    }
  }, [stationActivated])

  useEffect(() => {
    if (profile) {
      intercomService.loadIntercom(profile.Email)
    }
  }, [profile?.Email])

  const submitW9 = async () => {
    await Linking.openURL(DOCUSIGN_URL)
    const newState = await initializeApp()
    if (newState?.selectedStation.W9) {
      setAppState({ hasSubmittedW9: true })
      setTimeout(() => {
        modal.showModal(
          <AlertModal
            title={translate("homeScreen.alert.submitted")}
            content={translate("homeScreen.alert.submitted_message1")}
          />
        )
      }, 4000)
    }
  }

  const submitW9Info = () => {
    
    if (hasSubmittedW9) {
      modal.showModal(
        <AlertModal
          content={translate("homeScreen.alert.submitted_message2")}
        />
      )
    } else {
      modal.showModal(
        <AlertModal
          content={translate("homeScreen.alert.submitted_message3")}
        />
      )
    }
  }

  const openContact = () => {
    modal.showModal(<HelpContent contactWashub />)
  }

  const goToScanner = () => {
    navigation.navigate("validateWash")
  }

  const goToDashboard = () => {
    navigation.navigate("dashboard")
  }

  const getGreeting = () => {
    const hourOfDay = moment().hours()
   if(hourOfDay >= 0 && hourOfDay < 12){
     return translate("common.goodMorning")
   }else if (hourOfDay >= 12 && hourOfDay < 18){
    return translate("common.goodAfternoon")
   }else{
    return translate("common.goodEvening")
   }
  }

  return (
    <Screen
    style={styles.container}
    backgroundColor={color.palette.lightBlackBackground}
    statusBar="light-content"
    merchant
    unsafe
  >
    <GradientBackground
      backgroundColor={color.palette.lightBlackBackground}
      merchant
      imgSrc={require('../../../assets/images/washub-merchant-app-background.png')}
    />
   <ScrollView>
      <View
        style={[styles.header, { paddingTop: insets.top + spacings.small }]}
      >
        <View>
          <View style={{ ...styles.header, marginTop: Platform.select({
            android: 30,
            ios: 0
          }), paddingHorizontal: spacings.large, }}>
            <View style={styles.rightContent}>
              <TouchableOpacity
                onPress={() => {
                  Intercom.displayMessenger()
                }}
              >
               <ChatIcon fill={color.palette.red}/>
              </TouchableOpacity>
            </View>

            <View style={styles.leftContent}>
              <View>
                <ProfileActionButton
                  selectedStation={selectedStation}
                  profile={profile}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.titleView}>
          {canValidateWash ? (
            <Text style={styles.title}>
              {getGreeting () +
                " " +
                (selectedStation?.StationName ?? "")}
              <Text style={styles.smallCircle}>●</Text>
            </Text>
          ) : (
            <Text style={{ ...styles.welcomeText }}>
              {translate("homeScreen.submitW9ToActivate")}
              <Text style={styles.smallCircle}>●</Text>
            </Text>
          )}

          <View style={styles.titleInnerView}>
            <Text style={styles.titleSmall}>
             <Text  style={styles.lightText}> {translate("homeScreen.stationId")}</Text>: {" "}
              {selectedStation?.StationId ? (
                <Text >{selectedStation?.StationId}</Text>
              ) : (
                <Text style={styles.noStationId}> xxxxxx</Text>
              )}
            </Text>
            <Text style={styles.titleSmall}>
              {" "}
              <Text style={styles.lightText}>{translate("homeScreen.todayIs")}</Text>: {formattedTime()}
            </Text>
          </View>
        </View>
      </View>

      {/*feedbackRating && feedbackRating > 0 && (
        <View style={styles.feedbackContainer}>
          <View pointerEvents="none">
            <UserFeedback maxNumber={5} rating={feedbackRating} />
          </View>
        </View>
      )*/}

      <Image
        source={require("../../../../assets/images/logo.png")}
        style={styles.logo}
      />

      {redemptionCount > 0 && (
        <View style={styles.successContainer}>
          <View style={styles.successLeftView}>
            <VIcon
              family="FontAwesome"
              name="check"
              size={spacings.icons.small}
              color={color.palette.white}
            />
          </View>
          <View style={styles.successRightView}>
            <Text style={styles.successText}>{redemptionCount}</Text>
          </View>
        </View>
      )}

      <View style={styles.buttons}>
        <>
          <View style={styles.largeCircleView}>
            <CircleButton
              innerText
              noText
              style={styles.sideLargeCircle}
              textStyle={styles.sideLargeCircleText}
              text={
                canValidateWash
                  ? translate("homeScreen.validateWash")
                  : translate("homeScreen.submitW9")
              }
              onPress={() => (canValidateWash ? goToScanner() : submitW9())}
              icon={
                canValidateWash ? (
                 <ValidateIcon />
                ) : (
                  <Text
                    style={styles.w9}
                  >
                    {translate("homeScreen.w9")}
                  </Text>
                )
              }
            />
            {!selectedStation && <View style={styles.infoView}>
              <CircleButton
                noText
                style={styles.infoSmallCircle}
                onPress={submitW9Info}
                icon={
                  <VIcon
                    family="Ionicons"
                    name={`${prefix}-information-circle-outline`}
                    size={spacings.icons.small}
                    color={color.palette.white}
                  />
                }
              />
            </View>}
          </View>
          <View
            style={{
              ...styles.circleRow,
              paddingHorizontal: canValidateWash
                ? spacings.medium
                : 0.14 * screenDimensions.width,
            }}
          >
            {canValidateWash && (
              <CircleButton
                innerText
                noText
                style={styles.sideCircle}
                textStyle={styles.sideText}
                text={translate("homeScreen.recentWashes")}
                onPress={goToDashboard}
                icon={
                 <RecentWashIcon />
                }
              />
            )}
            <CircleButton
              innerText
              noText
              style={styles.sideCircle}
              textStyle={styles.sideText}
              text={translate("homeScreen.contactWashub")}
              onPress={openContact}
              icon={
                <ContactIcon />
              }
            />
            <CircleButton
              innerText
              noText
              style={styles.sideCircle}
              textStyle={styles.sideText}
              onPress={shareMerchant}
              text={translate("homeScreen.shareApp")}
              icon={
                <ShareIcon />
              }
            />
          </View>
        </>
      </View>
      </ScrollView>
    </Screen>
  )
}

export default HomeScreen
