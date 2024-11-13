import React from "react";
import { View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { translate } from "../../i18n";
import { spacings } from "../../../../shared/theme";
import {
  WASHUB_EMAIL,
  WASHUB_SMS_NUMBER,
  contactViaPhone,
} from "../../../../shared/utils/common";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./contact-modal.style";
import Communications from "react-native-communications";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import { AutoImage } from "../../../../shared/components";
import CallIcon from '../../../../shared/components/svg/phone-icon'
import TextIcon from '../../../../shared/components/svg/text-icon'
import EmailIcon from '../../../../shared/components/svg/email-icon'


export const HelpContent = ({ contactWashub }: { contactWashub?: boolean }) => {
  const modal = useModal();
  return (
    <View style={styles.helpContainer}>
     
      {contactWashub && (
        <Text
          style={styles.ContactBoldText}
          text={translate("loginScreen.contactWashub")}
        />
      )}
      {!contactWashub && (
        <Text
          style={styles.HelpContentBoldText}
          text={translate("signupScreen.getHelp")}
        />
      )}
      {!contactWashub && (
        <View style={styles.HelpContentView}>
          <Text
            style={styles.HelpContentContentText}
            text={translate("signupScreen.getHelpDetail_0")}
          />
          <Text
            style={styles.HelpContentContentText}
            text={translate("signupScreen.getHelpDetail_1")}
          />
        </View>
      )}
      <View style={styles.helpButtonsView}>
        <CircleButton
          noCircle
          text={translate("signupScreen.call_washub")}
          onPress={() => contactViaPhone()}
          textStyle={styles.iconText}
          icon={
            <CallIcon style={styles.emailIconsStyle}  />
          }
        />
        <CircleButton
          noCircle
          text={translate("signupScreen.text_washub")}
          onPress={() => Communications.text(WASHUB_SMS_NUMBER, null)}
          textStyle={styles.iconText}
          icon={
            <TextIcon style={styles.emailIconsStyle}  />
          }
        />
        {contactWashub ? (
          <CircleButton
            noCircle
            text={translate("loginScreen.emailWashub")}
            onPress={() =>
              Communications.email(
                [WASHUB_EMAIL],
                null,
                null,
                translate("loginScreen.supportMessage"),
                null
              )
            }
            textStyle={styles.iconText}
            icon={
              <EmailIcon style={styles.emailIconsStyle}  />
             }
          />
        ) : (
          <CircleButton
            noCircle
            text={translate("common.cancel")}
            onPress={() => modal.hideModal()}
            textStyle={{...styles.iconText, paddingHorizontal: spacings.smaller}}
            icon={
              <AutoImage style={styles.closeIconsStyle}  source={require('../../../assets/images/close-icon.png')} />
            }
          />
        )}
      </View>
    </View>
  );
};
