import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./user-rating-modal.style";
import { ScrollView } from "react-native-gesture-handler";
import { translate } from "../../i18n";
import WashubClient from "../../services/api/api";
import { StackNavigationProp } from "@react-navigation/stack";
import UserFeedback from "../../../../shared/components/user-feedback";
import { Button } from "../../../../shared/components/button/button";
import WashubInput from "../../../../shared/components/w-input/w-input";
import { NavigatorParamList } from "../../navigators";
import moment from "moment";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";

interface UserRatingModalProps {
  collectFeedback: boolean;
  onCollectFeedback: (data: {feedbackRating: number;
    lastFeedbackTime: string;
   } | null) => void;
  navigation: StackNavigationProp< NavigatorParamList, "home">;
}

export const UserRatingModal = (props:UserRatingModalProps) => {
  const { collectFeedback, onCollectFeedback, navigation } = props;
  const [appRating, setAppRating] = useState(0);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const {authState} = useAuthState();
  console.warn("appState", authState)
  const modal = useModal();

  useEffect(() => {
    setAppRating(0);
    setFeedbackNotes("");

    return () => {
      onCollectFeedback(null);
    };
  }, [collectFeedback]);

  const onSubmit = () => {
    const effectiveAppRating = appRating > 0 ? appRating : "none";
    const message = {
      MessageSubject: translate(
        "homeScreen.rating.ratingMessageSubject"
      ),
      MessageBody: `${translate(
        "homeScreen.rating.ratingMessageBody"
      )}: ${effectiveAppRating}<br/>${translate("common.notes")}: ${feedbackNotes}`,
    };

    WashubClient.sendMessage(message);
    onCollectFeedback({ feedbackRating: appRating, lastFeedbackTime: moment().format() });
    navigation.setParams({
      collectFeedback: false,
    });
    modal.hideModal();
  }
  
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
              appRating === 0 
            }
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};
