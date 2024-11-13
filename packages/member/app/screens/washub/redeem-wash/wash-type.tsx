import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { Layout } from "../../../components/washub/layout";
import RedeemContainer from "../../../components/washub/redeem-container";
import { View, Alert } from "react-native";
import { styles } from "../location-detail/location-detail.styles";
import { CircleActionButton } from "../../../components/washub/circle-action-button/circle-action-button";
import HasFreeWash from "../has-free-wash/has-free-wash";
import { WashPlan } from "../../../components/washub/redeem/wash-plan";
import { useAppState } from "../../../context/app-state-context";
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { Button, WashubInput } from "../../../../../shared/components";
import WashubClient from "../../../services/api/api";
import SuccessWash from "../../../components/washub/no-wash/success-wash";
import NoWashError from "../../../components/washub/no-wash/no-wash-error";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { PlatformPayButton, PlatformPay, confirmPlatformPayPayment } from '@stripe/stripe-react-native';

const WashType: FC<
  StackScreenProps<HomeNavigatorParamList, "locationDetail">
> = ({ navigation, route }) => {
  const { authState } = useAuthState();
  const [showFreeInfo, setShowFreeInfo] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const { appState } = useAppState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [transactionId, setTransactionId] = React.useState('1234567');

  const station = route.params.station;
  const stationId = station?.LocationId
  const cardCode = appState?.selectedCard?.CardCode
  const { profile } = authState;

  console.log('station', station)

  useEffect(() => {
    return () => {
      setShowFreeInfo(false);
    };
  }, []);

  const isPremiumOnly = false;
  const containerStyle = isPremiumOnly
    ? styles.premiumContainer
    : styles.container;

  const redeemWash = () => {
    if (!appState.selectedCard.CanWashToday == false) {
      navigation.navigate("redeemCarWash", { selectedPlan: selectedPlan, station: station, transactionId: '' });
    }
    setShowFreeInfo(true);
  };

  const createWash = async () => {
    setLoading(true);
    const { error } = await WashubClient.createPendingWash({ CardCode: cardCode, StationId: stationId });
    if (error?.message == 'Transaction created successfully.') {
      createPaymentIntent(error?.responseJson?.TransactionId)
      // pay(error?.responseJson?.TransactionId)
    } else {
      setErrorMessage(error?.message)
      setIsModalVisible(true)
      setLoading(false);
    }
  }

  const createPaymentIntent = async (transactionId) => {
    const { error } = await WashubClient.createPaymentIntent({ chargeAmount: selectedPlan?.StationServicePrice, transactionId: transactionId });
    if (error?.responseJson?.clientSecret) {
      initializePaymentSheet(error?.responseJson?.clientSecret, transactionId)
    } else {
      setErrorMessage(error?.message)
      setIsModalVisible(true)
      setLoading(false);
    }
  }


  const initializePaymentSheet = async (clientSecret, transactionId) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: profile?.FirstName,
      },
      applePay: {
        merchantCountryCode: 'US',
      },
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
      },
    });
    if (!error) {
      openPaymentSheet(transactionId)
    } else {
      setErrorMessage(error?.message)
      setIsModalVisible(true)
      setLoading(false);
    }

  };


  const openPaymentSheet = async (transactionId) => {
    setLoading(false);
    const { error } = await presentPaymentSheet();
    if (error?.code) {
      setErrorMessage(error?.message)
      setIsModalVisible(true)
    } else {
      verifyWash(transactionId)
    }
  };

  // console.log('transactionId----->',transactionId)

  const verifyWash = async (transactionId) => {

    const { error } = await WashubClient.verifyPendingWash({ TransactionId: transactionId });
    if (error) {
      navigation.navigate("redeemCarWash", { selectedPlan: selectedPlan, station: station, transactionId: transactionId });
    }
  }


  const pay = async (clientSecret) => {
    console.log('clientSecret', clientSecret)
    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        applePay: {
          cartItems: [
            {
              label: 'Example item name',
              amount: '14.00',
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: 'Total',
              amount: '12.75',  
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );
    console.log('error', error)
    if (error) {
      // handle error
    } else {
      Alert.alert('Success', 'Check the logs for payment intent details.');
      console.log(JSON.stringify('paymentIntent', null, 2));
    }
  };

  return (
    <Layout>
      <RedeemContainer showBack={!showFreeInfo}>
        {showFreeInfo ? (
          <HasFreeWash handleClose={() => setShowFreeInfo(false)} />
        ) : (
          <View style={containerStyle}>
            <SuccessWash
              modalVisible={successModal}
              setModalVisible={() => { setSuccessModal(false), navigation.navigate("redeemCarWash", { station: station, selectedPlan: selectedPlan, transactionId: transactionId }) }}
              text={successMessage}
            />
            <NoWashError
              modalVisible={isModalVisible}
              setModalVisible={() => { setIsModalVisible(false) }}
              text={errorMessage}
            />
            <WashPlan setSelectedPlan={(values) => setSelectedPlan(values)} isPremiumOnly={isPremiumOnly} station={station} />
            {selectedPlan?.StationServicePrice == 0 ?
              <CircleActionButton
                style={styles.redeemButton}
                textStyle={styles.redeemButtonText}
                text={"REDEEM WASH"}
                loading={loading}
                onPress={() => {
                  redeemWash();
                }}
              />
              :
              <CircleActionButton
                disabled={selectedPlan == null || selectedPlan == undefined ? true : false}
                style={[{ ...styles.redeemButton }, { opacity: selectedPlan == null || selectedPlan == undefined ? 0.7 : 1 }]}
                textStyle={{ ...styles.payNowButtonText }}
                text={"PAY NOW"}
                loading={loading}
                onPress={() => createWash()}
              />
            }
            <StripeProvider
              merchantIdentifier="merchant.com.washub.member"
              publishableKey="pk_live_51Ie3zBEwu7vs3I0wNEG6S0JOdUwtN57bTX1ec3iX5nfW2CyPTjGt1iNfUkQVeQIOmuNECLC0A8iRao1gR1IPKGLm00mrWjEUsv"
            >
              <></>
             
            </StripeProvider>
          </View>
        )}
      </RedeemContainer>
    </Layout>
  );
};

export default WashType;