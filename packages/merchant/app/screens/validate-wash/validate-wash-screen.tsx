import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import 'react-native-reanimated'
import { NavigatorParamList as TabNavigatorParamList } from "../../navigators/app-navigator";
import { translate } from "../../i18n";
import { styles } from './validate-wash-screen.style'
import { GradientBackground, Screen, Text, VIcon } from "../../../../shared/components";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";
import { color, fontsize, screenDimensions } from "../../../../shared/theme";
import { Camera, useCameraDevices, CameraPermissionStatus, useFrameProcessor, } from 'react-native-vision-camera'
import { BarCodeReadEvent, RNCamera } from "react-native-camera"
import { DBRConfig, decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import  WashubClient from "../../services/api/api";
import { useAppState } from "../../context/app-state-context";
import useModal from "../../../../shared/contexts/modal/useModal";
import { ManuallyValidateWash, ValidateWashFeedback } from "../../components/validate-wash-modals/validate-wash-modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type entryTypeProp = 'manual' | 'scanner'
interface QRCodeScannerProps {
  entryMode: entryTypeProp
  validateWash: (barcode) => void
}


function BarcodCapturer({ barcodeCaptured }: { barcodeCaptured: (code: BarCodeReadEvent) => void }) {
  const cameraRef = useRef(null)
  const cameraAuthorizedError = (
    <Text style={{ color: color.palette.angry, fontSize: fontsize["medium+"] }}>
     {translate("validateWashScreen.cameraAccessDenied")}
    </Text>
  )

  return (
    <View>
      <RNCamera
        ref={cameraRef}
        ratio="1:1"
        captureAudio={false}
        style={styles.camera}
        notAuthorizedView={cameraAuthorizedError}
        type={"back"}
        onBarCodeRead={barcodeCaptured}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message:
            "We need your permission to use your camera to scan barcodes",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
    </View>
  )
}

const QRCodeScanner = (props: QRCodeScannerProps) => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back
  const [barcode, setBarcode] = useState<string>("");
  const [showGreenCrosshair, setShowGreenCrosshair] = useState(false);

  const showDeniedModal = () => {
    Alert.alert('Permission', 'Camera permission has been denied for this app. Go to settings and allow camera permission to be able to validate qr code by scan.', [
      {
        text: translate("common.cancel"),
        style: "cancel"
      },
      { text: "Go to settings", onPress: () => Linking.openSettings() }
    ])
  }

  const showInvalidQRAlert = () => {
    Alert.alert(
      'Invalid Code',
      'Please scan the barcode to the left of the Autocare QR Code',
      [{ text: translate("common.ok"), onPress: () => setBarcode(null) }],
    );
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    if (props.entryMode != 'scanner') {
      return;
    }
    const config: DBRConfig = {};
    config.template = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}"; //scan qrcode only
    const results: TextResult[] = decode(frame, config)
    if (results.length && results[0].barcodeText) {
      const code = results[0].barcodeText;
      REA.runOnJS(setBarcode)(code);
    }
  }, [4])

  useEffect(() => {
    if (barcode === 'http://www.autocarenetwork.us/adminlocationproximity.asp') {
      showInvalidQRAlert();
      return;
    }
    if (barcode.length) {
      props.validateWash(barcode);

      setShowGreenCrosshair(true);
      setTimeout(() => {
        setShowGreenCrosshair(false);
      }, 2000);
    }
  }, [barcode])


  useEffect(() => {
    setBarcode('');
  }, [props.entryMode])



  useEffect(() => {
    Camera.getCameraPermissionStatus()
      .then((res) => {
        if (res == 'denied') {
          showDeniedModal()
        }
        if (res == 'not-determined') {
          Camera.requestCameraPermission().then(newPerm => {
            if (newPerm == 'authorized') {
              setCameraPermission(res)
            } else {
              showDeniedModal();
            }
          })
        }
        setCameraPermission(res)
      })
  }, []);

  return (
    <View style={[styles.cameraContainer, showGreenCrosshair && styles.cameraContainerBlink]}>
      {/* {cameraPermission == 'denied' && <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 5 }}>{`Camera permission ${cameraPermission}`}</Text>} */}
      {device ? <Camera
      
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      /> : <BarcodCapturer barcodeCaptured={(code) => {
        console.warn("read code is: ", code)
        setBarcode(code.data)
      }}/>}
      <View style={styles.actionViewsStyle}>
        <Image style={styles.actionIconsStyle}  source={require('../../../assets/images/camera-icon.png')} />
      </View>
    </View>
  )
}

