import React from "react"
import { View, Image } from "react-native"
import useModal from "../../../../shared/contexts/modal/useModal"
import { translate } from "../../i18n"
import { color, spacings } from "../../../../shared/theme"
import { Text } from "../../../../shared/components/text/text"
import { styles } from "./redeem-modal.style"
import { navigate } from "../../navigators"
import { VIcon } from "../../../../shared/components/v-icon/v-icon"
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import CancelIcon from "../../../../shared/components/svg/close-icon"

const RedeemModal = ({}) => {
  const modal = useModal()
  const goToRedeemLocations = () => {
    modal.hideModal()
    navigate("home", { screen: "redeemLocations" })
  }
  const goToFavorites = () => {
    modal.hideModal()
    navigate("home", { screen: "favourites" })
  }
  const mediumIconSize = {
    height: spacings.icons.medium,
    width: spacings.icons.medium,
    alignSelf: "center",
  } as any
  return (
    <View style={styles.redeemContainer}>
      <Text
        style={styles.redeemContentBoldText}
        text={translate("homeScreen.redeemWash")}
      />
      <View style={styles.redeemButtonsView}>
        <CircleButton
          noCircle
          text={translate("homeScreen.myFavorites")}
          textStyle={styles.redeemTextLocation}
          onPress={() => goToFavorites()}
          icon={
            <VIcon
              family="MaterialCommunityIcons"
              name="cards-heart-outline"
              size={spacings.icons.medium}
              color={color.palette.white}
            />
          }
        />
        <CircleButton
          noCircle
          text={translate("homeScreen.findLocation")}
          onPress={() => goToRedeemLocations()}
          textStyle={styles.redeemTextFavorite}
          icon={
            <Image
              style={{ 
                height: spacings.icons.huge,
                width: spacings.icons.huge
               }}
              resizeMode="contain"
              source={require("../../../assets/images/find-location.png")}
            />
          }
        />

        <CircleButton
          noCircle
          text={`${translate("common.cancel")}`}
          onPress={() => modal.hideModal()}
          textStyle={styles.redeemTextCancel}
          icon={
            <Image
              style={mediumIconSize}
              resizeMode="contain"
              source={require("../../../assets/images/close-icon.png")}
            />
          }
        />
      </View>
    </View>
  )
}

export default RedeemModal
