import React, { useState } from "react";
import { View, Linking, Alert, ScrollView } from "react-native";
import { styles } from "./settings-modals.style";
import { translate } from "../../i18n";
import useModal from "../../../../shared/contexts/modal/useModal";
import { Card } from "../../../../shared/services/api/api.types";
import {
  formattedCode,
  getMemberNumber,
  getWashText,
} from "../../../../shared/services/api/Utils";
import WashubClient from "../../services/api/api";
import { isDealerBundleApp } from "../../../../shared/services/api/api-constant";
import { navigate } from "../../navigators";
import { color, spacings } from "../../../../shared/theme";
import Communications from "react-native-communications";
import {
  WASHUB_TEL_URL,
  WASHUB_EMAIL,
  WASHUB_SMS_NUMBER,
} from "../../../../shared/utils/common";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { AutoImage, Button, LineInput, Text, VIcon } from "../../../../shared/components";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
export const LinkNewMembershipCardModal = () => {
  const modal = useModal();

  const [memberNumber, setMemberNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const MEMBER_NUM_PREFIX = isDealerBundleApp() ? "DB" : "";

  const formattedNumber = `${MEMBER_NUM_PREFIX}${memberNumber}`;

  const linkCard = async () => {
    setLoading(true);
    const { error } = await WashubClient.linkCard(formattedNumber);
    if (!error) {
      Alert.alert("Success", "Card Linked Successfully");
      modal.hideModal();
    } else {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("settingsScreen.items.linkNewMembershipCard")}
        </Text>
      </View>

      <View style={styles.body}>
        <LineInput
          placeholder={translate("settingsScreen.enterMemberNumber")}
          placeholderTextColor={color.palette.black}
          keyboardType={"numeric"}
          containerStyle={{ backgroundColor: "white",  width: "100%" }}
          textInputStyle={{ minHeight: 44 }}
          fieldName="fieldName"
          onChange={(text) => {
            if (!text.includes(MEMBER_NUM_PREFIX)) {
              setMemberNumber("");
            } else {
              setMemberNumber(
                text.replace(MEMBER_NUM_PREFIX, "").toLocaleUpperCase()
              );
            }
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <CircleButton
            noText
            style={styles.circle}
            onPress={() => modal.hideModal()}
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
              onPress={linkCard}
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
  );
};

export const ContactAutocareModal = () => {
  const modal = useModal();

  const contactViaPhone = () => {
    const showPrompt = () => {
      Alert.alert("Contact Washub", "Please call (877) 365-WASH (9274)", [
        { text: "OK" },
      ]);
    };

    Linking.canOpenURL(WASHUB_TEL_URL)
      .then((supported) => {
        if (!supported) {
          showPrompt();
        } else {
          Linking.openURL(WASHUB_TEL_URL).catch(showPrompt);
        }
      })
      .catch(showPrompt)
      .finally(() => modal.hideModal());
  };

  const contactViaSMS = () => {
    Communications.text(WASHUB_SMS_NUMBER, null);
    modal.hideModal();
  };

  const contactViaEmail = () => {
    Communications.email(
      [WASHUB_EMAIL],
      null,
      null,
      "Washub Support Request",
      null
    );
    modal.hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("settingsScreen.items.contactAutoCare")}
        </Text>
      </View>

      <View style={styles.body}>
        <Text preset="fieldLabel" style={styles.text}>
          {translate("settingsScreen.contactMessage")}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={() => contactViaPhone()}>
          <VIcon
            family="MaterialCommunityIcons"
            name="phone"
            size={spacings.icons.medium}
            color={color.palette.white}
          />
          <Text>{translate("common.call")}</Text>
        </Button>
        <Button onPress={contactViaSMS}>
          <VIcon
            family="MaterialCommunityIcons"
            name="message-reply-text-outline"
            size={spacings.icons.medium}
            color={color.palette.white}
          />
          <Text>{translate("common.text")}</Text>
        </Button>
        <Button onPress={contactViaEmail}>
          <VIcon
            family="MaterialCommunityIcons"
            name="email"
            size={spacings.icons.medium}
            color={color.palette.white}
          />
          <Text>{translate("common.email")}</Text>
        </Button>
      </View>
    </View>
  );
};

export const DeleteWarningModal = () => {
  const modal = useModal();

  const { setAuthState } = useAuthState();
  const deleteAccount = async () => {
    await WashubClient.deleteAccount();
    setAuthState({ token: null });
    navigate("login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("settingsScreen.deleteAccountQuestion")}
        </Text>
      </View>

      <View style={styles.body}>
        <Text fontFamily="secondary" preset="fieldLabel" style={styles.text}>
          {translate("settingsScreen.deleteAccountWarning1")}
        </Text>
        <Text fontFamily="secondary" preset="fieldLabel" style={styles.text}>
          {translate("settingsScreen.deleteAccountWarning1")}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          text={translate("common.cancel")}
          onPress={() => modal.hideModal()}
        />
        <Button text={translate("common.confirm")} onPress={deleteAccount} />
      </View>
    </View>
  );
};

export const UnlinkConfirmationModal = (props: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const modal = useModal();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("memberNumberScreen.unregisterMembership")}
        </Text>
      </View>

      <View style={styles.body}>
        <Text preset="fieldLabel" style={styles.text}>
          {translate("memberNumberScreen.unregisterMembershipWarning1")}
        </Text>
        <Text preset="fieldLabel" style={styles.text}>
          {translate("memberNumberScreen.unregisterMembershipWarning2")}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          text={translate("common.cancel")}
          onPress={() => {
            modal.hideModal();
            props.onCancel();
          }}
        />
        <Button
          text={translate("common.confirm")}
          onPress={() => {
            modal.hideModal();
            props.onConfirm();
          }}
        />
      </View>
    </View>
  );
};

export const ShowMemberCardModal = (props: { card: Card }) => {
  const modal = useModal();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {formattedCode(getMemberNumber(props.card))}
        </Text>
      </View>

      <View style={styles.body}>
        <Text fontFamily="secondary" preset="fieldLabel" style={styles.text}>
          {getWashText(props.card)}
        </Text>
      </View>

      <Button text={translate("common.ok")} onPress={() => modal.hideModal()} />
    </View>
  );
};

