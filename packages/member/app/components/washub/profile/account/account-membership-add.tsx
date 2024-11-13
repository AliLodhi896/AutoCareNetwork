import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../../../../../../shared/components";
import { CircleActionButton } from "../../circle-action-button/circle-action-button";
import { styles } from "./account-membership-add.style";
import { TextInput } from "react-native-gesture-handler";
import { normalize } from "../../../../../../shared/utils/normalize";
import { IRequestStatus } from "../../../../washub-types";
import WashubClient from "../../../../services/api/api";
import { useAppState } from "../../../../context/app-state-context";

const AccountMembershipAdd = ({ handleClose }: { handleClose: () => void }) => {
  const { appState, setAppState } = useAppState();
  const [memberNumber, setMemberNumber] = useState("");
  const [reqStatus, setReqStatus] = useState<IRequestStatus>(
    IRequestStatus.Idle
  );
  const [reqError, setReqError] = useState<string>("");

  useEffect(() => {
    return () => {
      setReqStatus(IRequestStatus.Idle);
      setReqError("");
      setMemberNumber("");
    };
  }, []);

  const linkCard = async () => {
    const { error, data } = await WashubClient.linkCard(memberNumber);
    if (!error) {
      setAppState({ isLoading: true });
      handleClose();
      appState.reInit();
      setAppState({ isLoading: false });
    } else {
      setReqError(error.message);
      //setReqStatus(IRequestStatus.Error);
    }
  };
  return (
    <View>
      <View>
        <Text text="Add new membership" style={styles.title} />
      </View>
      <View style={{ marginTop: normalize(35) }}>
        {reqStatus === IRequestStatus.Pending ? (
          <ActivityIndicator size="large" color="#1B588A" />
        ) : (
          <>
            <View>
              <Text text="Member number" style={styles.label} />
              <TextInput
                placeholder="XXX XXX XXX"
                onChangeText={(text) => {
                  setMemberNumber(text);
                }}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                value={memberNumber}
              />
              {reqError !== "" && (
                <Text style={{ color: "red" }} text={reqError} />
              )}
            </View>
            <View style={styles.actionContainer}>
              <CircleActionButton
                style={styles.actionButton}
                text="SUBMIT"
                onPress={() => linkCard()}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AccountMembershipAdd;
