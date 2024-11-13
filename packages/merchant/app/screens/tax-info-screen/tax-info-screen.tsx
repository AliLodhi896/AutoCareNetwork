import React, { FC } from "react";
import {
  Alert,
  View,
  Linking,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "./tax-info-screen.style";
import { PageWithCard } from '../../../../shared/components/page-with-card/page-with-card'
import { NavigatorParamList as TabNavigatorParamList } from "../../navigators/app-navigator";
import { translate } from "../../i18n";
import WashubClient from "../../services/api/api";
import FileViewer from 'react-native-file-viewer';
import { Text, Button } from "../../../../shared/components";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { useAppState } from "../../../app/context/app-state-context";
import useModal from "../../../../shared/contexts/modal/useModal";
import { AlertModal } from '../../components/alert-modal/alert-modal';
import {DOCUSIGN_URL} from '../../../../shared/services/api/api-constant';
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { color } from "../../../../shared/theme";

export const TaxInfoScreen: FC<
  StackScreenProps<TabNavigatorParamList, "taxInfo">
> = ({navigation}) => {
  const { authState } = useAuthState();
  const { appState, setAppState } = useAppState();
  const hasSubmitedW9 = authState.profile?.hasSubmittedW9
  const { selectedStation } = appState
  const modal = useModal();

  const submitW9 = async () => {
    await  Linking.openURL(DOCUSIGN_URL)
    setAppState({hasSubmittedW9: true})
    setTimeout(() => {
      modal.showModal(<AlertModal
        title={translate("homeScreen.alert.submitted")} 
        content={translate("homeScreen.alert.submitted_message1")} />)
    }, 4000);
   }


  const viewW9 = async () => {
    const res = await WashubClient.getW9(selectedStation.W9 || '',);
    if (res) {
      FileViewer.open(res);
    } else {
      Alert.alert(translate("common.error"), translate("taxInfoScreen.unableToLoadW9"), [{ text: translate("common.ok") }]);
    }
  }

  return (
    <PageWithCard
      appType="merchant"
      nav={{
        title: translate('taxInfoScreen.taxInformation'),
        iconFamily: "FontAwesome",
        iconName: 'money'
      }}
      BackButton={<BackButton onPress={navigation.goBack} type="close" text={translate("common.close")} color={color.palette.white} />}
      testID="taxInfo"
    >

      <View style={styles.container}>

        <Button
          preset="primary"
          testID="submitW_9Btn"
          text={translate("taxInfoScreen.SUBMIT_W9")}
          onPress={submitW9}
        />

        {selectedStation && (
          <Button
            preset="link"
            testID="view_9Btn"
            style={styles.link}
            text={translate("taxInfoScreen.viewW9")}
            onPress={viewW9}
          />
        )}

        {hasSubmitedW9 && !selectedStation?.W9 && (
          <Text style={styles.longMessage}>
            {translate("taxInfoScreen.hasSubmittedW9")}
          </Text>
        )}


      </View>

    </PageWithCard>
  )
};
