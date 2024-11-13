import React from "react"
import { ScrollView, View } from "react-native"
import {
  Button,
  GradientBackground,
  Screen,
  Text,
  VIcon,
} from "../../components"
import { styles } from "./settings-screen-container.style"
import { getBuildNumber, getVersion } from "react-native-device-info"
import { color, fontsize, spacings } from "../../theme"
import CustomHeader from "../../components/custom-header/custom-header"
import { BackButton } from "../back-button/back-button"
import { useNavigation } from "@react-navigation/native"
import { Api } from "../../services/api"
import {DottedLine} from "../dotted-line/dotted-line"

interface SettingsScreenContainerProps {
  UserProfileCard?: any
  SettingItems: any
  appType: "member" | "merchant"
  client: Api
  translate: any
  appContext: any
  WashubClient: any
  onLogout: () => void
}

export const SettingsScreenContainer = (
  props: SettingsScreenContainerProps
) => {
  const { translate, onLogout } = props
  const navigation = useNavigation()

  return (
    <Screen
      style={[styles.container]}
      backgroundColor={
        props.appType == "merchant"
          ? color.palette.lighterBlackBackground
          : color.palette.lightGreyBackground
      }
      statusBar="light-content"
      unsafe
    >
      <GradientBackground merchant={props.appType == "merchant"} />

      <ScrollView style={styles.safeArea}>
        <View style={styles.body}>
          <View
            style={[
              styles.card,
              {
                borderColor: color.palette.red,
              },
            ]}
          >
            {props.UserProfileCard && props.UserProfileCard}
            <View style={styles.dottedLine}>
              <DottedLine />
            </View>
            <ScrollView indicatorStyle="black" style={styles.scrollContainer}>
              {props.SettingItems}

              <Button
                style={styles.logoutButton}
                textStyle={styles.logoutText}
                text={translate("common.logout")}
                onPress={onLogout}
              />

              <View style={styles.footer}>
                {/* {Config.AN_DEBUG === 'true' && (
              <Text style={styles.debugText}>
                {translate("settingsScreen.debug")}
              </Text>
            )} */}
                <Text style={styles.versionText}>
                  {translate("settingsScreen.version", {
                    version: getVersion() + " " + getBuildNumber(),
                  })}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <CustomHeader
        styles={{
          backgroundColor:
            props.appType == "merchant"
              ? color.transparent
              : color.palette.lightGreyBackground,
          paddingHorizontal: spacings.smaller,
        }}
        leftContent={
          <BackButton
            type="close"
            color={
              props.appType == "merchant"
                ? color.palette.white
                : color.palette.black
            }
            text={translate("common.close")}
            onPress={navigation.goBack}
          />
        }
        centerContent={
          <View>
            <VIcon
              family="FontAwesome"
              name="gear"
              size={spacings.icons.medium}
              color={
                props.appType == "merchant"
                  ? color.palette.white
                  : color.palette.red
              }
            />
          </View>
        }
      />
    </Screen>
  )
}
