import React, { FC, useEffect, useRef, useState } from "react"
import { Alert, Platform, StyleSheet, View} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  AutoImage as Image,
  Button,
  WForm,
  WashubInput,
} from "../../../../shared/components"
import { NavigatorParamList } from "../../navigators"
import { object, string } from "yup"
import { color, spacings } from "../../../../shared/theme"
import { styles } from "./signup-screen.styles"
import { translate } from "../../i18n"
import useModal from "../../../../shared/contexts/modal/useModal"
import WashubClient from "../../services/api/api"
import { HelpContent } from "../../components/contact-modal/contact-modal"
import { Text } from "../../../../shared/components/text/text"
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import { WFormRef } from "../../../../shared/components/w-form"
import { isValidPhoneNumber } from "libphonenumber-js"
import { StationInfo, StationOnboardingOptions } from "../../types"
import { Checkbox } from "../../../../shared/components/checkbox/checkbox"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { priceFormatter } from "../../utils/common"
import { BackButton } from "../../../../shared/components/back-button/back-button"
import { formatToPhone } from "../../../../shared/utils/common"
import AvoidingView from "../../../../shared/components/avoiding-view/avoiding-view-screen"

interface SignupUser {
  StationName: string
  StationID: string | undefined
  StationAddress: string
  StationState: string
  StationCity: string
  StationZip: string
  StationPhone: string
  StationOwnerFirstName: string
  StationOwnerLastName: string
  StationOwnerEmail: string
  StationOwnerMobilePhone: string
  StationCWManager: string
  StationServiceLevel: string
  StationFullServiceWashPrice: string
  StationExteriorOnlyWashPrice: string
}


const validations = object().shape({
  StationName: string().required(
    translate("signupScreen.validations.stationName.required")
  ),
  StationAddress: string().required(
    translate("signupScreen.validations.stationAddress.required")
  ),
  StationState: string().required(
    translate("signupScreen.validations.stationState.required")
  ),
  StationCity: string().required(
    translate("signupScreen.validations.stationCity.required")
  ),
  StationZip: string().required(
    translate("signupScreen.validations.stationZip.required")
  ),
  StationPhone: string()
    .test(
      "is-us-phone",
      translate(
        "signupScreen.validations.stationOwnerMobilePhone.validUsPhoneNumber"
      ),
      (value) => {
        const isValid = isValidPhoneNumber(value, "US")
        return isValid
      }
    )
    .required(translate("signupScreen.validations.stationPhone.required")),
  StationOwnerFirstName: string().required(
    translate("signupScreen.validations.stationOwnerFirstName.required")
  ),
  StationOwnerLastName: string().required(
    translate("signupScreen.validations.stationOwnerLastName.required")
  ),
  StationOwnerEmail: string()
    .required(translate("signupScreen.validations.stationOwnerEmail.required"))
    .email(translate("signupScreen.validations.stationOwnerEmail.email")),
  StationOwnerMobilePhone: string()
    .test(
      "is-us-phone",
      translate(
        "signupScreen.validations.stationOwnerMobilePhone.validUsPhoneNumber"
      ),
      (value) => {
        return isValidPhoneNumber(value, "US")
      }
    )
    .required(
      translate("signupScreen.validations.stationOwnerMobilePhone.required")
    ),
  StationCWManager: string().required(
    translate("signupScreen.validations.stationCWManager.required")
  ),
  StationServiceLevel: string().required(
    translate("signupScreen.validations.stationServiceLevel.required")
  ),
  StationFullServiceWashPrice: string().required(
    translate("signupScreen.validations.stationFullServiceWashPrice.required")
  ),
  StationExteriorOnlyWashPrice: string()
    .required(
      translate(
        "signupScreen.validations.stationExteriorOnlyWashPrice.required"
      )
    )
    .nullable()
})
export const SignUpScreen: FC<
  StackScreenProps<NavigatorParamList, "signup">
