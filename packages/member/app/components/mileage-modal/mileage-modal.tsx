import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { translate } from "../../i18n";
import { color, spacings } from "../../../../shared/theme";
import { AutoImage as Image } from "../../../../shared/components/auto-image/auto-image";
import CardDashboard from "../../components/svg/car-dashboard";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./mileage-modal.style";
import { WForm, WFormRef } from "../../../../shared/components/w-form";
import { number, object } from "yup";
import WashubInput from "../../../../shared/components/w-input/w-input"
import { goBack } from "../../navigators";
import WashubClient from "../../services/api/api";
import { ScrollView } from "react-native-gesture-handler";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";
import { Button } from "../../../../shared/components/button/button";

const validations = object().shape({
  mileage: number().required(translate("homeScreen.mileage.validMileage")),
});

interface MileageProps {
  Code: string;
  callback: () => void;
}
export const MileageModal = ({ Code, callback }: MileageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const WFormRef = useRef<WFormRef>(null);
  const modal = useModal();
  const scrollViewRef = useRef<ScrollView>();

  const subMitMileage = ({ mileage }: { mileage: number }) => {
    setIsLoading(true);

    const success = () => {
      setIsLoading(false);
      Alert.alert(
        translate("common.success"),
        translate("homeScreen.mileage.willBeContactedShortly"),
        [{ text: translate("common.ok") }]
      );
      //callback of redeem
      modal.hideModal();
      callback();
      goBack();
    };

    const failure = (error: string) => {
      setIsLoading(false);
      console.error("Error service submit", error);
      Alert.alert("Error", error, [{ text: translate("common.ok") }]);
    };

    WashubClient.updateMileage({ Code, Mileage: mileage }).then((res) => {
      if (res.error) {
        const { message } = res.error;
        failure(message);
      } else {
        //send a message with the mileage to washub representative
        const message = {
          MessageSubject: translate("homeScreen.mileage.messageSubject"),
          MessageBody: translate("homeScreen.mileage.messageBody") + mileage,
        };

        WashubClient.sendMessage(message).then((result) => {
          if (result.error) {
            const { message } = result.error;
            failure(message);
          } else {
            success();
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalHeadView}>
        <TouchableOpacity onPress={() => modal.hideModal()}>
          <VIcon
            family="Ionicons"
            name="close-sharp"
            size={spacings.icons.small}
            color={color.palette.white}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          height: 600,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../assets/images/app-logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.contentView}>
          <Text
            style={styles.contentText}
            text={translate("homeScreen.mileage.initialMessage")}
          />
        </View>

        <View style={styles.logoView}>
          <CardDashboard
            width={spacings.icons.huge}
            height={spacings.icons.huge}
            fill={color.palette.white}
          />
        </View>
        <View style={styles.formView}>
          <WForm
            style={styles.form}
            ref={WFormRef}
            onSubmit={(value) => {
              subMitMileage({ mileage: value.mileage });
            }}
            validationSchema={validations}
            initialValue={{
              mileage: "",
            }}
            noAnimation
          >
            <WashubInput
              placeholder={translate("homeScreen.mileage.enterMileage")}
              editable={!isLoading}
              onFocus={() => {
                scrollViewRef.current?.scrollToEnd({
                  animated: true,
                });
              }}
              onBlur={() => {
                scrollViewRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                });
              }}
              fieldName="mileage"
              keyboardType="numeric"
              returnKeyType="next"
            />
            <Button
              loading={isLoading}
              preset="primary"
              testID="login-button"
              style={styles.submit}
              textStyle={styles.submitText}
              text={translate("common.submit").toUpperCase()}
              onPress={() => {
                WFormRef.current.submit();
              }}
            />
          </WForm>
        </View>
      </ScrollView>
    </View>
  );
};
