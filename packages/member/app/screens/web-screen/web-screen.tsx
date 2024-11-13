import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

import { StyleSheet, Platform } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { useHeaderHeight } from "@react-navigation/elements";
import { WebView } from "react-native-webview";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./web-screen.styles";
import { useAppState } from "../../context/app-state-context";
import { Card, Product } from "../../services/api";
import { VehicleInfo } from "../../../../shared/global-types";
import useModal from "../../../../shared/contexts/modal/useModal";
import { translate } from "../../i18n";
import CopyTutorial from "../../components/copy-tutorial/copy-tutorial-modal";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { Screen, VIcon } from "../../../../shared/components";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { color, spacings } from "../../../../shared/theme";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { palette } from "../../../../shared/theme/palette";

//hack to make the app look like safari due to bug in https://www.hillsidetoyota.nyc/service-appointment/
const SAFARI_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1";
const CUSTOM_UA = Platform.select({ ios: SAFARI_UA, android: undefined });

const PasteButton = (props: {
  label?: string;
  value?: string;
  selected: boolean;
  onPress: (label: string, value: string) => void;
}) => {
  const { label, value, selected, onPress } = props;
  const [pressed, setPressed] = useState(false);
  const defaultColor = selected ? color.palette.transparentRed : "transparent";
  const backgroundColor = pressed ? "#c8c8c8" : defaultColor;

  if (!label || !value) {
    return null;
  }
  const barContentStyle = {
     display: "flex",
     backgroundColor, 
     marginHorizontal: spacings.tiny, 
     justifyContent: "center",
     alignItems: "center"
  }
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      
      onPress={() => {
        onPress(label, value);
      }}
      style={[buttonStyle.button]}
    >
      <View style={barContentStyle}>
      <Text style={[buttonStyle.label]}>{label}</Text>
      </View>
    </Pressable>
  );
};

const buttonStyle = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    height: 40, borderRightWidth: 1, borderColor: palette.lineGray,
    display: "flex",
    minWidth: spacings.massive,
    alignItems: "center"
  },
  label: {
    paddingHorizontal: spacings.small,
    lineHeight: 14,
    paddingVertical: spacings.medium,
  },
});

const WebScreen = ({ route, navigation }) => {
  const webViewRef = useRef<any>(null);
  const { appState, setAppState } = useAppState();
  const { authState } = useAuthState();
  const { profile } = authState;
  const [selectedLabel, setSelectedLabel] = useState<String | null>(null);
  const modal = useModal();
  const hasCompletedTutorial = appState.hasCompletedCopyTutorial;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const card: Card | undefined = route.params?.card;
  const product: Product | undefined = route.params?.product;
  const vehicleInfo: VehicleInfo | undefined = card?.VehicleInfo;

  let copyFields = [
    { label: translate("webScreen.firstName"), value: profile?.FirstName },
    { label: translate("webScreen.lastName"), value: profile?.LastName },
    { label: translate("webScreen.phone"), value: profile?.Phone },
    { label: translate("webScreen.email"), value: profile?.Email },
    { label: translate("webScreen.zip"), value: profile?.ZipCode },
  ];

  if (vehicleInfo) {
    copyFields.push({
      label: translate("webScreen.vin"),
      value: vehicleInfo.VehicleIdNumber,
    });
    copyFields.push({
      label: translate("webScreen.make"),
      value: vehicleInfo.Make,
    });
    copyFields.push({
      label: translate("webScreen.model"),
      value: vehicleInfo.Model,
    });
    copyFields.push({
      label: translate("webScreen.year"),
      value: vehicleInfo.Year?.toString(),
    });
    copyFields.push({
      label: translate("webScreen.plate") + " #",
      value: vehicleInfo.LicensePlateNumber,
    });
    copyFields.push({
      label: translate("common.color"),
      value: vehicleInfo.Color,
    });
  }

  if (product) {
    copyFields.push({
      label: translate("webScreen.contractNumber"),
      value: product?.ContractNumber,
    });
    copyFields.push({
      label: translate("webScreen.expirationDate"),
      value: product.ExpirationDate,
    });
  }

  useEffect(() => {
    if (!hasCompletedTutorial) {
      modal.showModal(
        <CopyTutorial
          visible={modal.visible}
          onComplete={() => setAppState({ hasCompletedCopyTutorial: true })}
        />
      );
    }
  }, [hasCompletedTutorial]);

  const DoneBtn = () => {
    route.params?.onSubmit?.();
    navigation.goBack();
  };

  return (
    <View testID="WebScreen" style={styles.container}>
      <Screen
        style={[styles.container]}
        statusBar="light-content"
        unsafe
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={headerHeight + (StatusBar.currentHeight ?? 0)}
          style={styles.container}
        >
          <WebView
            ref={webViewRef}
            containerStyle={styles.root}
            autoManageStatusBarEnabled={false}
            style={styles.root}
            hideKeyboardAccessoryView
            //hack to make the app look like safari due to bug in https://www.hillsidetoyota.nyc/service-appointment/
            userAgent={CUSTOM_UA}
            source={{ uri: route.params.url }}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#222" />
              </View>
            )}
          />

          <View style={{...styles.pasteBar, paddingBottom: insets.bottom}}>
            <View style={styles.pasteHeader}>
              <Text style={styles.pasteHeaderTitle}>
                {translate("webScreen.copiableAccountInfo")}
              </Text>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  modal.showModal(
                    <CopyTutorial
                      visible={modal.visible}
                      onComplete={() => {
                        setAppState({ hasCompletedCopyTutorial: true })
                      }}
                    />
                  )
                }}
              >
                <Icon name="information-circle-outline" size={20} />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal style={styles.scrollContent}>
              {copyFields.map((f) => (
                <PasteButton
                  selected={selectedLabel === f.label}
                  onPress={(label, value) => {
                    setSelectedLabel(label)
                    Clipboard.setString(`${value}`)
                  }}
                  key={f.value}
                  label={f.label}
                  value={f.value}
                /> 
              ))}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <CustomHeader
          leftContent={
            <BackButton text={translate("common.close")} onPress={navigation.goBack} type="close" />
          }
          rightContent={
            <View style={styles.headerButton}>
              <TouchableOpacity onPress={DoneBtn}>
                <VIcon
                  family="Ionicons"
                  name={"checkmark-done"}
                  size={spacings.icons.small}
                  color={color.palette.white}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={DoneBtn}>
                <Text style={styles.headerButtonText}>
                  {translate("common.done")}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </Screen>
    </View>
  )
};

export default WebScreen;
