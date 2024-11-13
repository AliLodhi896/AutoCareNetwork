import React, { useEffect, useState } from "react";
import { useAppState } from "../../../../context/app-state-context";
import { IRequestStatus } from "../../../../washub-types";
import WashubClient from "../../../../services/api/api";
import { Card } from "../../../../services/api";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../../../../../../shared/components";
import { TextInput } from "react-native-gesture-handler";
import { CircleActionButton } from "../../circle-action-button/circle-action-button";
import { normalize } from "../../../../../../shared/utils/normalize";
import { styles } from "./account-vehicle-vin-add.style";

const AccountVehicleVinAdd = ({
  handleClose,
  card,
}: {
  handleClose: () => void;
  card: Card;
}) => {
  const { appState, setAppState } = useAppState();
  const [reqStatus, setReqStatus] = useState<IRequestStatus>(
    IRequestStatus.Idle
  );
  const [reqError, setReqError] = useState<string>("");
  const [vinNumber, setVinNumber] = useState<string>("");
  let Year,
    Make,
    Model = "";
  if (card.VehicleInfo) {
    Year = card.VehicleInfo.Year.toString();
    Make = card.VehicleInfo.Make;
    Model = card.VehicleInfo.Model;
  }

  const addVinNumber = async () => {
    const { CardCode, DealerBundleMemberNumber } = card;
    const MemberNumber = CardCode || DealerBundleMemberNumber;
    try {
      const { error, data } = await WashubClient.updateVehicleVinNumber({
        MemberNumber,
        VehicleIdNumber: vinNumber,
      });

      if (!error) {
        setAppState({ isLoading: true });
        handleClose();
        appState.reInit();
        setAppState({ isLoading: false });
      } else {
        setReqError(error.message);
        setReqStatus(IRequestStatus.Error);
      }
    } catch (err) {
      setReqError(err.message);
      setReqStatus(IRequestStatus.Error);
    }
  };

  useEffect(() => {
    return () => {
      setReqStatus(IRequestStatus.Idle);
      setReqError("");
      setVinNumber("");
    };
  }, []);

  return (
    <View>
      <View>
        <Text text="Add VIN Number" style={styles.title} />
        {card.VehicleInfo && (
          <View style={styles.vehicleDetailsContainer}>
            {Make && Model && (
              <Text style={styles.vehicleDetails}>{`${Make} ${Model}`}</Text>
            )}
            {Year && <Text style={styles.vehicleDetails}>{Year}</Text>}
          </View>
        )}
      </View>
      <View style={{ marginTop: normalize(35) }}>
        {reqStatus === IRequestStatus.Pending ? (
          <ActivityIndicator size="large" color="#1B588A" />
        ) : (
          <>
            <View>
              <Text text="Vin Number" style={styles.label} />
              <TextInput
                placeholder="XXXXXXXXXXXXXXXX"
                onChangeText={(text) => {
                  setVinNumber(text);
                }}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                value={vinNumber}
              />
              {reqError !== "" && (
                <Text style={{ color: "red" }} text={reqError} />
              )}
            </View>
            <View style={styles.actionContainer}>
              <CircleActionButton
                style={styles.actionButton}
                text="SUBMIT"
                onPress={() => addVinNumber()}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AccountVehicleVinAdd;