const freeHTML = `
<h3 style=\"text-align: center; margin: 15px; color: #00cc00; font-weight: bold\">
  <img
    src=\"https://www.autocarenetwork.com/Portals/0/Images/icons/icon-success.png\"
    alt=\"Success\"
  /><br />Approved
</h3>
<div style=\"text-align: center\">
  Customer is entitled to a
  <strong style=\"color: #cc0000\">FULL SERVICE</strong> car wash (any size
  vehicle)<br />
  Customer is responsible for all upgrades (less your posted full service price)
  <div style=\"margin: 10px auto\">
    <p>License Plate: ABC1234 (AS)</p>
    <p style=\"text-align: center\">
      <img
        src=\"https://autocarenetwork.com/Portals/0/VehiclePhotos/aaa1cdc303f712ed6b59e483bb34ab047f936614.png\"
        alt=\"Vehicle Photo\"
        style=\"max-width: 640px; width: 90%\"
      />
    </p>
  </div>
</div>
`



export const ValidateWashScreen: FC<
  StackScreenProps<TabNavigatorParamList, "validateWash">
> = ({navigation}) => {

  const { appState } = useAppState();
  const { selectedStation } = appState
  const circleIconSize = 0.13 * screenDimensions.width
  const [entryMode, setEntryMode] = useState<entryTypeProp>("scanner");
  const [loading, setLoading] = useState<boolean>(false);
  const [validationResults, setValidationResults] = useState<any>({ success: true, message: 'This is awesome', htmlMessage: freeHTML });
  const modal = useModal();
  const insets = useSafeAreaInsets()


  const doValidateWash = async (cardCode: string) => {
    const data = {
      CardCode: cardCode,
      StationId: selectedStation.StationId,
      manualEntry: false
    }

    const { result, error } = await WashubClient.validateWash(data)
    
    if (result) {
      setValidationResults({
        success: result.ResponseCode == 35,
        message: result.ResponseMessage,
        htmlMessage: result.ResponseHtmlMessage,
      });

      modal.showModal(
        <ValidateWashFeedback
          loading={loading}
          response={validationResults} />
      )
    } else {
      Alert.alert(translate('validateWashScreen.errorValidatingWash'), error.message);
      modal.hideModal();
    }

    setLoading(false);
    setEntryMode('scanner');
  };

  useEffect(() => {
    const cancelManualEntry = () => setEntryMode("scanner")
    if (entryMode == 'manual') {
      modal.showModal(
        <ManuallyValidateWash
          onCancel={cancelManualEntry}
          onSubmit={(code) => doValidateWash(code)}
        />,
        { 
          onHide: cancelManualEntry
        }
      )
    }
  }, [entryMode])


  return (
    <Screen
      style={{ 
        backgroundColor: color.palette.lightBlackBackground
       }}
     unsafe
    >
      <GradientBackground merchant />
    <ScrollView>
    <View style={{...styles.headerContainer, paddingTop: insets.top}}>
        <Image source={require("./../../../../assets/images/logo.png")} style={styles.logo} />
        <Text preset="header" style={styles.title}>{translate("validateWashScreen.lineUpCodeBelow")}</Text>
      </View>
      <View style={styles.toCenter}>
        <QRCodeScanner
          entryMode={entryMode}
          validateWash={doValidateWash}
        />
      </View>
      <View style={styles.footer}>
        <CircleButton
          innerText
          noText
          onPress={() => setEntryMode('manual')}
          style={styles.largeCircle}
          textStyle={styles.largeCircleText}
          text={translate("validateWashScreen.enterCodeManually")}
          icon={
            <Image source={require("./../../../assets/images/alphabetic.png")} style={styles.alphabetic} />
          }
        />
        <CircleButton
            innerText
            noText
            onPress={() =>{
              setEntryMode('scanner')
              navigation.goBack()
            }}
            textStyle={styles.smallCircleText}
            text={translate("common.cancel")}
            icon={
              <VIcon
                family="MaterialCommunityIcons"
                name="close-thick"
                size={circleIconSize}
                color={color.palette.white}
              />
            }
          />
      </View>
    </ScrollView>
    </Screen>
  )
};