/**
 *  Product
 */

export const ProductModal = () => {
  const modal = useModal();

  const [memberNumber, setMemberNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const MEMBER_NUM_PREFIX = isDealerBundleApp() ? "DB" : "";

  const formattedNumber = `${MEMBER_NUM_PREFIX}${memberNumber}`;

  const linkCard = async () => {
    setLoading(true);
    const { error } = await WashubClient.linkCard(formattedNumber);
    if (!error) {
      Alert.alert("Success", "Card Linked Successfully");
      modal.hideModal();
    } else {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("settingsScreen.items.linkNewMembershipCard")}
        </Text>
      </View>

      <View style={styles.body}>
        <Text preset="fieldLabel" style={styles.text}>
          {translate("settingsScreen.enterMemberNumber")}
        </Text>
        <LineInput
          containerStyle={{ backgroundColor: "white", marginBottom: 0 }}
          textInputStyle={{ minHeight: 44 }}
          fieldName="fieldName"
          onChange={(text) => {
            if (!text.includes(MEMBER_NUM_PREFIX)) {
              setMemberNumber("");
            } else {
              setMemberNumber(
                text.replace(MEMBER_NUM_PREFIX, "").toLocaleUpperCase()
              );
            }
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={{ backgroundColor: "#00000010", borderRadius: 2 }}
          text="Cancel"
          onPress={() => modal.hideModal()}
        />
        <Button
          loading={loading}
          disabled={loading}
          style={{ backgroundColor: "#00000030", borderRadius: 2 }}
          text="Save"
          onPress={linkCard}
        />
      </View>
    </View>
  );
};
