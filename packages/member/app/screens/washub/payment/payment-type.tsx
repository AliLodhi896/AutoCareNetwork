import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import RedeemContainer from "../../../components/washub/redeem-container";
import { View, Text, ScrollView, Alert } from "react-native";
import { useAppState } from "../../../context/app-state-context";
import HasFreeWash from "../has-free-wash/has-free-wash";
import { styles } from "./payment-type.styles";
import { Button, WashubInput } from "../../../../../shared/components";
import { Field } from "formik";
import AppFormField from "../../../components/washub/form/AppFormField";
import PaymenInput from "../../../components/washub/payment-input/paymen-input";
import WashubClient from "../../../services/api/api";
import useModal from "../../../../../shared/contexts/modal/useModal";
import Toast from 'react-native-toast-message';
import NoWashError from "../../../components/washub/no-wash/no-wash-error";
import { err } from "react-native-svg/lib/typescript/xml";
import SuccessWash from "../../../components/washub/no-wash/success-wash";
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';

const PaymentType: FC<
  StackScreenProps<HomeNavigatorParamList, "locationDetail">
> = ({ navigation, route }) => {
  const { selectedPlan, station } = route.params
  const { appState } = useAppState();
  const [showFreeInfo, setShowFreeInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successModal, setSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const modal = useModal()
  const cardCode = appState?.selectedCard?.CardCode
  const stationId = station?.LocationId

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    return () => {
      setShowFreeInfo(false);
    };
  }, []);




  // const createWash = async () => {
  //   setLoading(true);
  //   const { error, result } = await WashubClient.createPendingWash({ CardCode: cardCode, StationId: stationId });
  //   if (error?.message == 'Transaction created successfully.') {
  //     setSuccessMessage(error?.message)
  //     setSuccessModal(true)
  //   } else {
  //     setErrorMessage(error?.message)
  //     setIsModalVisible(true)
  //   }
  //   setLoading(false);
  // }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://api.ratethistoken.com/auth/create-payment`, {
      method: 'GET', // Ensure the method is in uppercase
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
  
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
  
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: 'pi_3PRcAnEwu7vs3I0w0qefbLcN_secret_FrdMTsfL9v3QjE3Gl5pwKEpKI',
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
  
    if (!error) {
      setLoading(true); // Assuming setLoading is a state handler to show loading state
    }
  };
  

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
  
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 20 }}>
      <RedeemContainer showBack={!showFreeInfo}>
        <SuccessWash
          modalVisible={successModal}
          setModalVisible={() => { setSuccessModal(false), navigation.navigate("redeemCarWash", { station: station, selectedPlan: selectedPlan }) }}
          text={successMessage}
        />
        <NoWashError
          modalVisible={isModalVisible}
          setModalVisible={() => { setIsModalVisible(false), navigation.navigate("redeemCarWash", { station: station, selectedPlan: selectedPlan }) }}
          text={errorMessage}
        />
        {showFreeInfo ? (
          <HasFreeWash handleClose={() => setShowFreeInfo(false)} />
        ) : (
          <StripeProvider
            publishableKey="pk_live_51Ie3zBEwu7vs3I0wNEG6S0JOdUwtN57bTX1ec3iX5nfW2CyPTjGt1iNfUkQVeQIOmuNECLC0A8iRao1gR1IPKGLm00mrWjEUsv"
          >
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
            <Button
              style={{
                backgroundColor: "#1B588A",
                borderRadius: 8,
              }}
              onPress={openPaymentSheet}
              preset="primary"
              text={`Pay $${selectedPlan?.StationServicePrice}`}
            />
          </StripeProvider>
        )}
      </RedeemContainer>
      <Toast />
    </ScrollView>
  );
};

export default PaymentType;