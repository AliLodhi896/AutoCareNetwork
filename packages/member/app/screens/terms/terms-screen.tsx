"use strict";

import { ScrollView, View, Text as RNText } from "react-native";
import HTML from "react-native-render-html";

import React, { useState } from "react";
import { useAppState } from "../../context/app-state-context";
import { color, fontsize, screenDimensions, typography } from "../../../../shared/theme";
import useModal from "../../../../shared/contexts/modal/useModal";
import { EntitlementModal } from "../../components/entitlement-modal/entitlement-modal";
import { styles } from "./terms-screen.styles";
import { AutoImage, Button, GradientBackground, Screen, Text } from "../../../../shared/components";
import { translate } from "../../i18n";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { centerContent } from "../../../../shared/components/screen/screen.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"
import { normalize } from "../../../../shared/utils/normalize"
import { getEntitlements } from "../../utils/common";

const htmlContent = `
    <div style="text-indent: 0px; text-align: left; font-family:${
      typography.secondary
    }; line-height: 1.7em">
    <p>${translate("profileScreen.termsHtml0")}:</p>
    <hr/>
    <div style="color: ${color.palette.red}">
        <li>${translate("profileScreen.termsHtml1")}</li>
        <li>${translate("profileScreen.termsHtml2")}</li>
        <li>${translate("profileScreen.termsHtml3")}</li>
        <li>${translate("profileScreen.termsHtml4")}</li>
    </div>
    <hr/>
    <p>
    ${translate("common.note")}:${translate("profileScreen.termsHtml5")}
    </p>
    <hr/>
    <p>${translate("profileScreen.termsHtml6")}</p>
    </div>
`

const TermsScreen = () => {
  const { appState } = useAppState();
  const cards = appState.cards;
  const modal = useModal();
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const advanceEntitlements = () => {
    const entCopy = [...entitlements];
    entCopy.shift();
    setEntitlements(entCopy);
    modal.hideModal();
  };
  const showEntitlements = () => {
    const newEntitlements = getEntitlements(cards);
    setEntitlements(newEntitlements);
    modal.showModal(
      <EntitlementModal
        entitlements={newEntitlements}
        advanceEntitlements={advanceEntitlements}
      />
    );
  };

  return (
    <Screen
      style={[
        styles.container,
        centerContent({ insets: { top: insets.top, bottom: insets.bottom } }),
      ]}
      statusBar="light-content"
      unsafe
    >
      <GradientBackground />

      <View style={styles.containerInner}>
        <ScrollView indicatorStyle="black">
          <View style={styles.header}>
            <Text style={styles.title}>
              {translate("profileScreen.whatsIncluded")}
              <RNText
                style={{
                  fontSize: fontsize.massive,
                  color: color.primary,
                }}
              >
                .
              </RNText>
            </Text>
          </View>

          <HTML
            contentWidth={screenDimensions.width}
            source={{ html: htmlContent }}
            baseStyle={styles.htmlBody}
          />
        </ScrollView>
        <View pointerEvents="box-none" style={styles.footer}>
          <Button
            textStyle={styles.buttonStyle}
            text={translate("profileScreen.otherPlanEntitlements")}
            onPress={showEntitlements}
          />
        </View>
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
          <View>
            <AutoImage
              resizeMode="contain"
              source={require("../../../assets/images/profile-icon-red.png")}
              style={{
                height: normalize(35),
                width: normalize(30),
              }}
            />
          </View>
        }
      />
    </Screen>
  )
};

export default TermsScreen;
