import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import { Layout } from "../../../components/washub/layout";
import { useAppState } from "../../../context/app-state-context";
import { ICardType, IRedeemType } from "../../../washub-types";
import { PlanDetails } from "../../../components/washub/plan-details/plan-details";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../../../shared/components";
import { VehicleInfo } from "../../../../../shared/global-types";
import { styles } from "./redeem-wash.styles";
import { TextButton } from "../../../components/washub/text-button/text-button";
import { RedeemMileage } from "../../../components/washub/redeem/redeem-mileage";
import { CircleActionButton } from "../../../components/washub/circle-action-button/circle-action-button";
import { AvoidSoftInputView } from "react-native-avoid-softinput";

function PlanInfo({
  vehicleInfo,
  planType,
}: {
  vehicleInfo: VehicleInfo;
  planType: IRedeemType;
}) {
  let Year,
    Make,
    Model = "";
  if (vehicleInfo) {
    Year = vehicleInfo.Year;
    Make = vehicleInfo.Make;
    Model = vehicleInfo.Model;
  }

  return (
    <>
      <Text style={styles.text} text="We will use your" />
      <Text style={styles.text}>
        {planType === IRedeemType.VOUCHER && "CARWASH VOUCHER"}
        {planType === IRedeemType.SUBSCRIPTION && "MONTHLY SUBSCRIPTION"}
      </Text>
      <Text style={styles.text} text="associated with your:" />
      {Year && Make && Model && (
        <Text style={styles.text} text={Year + " " + Make + " " + Model} />
      )}
    </>
  );
}

const RedeemWashScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "redeemCarWash">
> = ({ navigation, route }) => {
  const { appState } = useAppState();
  const card = appState.selectedCard;
  const station = route.params.station;
  const transactionId = route.params.transactionId;
  const selectedPlan = route.params.selectedPlan;
console.log('sadasasdss',transactionId)


  const [showPlanInfo, setShowPlanInfo] = useState(false);
  const [showBack, setShowBack] = useState(true);

  const [planType, setPlanType] = useState<IRedeemType>(
    IRedeemType.SUBSCRIPTION
  );
  const vehicleInfo = card.VehicleInfo;
  const showMileage = appState.mileageSaved % 3 === 0;

  useEffect(() => {
    if (card.CardType === ICardType.Service) {
      setPlanType(IRedeemType.VOUCHER);
    }
    return () => {
      setShowPlanInfo(false);
    };
  }, []);

  useEffect(() => {
    setShowBack(!showPlanInfo);
    return () => {
      setShowBack(true);
    };
  }, [showPlanInfo]);

  return (
    <Layout>
      <AvoidSoftInputView
        avoidOffset={100}
        easing="linear"
        enabled={true}
        hideAnimationDelay={100}
        hideAnimationDuration={100}
        showAnimationDelay={100}
        showAnimationDuration={100}
        style={styles.container}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: showBack ? 3 : 2 }}>
            {showBack && navigation.canGoBack() && (
              <TextButton handleOnPress={() => navigation.goBack()} />
            )}
          </View>

          <View style={{ flex: 21 }}>
            {showPlanInfo ? (
              <PlanDetails
                close={() => {
                  setShowPlanInfo(false);
                }}
              />
            ) : (
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={styles.title} text="Redeem Wash" />
                  <PlanInfo vehicleInfo={vehicleInfo} planType={planType} />
                  {planType === IRedeemType.SUBSCRIPTION && (
                    <>
                      <TouchableOpacity onPress={() => setShowPlanInfo(true)}>
                        <Text
                          style={[styles.text, styles.textLink]}
                          text="What does my plan include?"
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                {showMileage ? (
                  <RedeemMileage card={card} station={station} selectedPlan={selectedPlan} transactionId={transactionId} />
                ) : (
                  <CircleActionButton
                    style={styles.redeemButton}
                    textStyle={styles.redeemButtonText}
                    text={"REDEEM WASH"}
                    onPress={() => {
                      navigation.navigate("redeemDrive", { selectedPlan: selectedPlan, station: station,transactionId:transactionId })
                    }}
                  />
                )}
              </View>
            )}
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </AvoidSoftInputView>
    </Layout>
  );
};

export default RedeemWashScreen;
