import React, { FC, useEffect, useReducer, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { Layout } from "../../../components/washub/layout";
import { Loader } from "../../../components/washub/loader/loader";
import {
  RedemptionType,
  IRequestStatus,
  BarCodeType,
  ILastRedemption,
} from "../../../washub-types";
import redemptionReducer, {
  IStatus,
  initialState,
} from "../../../components/washub/redeem/redemptionReducer";
import WashubClient from "../../../services/api/api";
import QRCode from "react-native-qrcode-svg";
import { Text } from "../../../../../shared/components";
import { styles } from "./redeem-location.styles";
import { fontsize } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import Barcode from '@adrianso/react-native-barcode-builder';

import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { ErrorDrop } from "../../../components/washub/error-drop/error-drop";
import { useAppState } from "../../../context/app-state-context";

const RedeemLocationScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "redeemLocation">
> = ({ navigation, route }) => {
  const station = route.params.station;

  const card = route.params.card;
  const selectedPlan = route.params.selectedPlan;
  const transactionId = route.params.transactionId;
  console.log('transactionId-------------------', transactionId)
  const { appState, setAppState } = useAppState();
  const [redeemResults, setRedeemResults] = useState(null);

  const [{ data, reqStatus, error }, dispatch] = useReducer(
    redemptionReducer,
    initialState
  );
  const { VehicleInfo } = card;

  useEffect(() => {
    redeem();
  }, []);


  console.log('station', station.LocationId, card.CardCode, station.AllowsSelfValidation)
  const redeem = async () => {
    dispatch({ type: IStatus.Request });
    await WashubClient.redeemWash({
      CardCode: card.CardCode,
      StationId: station.LocationId,
      selfValidated: station.AllowsSelfValidation,
      TransactionId: transactionId
    })
      .then(async (response) => {
        if (response.error === null && response.result) {
          console.log('response999999999999999?', response.result)
          setRedeemResults(response.result)
          const redemptionType =
            response.result.BarCodeInfo?.BarCodeFormat ??
            RedemptionType.CardCode;

          dispatch({
            type: IStatus.Success,
            result: { ...response.result, RedemptionType: redemptionType },
          });
          const redemption: ILastRedemption = {
            station: station,
            card: card,
          };
          setAppState({
            lastRedemption: redemption,
            mileageSaved: appState.mileageSaved + 1,
          });
        }
        if (response.error !== null) {
          dispatch({ type: IStatus.Error, error: response.error.message });
        }
      })
      .catch((error) => {
        dispatch({ type: IStatus.Error, error: "Unknow error" });
      });
  };


  console.log('data-=-=-=-=-=-=-=-=-=>', redeemResults)

  const renderRedemptionCode = () => {
    switch (redeemResults?.RedemptionType) {
      case RedemptionType.Alphanumeric:
        return (
          <View style={[styles.textContainer, {backgroundColor: 'white', padding: 20, borderRadius: 8}]}>
            <Text style={[styles.textCode, {color: 'black'}]} text={data.RedemptionCode} />
          </View>
        );
      case RedemptionType.QrCode:
        return (
          <>
            <QRCode
              backgroundColor="#ffffff"
              color="#000000"
              value={String(redeemResults.RedemptionCode)}
              size={normalize(150)}
            />
            <Text
              style={[styles.textCode, { fontSize: fontsize["medium+"] }]}
              text={redeemResults.RedemptionCode}
            />
          </>
        );
      case RedemptionType.BarCode39:
      case RedemptionType.BarCode128:
        return (
          <>
            <Barcode
              value={String(redeemResults.RedemptionCode)}
              format={BarCodeType[redeemResults.RedemptionType]}
              style={{ width: 200, height: 100, backgroundColor: 'white' }}
              lineColor="#000000"
            />
            <Text
              style={[styles.textCode, { fontSize: fontsize["medium+"] }]}
              text={redeemResults.BarCodeInfo.BarCodeDisplay}
            />
          </>
        );
      case RedemptionType.Barcode:
        return (
          <>
            <Barcode
              value={String(redeemResults.RedemptionCode)}
              format={BarCodeType[redeemResults.RedemptionType]}
              style={{ width: 200, height: 100, backgroundColor: 'white' }}
              lineColor="#000000"
            />
            <Text
              style={[styles.textCode, { fontSize: fontsize["medium+"] }]}
              text={redeemResults.BarCodeInfo.BarCodeDisplay}
            />
          </>
        );
      case RedemptionType.CardCode:
        return (
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.textCode} text={data.RedemptionCode} />
            </View>
          </View>
        );
      case RedemptionType.SelfValidation:
        return (
          <View>
            <View style={{ marginHorizontal: 'auto', height: 120, width: 120, marginBottom: 10, marginLeft: 25 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../../../../assets/images/checkmark.png')}
              />
            </View>
            <Text style={styles.textCode} text={data.RedemptionCode} />
          </View>
        );
      default:
        null
    }
  };

  if (reqStatus === IRequestStatus.Pending) {
    return <Loader />;
  }

  if (error!) {
    return (
      <ErrorDrop text="Your maximum number of washes per month has already been used." />
    );
  }

  return (
    <Layout>
      <View style={{ flex: 1, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, flexDirection: "column", marginVertical: 30 }}>
          <View style={styles.container}>
            <View style={styles.codeWrapper}>{renderRedemptionCode()}</View>
            <Text style={styles.title} text="LOOKS LIKE YOU’RE HERE!" />
            {data && (
              <Text style={[styles.text2, { marginTop: normalize(10) }]}>
                {data.RedmptionInstructions.replace("below", "above").replace(
                  ":",
                  ""
                )}
              </Text>
            )}
            <View style={styles.stationInfo}>
              <Text
                style={styles.stationName}
                text={station.LocationName.toUpperCase()}
              />
              <Text style={styles.stationAddr} text={station.LocationAddress} />
              <View style={{ flexDirection: "column", alignItems: "center", marginTop: 10, width: '70%' }}>

                <Text style={styles.entitledText} text={`You are entitled to `} />
                <Text style={styles.serviceName} text={`${selectedPlan?.StationServiceName == undefined ? 'Premiun Exterior Only Wash' : selectedPlan?.StationServiceName} `} />

              </View>
            </View>

            {VehicleInfo && (
              <Text
                style={[styles.text, styles.textCar]}
                text={`${VehicleInfo.Year} ${VehicleInfo.Make} ${VehicleInfo.Model}`}
              />
            )}
            {VehicleInfo && (
              <View style={styles.licensePlate}>
                <Text style={styles.licensePlateText} text="License Plate" />
                <Text
                  style={styles.licensePlateNumber}
                  text={
                    VehicleInfo.LicensePlateState +
                    VehicleInfo.LicensePlateNumber
                  }
                />
              </View>
            )}

            {/* <View style={styles.linksWrapper}>
           
          </View> */}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.links}
          onPress={() => {
            navigation.navigate("browserScreen", { url: 'https://autocarenetwork2020.my.site.com/survey/survey/runtimeApp.app?invitationId=0KiRb000000AvZh&surveyName=customer_feedback&UUID=365fd1d4-7621-4b02-b4d1-a2643a590320' });
          }}
        >
          <Text style={styles.actionLink} text="I'm all" />
          <Text style={styles.actionLink} text="done" />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default RedeemLocationScreen;