> = observer(({ route, navigation }) => {
  const WFormRef = useRef<WFormRef>(null)
  const modal = useModal()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const [___, setIsFetchingStation] = useState(false)
  const [
    ____,
    setOnboardingOptions,
  ] = useState<StationOnboardingOptions>()
  const stationId = route?.params?.stationId ?? undefined;

  const [existingStation, setExistingStation] = useState<StationInfo>({
    StationName: "",
    StationID: stationId,
    StationAddress: "",
    StationState: "",
    StationCity: "",
    StationZip: "",
    StationPhone: "",
    StationOwnerFirstName: "",
    StationOwnerLastName: "",
    StationOwnerEmail: "",
    StationOwnerMobilePhone: "",
    StationCWManager: "",
    StationServiceLevel: "1",
    StationFullServiceWashPrice: "",
    StationExteriorOnlyWashPrice: "",
    ...(route.params?.station || {}),
  })
  const [serviceLevel, setServiceLevel] = useState(1)

  useEffect(() => {
    setIsFetchingStation(true)
    WashubClient.getStationOnboardingOptions().then((onboardingResult) => {
      setOnboardingOptions(onboardingResult.result)
      if (stationId) {
        WashubClient.getStationInfo(stationId)
          .then((station) => {
      
            const {
              ResponseCode: __,
              ResponseMessage: ___,
              StationFullServiceWashPrice,
              StationExteriorOnlyWashPrice,
              ...rest
            } = station?.result ?? {}
      
            setExistingStation((previousState) => ({
              ...previousState,
              ...rest,
              StationFullServiceWashPrice:
              StationFullServiceWashPrice ? ("$" + (StationFullServiceWashPrice.toString())) : "",
              StationExteriorOnlyWashPrice: StationExteriorOnlyWashPrice ? ("$" + (StationExteriorOnlyWashPrice.toString())) : "",
            }))
            setIsFetchingStation(false)
            setServiceLevel(rest.StationServiceLevel)
          })
          .catch((e) => {
            console.error(e)
            setIsFetchingStation(false)
            navigation.goBack()
          })
      } else {
        setIsFetchingStation(false)
      }
    })
  }, [stationId])

  const openHelp = () => {
    modal.showModal(<HelpContent />)
  }

  const signUpUser = async (currentStation: SignupUser) => {
    const {StationExteriorOnlyWashPrice,StationFullServiceWashPrice, ...rest } = currentStation
    const newStation = {
      ...rest,
      StationExteriorOnlyWashPrice: StationExteriorOnlyWashPrice?.replace(
        "$",
        ""
      ),
      StationFullServiceWashPrice: StationFullServiceWashPrice?.replace(
        "$",
        ""
      ),
    }
    setLoading(true)
    let response = null
    if (newStation.StationID) {
      response = await WashubClient.updateStation({
        ...existingStation,
        ...newStation,
      } as any)
    } else {
      response = await WashubClient.createStation(
        (newStation as unknown) as any
      )
    }

    if (!response?.error) {
      let message
      if (newStation.StationID) {
        message = translate("editStationScreen.editStationSuccess")
      } else {
        message = translate("editStationScreen.createStationSuccess")
      }
      Alert.alert("Success", message, [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack()
          },
        },
      ])
    }
    setLoading(false)
  }
  const headerHeight = 220 + insets.top
  const innerStyles = StyleSheet.create({
    container: { flex: 1, marginTop: headerHeight },
    header: {
      backgroundColor: color.palette.red,
      flexDirection: "column",
      height: headerHeight,
      paddingBottom: spacings.medium,
      position: "absolute",
      top: 0,
      paddingTop: insets.top,
      width: "100%",
    },
    back: {
      flexDirection: "row",
      paddingLeft: spacings.smaller,
      marginTop: Platform.select({ android: 35, default: 0 }),
    },
  })

  return (
    <AvoidingView
     merchant
     withoutBackgroundImage
     backgroundColor={color.palette.lightBlackBackground}
     header={   <View style={innerStyles.header}>
    <View style={innerStyles.back}>
    <BackButton type="back" text={translate('common.back')} onPress={navigation.goBack} textStyle={{color: color.palette.white}} color={color.palette.white} />
    </View>
    <View>
      <View style={styles.logoView}>
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.titleView}>
        <Text
          style={styles.title}
          text={
            existingStation?.StationID
              ? translate("editStationScreen.title")
              : translate("signupScreen.registerMembership")
          }
        />
      </View>
    </View>
  </View>}
    >
      <View style={innerStyles.container}>
          <WForm
            style={{...styles.form}}
            key={existingStation?.StationName}
            ref={WFormRef}
            onSubmit={(value) => {
              signUpUser(value as SignupUser)
            }}
            validationSchema={validations}
            initialValue={existingStation}
          >
            <WashubInput
              placeholder={translate("signupScreen.stationName")}
              autoCapitalize={"words"}
              fieldName="StationName"
            />

            <WashubInput
              placeholder={translate("signupScreen.stationAddress")}
              fieldName="StationAddress"
            />
            <WashubInput
              placeholder={translate("signupScreen.stationState")}
              autoCapitalize={"words"}
              fieldName="StationState"
            />
            <WashubInput
              placeholder={translate("signupScreen.stationCity")}
              autoCapitalize="words"
              fieldName="StationCity"
            />

            <WashubInput
              fieldName="StationZip"
              keyboardType={"numeric"}
              placeholder={translate("signupScreen.stationZip")}
            />

            <WashubInput
              fieldName="StationPhone"
              keyboardType={"phone-pad"}
              formatter={formatToPhone}
              placeholder={translate("signupScreen.stationPhone")}
            />

            <WashubInput
              placeholder={translate("signupScreen.stationOwnerFirstName")}
              autoCapitalize={"words"}
              fieldName="StationOwnerFirstName"
            />

            <WashubInput
              placeholder={translate("signupScreen.stationOwnerLastName")}
              autoCapitalize={"words"}
              fieldName="StationOwnerLastName"
            />

            <WashubInput
              placeholder={translate("signupScreen.stationOwnerEmail")}
              fieldName="StationOwnerEmail"
              autoComplete="email"
              keyboardType={"email-address"}
            />

            <WashubInput
              fieldName="StationOwnerMobilePhone"
              keyboardType={"phone-pad"}
              formatter={formatToPhone}
              placeholder={translate("signupScreen.stationOwnerMobilePhone")}
            />

            <WashubInput
              placeholder={translate("signupScreen.stationCWManager")}
              fieldName="StationCWManager"
            />

            <View style={styles.checkboxRow}>
              <Text style={styles.checkboxText}>
                {translate("signupScreen.exteriorOnly")}
              </Text>
              <Checkbox
                value={serviceLevel === 0}
                onToggle={() => setServiceLevel(0)}
              />
            </View>
            <View style={styles.checkboxRow}>
              <Text style={styles.checkboxText}>
                {translate("signupScreen.fullService")}
              </Text>
              <Checkbox
                value={serviceLevel === 1}
                onToggle={() => setServiceLevel(1)}
              />
            </View>

            {serviceLevel === 1 && (
              <WashubInput
                placeholder={translate(
                  "signupScreen.stationFullServiceWashPrice"
                )}
                fieldName="StationFullServiceWashPrice"
                formatter={priceFormatter}
                keyboardType={"numeric"}
              />
            )}
            <WashubInput
              placeholder={translate(
                "signupScreen.stationExteriorOnlyWashPrice"
              )}
              formatter={priceFormatter}
              fieldName="StationExteriorOnlyWashPrice"
              keyboardType={"numeric"}
            />

            <Button
              loading={loading}
              disabled={loading}
              onPress={() => WFormRef.current?.submit()}
              style={styles.registerBtn}
            >
              <Text style={{ color: color.palette.white }}>
                {existingStation?.StationID
                  ? translate("signupScreen.save")
                  : translate("signupScreen.register")}
              </Text>
            </Button>

            <View style={styles.help}>
              <View style={styles.helpInner}>
                <CircleButton
                  blur
                  text={translate("signupScreen.registrationHelp")}
                  onPress={() => openHelp()}
                  style={styles.sideCircle}
                  textStyle={styles.sideText}
                  icon={
                    <Image style={styles.helpIconStyle}  source={require('../../../assets/images/help-icon.png')} />
                  }
                />
              </View>
            </View>
          </WForm>
        </View>
    </AvoidingView>
   
  )
})
