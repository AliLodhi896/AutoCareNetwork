import React, { useState } from "react"
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native"
import Share from "react-native-share"
import useModal from "../../../../shared/contexts/modal/useModal"
import { styles } from "./validate-wash-modals.style"
import { translate } from "../../i18n"
import { AutoImage, Button, VIcon } from "../../../../shared/components"
import { NumericKeypad } from "../number-keypad/number-keypad"
import { WebView } from "react-native-webview"
import { generateHTML } from "../../../../shared/utils/common"
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import { color, spacings } from "../../../../shared/theme"
import { HelpContent } from "../contact-modal/contact-modal"
import { navigate } from "../../navigators"

interface ManuallyValidateWashProps {
  onSubmit: (code: string) => void
  onCancel: () => void
}
export const ManuallyValidateWash = (props: ManuallyValidateWashProps) => {
  const modal = useModal()
  const [code, setCode] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onCancel = () => {
    modal.hideModal()
    props.onCancel()
  }

  const onSubmit = () => {
    if(code === ""){
      setErrorMessage(translate("validateWashScreen.validations.cardCode.required"))
    }
    else {
      setLoading(true)
      props.onSubmit(code)
    }

  }

  return (
    <View style={[styles.container, styles.fullContainer]}>
      <ScrollView>
        <View style={styles.header}>
          <Text  style={styles.title}>
            {translate("validateWashScreen.validateWash")}
          </Text>
        </View>
        <View style={styles.body}>
          <Text  style={styles.text}>
            {translate("validateWashScreen.enterCardCodeDetails")}
          </Text>
          <Text
            style={[styles.codeText, !code.length && styles.codePlaceholder]}
          >
            {code ? code : translate("validateWashScreen.enterCardCode")}
          </Text>
          {
             errorMessage ? <Text  style={{...styles.text, color: color.palette.yellow, marginBottom: spacings.small, marginTop: spacings.small}}>
                 {errorMessage}
               </Text>: null
          }
        </View>
        <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 5 }}>
          <NumericKeypad
            onSelect={(val) => {
              if(errorMessage){
                setErrorMessage("")
              }
              setCode(`${code}${val}`)
            }}
            onDelete={() => {
              if(errorMessage){
                setErrorMessage("")
              }
              if (code.length > 0) {
                setCode(code.substring(0, code.length - 1))
              }
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <CircleButton
            noText
            style={styles.circle}
            //text={translate("common.cancel")}
            onPress={onCancel}
            textStyle={styles.iconText}
            icon={
              <AutoImage
                style={styles.iconsStyle}
                source={require("../../../assets/images/close-icon.png")}
              />
            }
          />

          {loading ? (
            <Button loading={loading} />
          ) : (
            <CircleButton
              noText
              style={{...styles.circle, marginLeft: spacings.huge}}
              //text={translate("common.submit")}
              onPress={onSubmit}
              textStyle={styles.iconText}
              icon={
                <VIcon
                  family="FontAwesome"
                  name="check"
                  size={spacings.large}
                  color={color.palette.white}
                />
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

interface ValidateWashFeedbackProps {
  response: { success: boolean; message: string; htmlMessage: string }
  loading: boolean
}
export const ValidateWashFeedback = (props: ValidateWashFeedbackProps) => {
  const modal = useModal()
  const { loading, response } = props
  const { htmlMessage, message, success } = response
  const responseMessage = htmlMessage || message

  const onCancel = () => {
    modal.hideModal()
    navigate("home")
  }

  const shareThisApp = () => {
    let url = "https://www.autocarenetwork.com/apps"
    let shareOptions = {
      title: translate("settingsScreen.share.title"),
      message: translate("settingsScreen.share.message", {
        url: Platform.OS === "android" ? `\n ${url}` : "",
      }),
      url,
      subject: translate("settingsScreen.share.subject"), //  for email
    }
    Share.open(shareOptions)
  }

  const contactAutocare = () => {
    modal.hideModal()
    modal.showModal(<HelpContent contactWashub />)
  }

  return (
    <View style={[styles.container, styles.whiteContainer]}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          style={styles.loader}
          size="large"
        />
      ) : (
        <>
          {responseMessage && (
            <WebView
              originWhitelist={["*"]}
              key={responseMessage}
              renderLoading={() => (
                <View style={styles.webLoader}>
                  <ActivityIndicator size="large" color="#222" />
                </View>
              )}
              onShouldStartLoadWithRequest={(req) => {
                if (req.url === "autocare://actions/share-app") {
                  shareThisApp()
                  return false
                }
                return true
              }}
              startInLoadingState={true}
              source={{
                html: generateHTML(responseMessage),
              }}
              containerStyle={styles.webviewContainer}
              style={styles.webview}
            />
          )}
        </>
      )}

      <View style={[styles.buttonsContainer, styles.floatingButtons]}>
        <CircleButton
          innerText
          noText
          onPress={() => onCancel()}
          style={styles.largeCircle}
          textStyle={styles.largeCircleText}
          text={translate("validateWashScreen.backToHome")}
          icon={
            <AutoImage
              source={require("../../../assets/images/home-icon.png")}
              style={styles.homeIcon}
            />
          }
        />

        {success && (
          <CircleButton
            innerText
            noText
            onPress={contactAutocare}
            style={styles.largeCircle}
            textStyle={styles.largeCircleText}
            text={translate("validateWashScreen.contactWashub")}
            icon={
              <AutoImage
                source={require("../../../assets/images/contact-icon.png")}
                style={styles.contactIcon}
              />
            }
          />
        )}
      </View>
    </View>
  )
}
