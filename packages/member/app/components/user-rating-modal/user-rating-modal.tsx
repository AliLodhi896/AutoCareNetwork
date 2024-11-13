import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./user-rating-modal.style";
import { ScrollView } from "react-native-gesture-handler";
import { translate } from "../../i18n";
import WashubClient from "../../services/api/api";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../../screens/washub/home/home-stack";
import UserFeedback from "../../../../shared/components/user-feedback";
import { Button } from "../../../../shared/components/button/button";
import WashubInput from "../../../../shared/components/w-input/w-input";

interface EntitlementModalProps {
  collectFeedback: {
    stationName: string;
    cardCode: number;
  };
  onCollectFeedback: (data: { feedbackRating: number } | null) => void;
  navigation: StackNavigationProp<HomeNavigatorParamList, "default">;
}

export const UserRatingModal = (props: EntitlementModalProps) => {
  const { collectFeedback, navigation, onCollectFeedback } = props;
  const [appRating, setAppRating] = useState(0);
  const [washRating, setWashRating] = useState(0);
  const [cashierRating, setCashierRating] = useState(0);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const modal = useModal();

  useEffect(() => {
    setAppRating(0);
    setCashierRating(0);
    setWashRating(0);
    setFeedbackNotes("");

    return () => {
      onCollectFeedback(null);
    };
  }, [collectFeedback]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.text}>
            {translate("homeScreen.rating.rateApp")}:
          </Text>
          <UserFeedback
            maxNumber={5}
            rating={appRating}
            onRatingChanged={setAppRating}
          />
          <View style={styles.feedbackSpacer} />
          <Text style={styles.text}>
            {translate("homeScreen.rating.rateCashierExperience")}:
          </Text>
          <UserFeedback
            maxNumber={5}
            rating={cashierRating}
            onRatingChanged={setCashierRating}
          />
          <View style={styles.feedbackSpacer} />
          <Text style={styles.text}>
            {translate("homeScreen.rating.ratewash")}:
          </Text>
          <UserFeedback
            maxNumber={5}
            rating={washRating}
            onRatingChanged={setWashRating}
          />
          <View style={styles.feedbackSpacer} />
          <View style={styles.feedBackInput}>
            <WashubInput
              numberOfLines={4}
              multiline={true}
              placeholder={translate("homeScreen.rating.inputPlaceholder")}
              value={feedbackNotes}
              onChangeText={setFeedbackNotes}
            />
          </View>

          <Button
            style={styles.submitBtn}
            textStyle={styles.submitText}
            text={translate("common.submit")}
            disabled={
              appRating === 0 || cashierRating === 0 || washRating === 0
            }
            onPress={() => {
              const bestRating = Math.max(appRating, cashierRating, washRating);

              const effectiveAppRating = appRating > 0 ? appRating : "none";
              const effectiveCashierRating =
                cashierRating > 0 ? cashierRating : "none";
              const effectiveWashRating = washRating > 0 ? washRating : "none";
              const message = {
                MessageSubject: translate(
                  "homeScreen.rating.ratingMessageSubject"
                ),
                MessageBody: `${translate(
                  "homeScreen.rating.ratingMessageBody0"
                )}: ${effectiveAppRating}<br/>
                  ${translate(
                    "homeScreen.rating.ratingMessageBody1"
                  )}: ${effectiveCashierRating}<br/>
                  ${translate(
                    "homeScreen.rating.ratingMessageBody2"
                  )}: ${effectiveWashRating}<br/>
                  ${translate(
                    "homeScreen.rating.ratingMessageBody3"
                  )}: ${feedbackNotes}<br/>
                  ${translate("homeScreen.rating.ratingMessageBody4")}: ${
                  collectFeedback?.cardCode
                } <br/>
                  ${translate("homeScreen.rating.ratingMessageBody5")}: ${
                  collectFeedback?.stationName
                }`,
              };

              WashubClient.sendMessage(message);
              onCollectFeedback({ feedbackRating: bestRating });
              navigation.setParams({
                collectFeedback: false,
              });
              modal.hideModal();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
