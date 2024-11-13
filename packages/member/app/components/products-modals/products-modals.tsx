import React, { useState } from "react";
import { View, Alert } from "react-native";
import { styles } from "./products-modals.style";
import { translate } from "../../i18n";
import useModal from "../../../../shared/contexts/modal/useModal";
import { Card, Product } from "../../../../shared/services/api";
import WashubClient from "../../services/api/api";
import { Button, LineInput, Text } from "../../../../shared/components";

interface BookServiceProps {
  title: string;
  content: string;
  onConfirm: () => void;
}

export const BookServiceModal = (props: BookServiceProps) => {
  const modal = useModal();
  const { title, content, onConfirm } = props;

  const confirm = () => {
    modal.hideModal();
    onConfirm();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.body}>
        <Text preset="fieldLabel" style={styles.text}>
          {content}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          text={translate("common.cancel")}
          onPress={() => modal.hideModal()}
        />
        <Button text={translate("common.confirm")} onPress={confirm} />
      </View>
    </View>
  );
};

interface ConfirmBookServiceProps {
  k: string;
  card: Card;
  product: Product;
}
export const ConfirmBookServiceModal = (props: ConfirmBookServiceProps) => {
  const modal = useModal();
  const [claimInfo, setClaimInfo] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { k, product, card } = props;

  const actionInfo = (action: string) => {
    if (action === "FileClaim") {
      return {
        name: translate("productsScreen.submitClaim"),
        description: translate("productsScreen.submitAClaim"),
        placeholder: translate("productsScreen.submitClaimPlaceholder"),
        // submitAction: productActions.submitClaim,
        actionName: translate("productsScreen.claim"),
      };
    } else if (action === "BookService") {
      return {
        name: translate("productsScreen.bookService"),
        placeholder: translate("productsScreen.bookServicePlaceholder"),
        description: translate("productsScreen.bookAService"),
        // submitAction: productActions.submitClaim,
        actionName: translate("productsScreen.serviceRequest"),
      };
    }
    return null;
  };

  const submitClaim = async () => {
    setLoading(true);
    const action = actionInfo(k);
    const claim = {
      MemberNumber: card.CardCode || card.DealerBundleMemberNumber,
      DealerProductID: product.DealerProductId.toString(),
      Override: false,
    };
    let res = null;
    if (action) {
      if (k == "BookService") {
        res = await WashubClient.bookService({
          ...claim,
          ServiceRequestInfo: claimInfo,
        });
      } else {
        res = await WashubClient.fillClaim({
          ...claim,
          ClaimInfo: claimInfo,
        });
      }
    }

    if (res.error) {
      Alert.alert("Error", res.error.message);
    } else {
      Alert.alert(
        translate("common.success"),
        translate("productsScreen.submissionSuccesfull")
      );
      modal.hideModal();
    }
    setLoading(false);
  };

  const cancelSubmission = () => {
    const action = actionInfo(k);
    if (action) {
      Alert.alert(
        "Confirm",
        translate("productsScreen.sureToCancel", {
          actionName: action.actionName.toLowerCase(),
        }),
        [
          {
            text: "Yes",
            onPress: () => {
              modal.hideModal();
            },
          },
          { style: "cancel", text: translate("common.no") },
        ]
      );
    } else {
      modal.hideModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text preset="header" style={styles.title}>
          {translate("common.confirm")}
        </Text>
      </View>

      <View style={styles.body}>
        <LineInput
          value={claimInfo}
          containerStyle={{ backgroundColor: "white", marginBottom: 0 }}
          textInputStyle={{ minHeight: 44 }}
          fieldName="fieldName"
          onChange={setClaimInfo}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          disabled={loading}
          text={translate("common.cancel")}
          onPress={cancelSubmission}
        />
        <Button
          loading={loading}
          disabled={loading}
          text={translate("common.submit")}
          onPress={submitClaim}
        />
      </View>
    </View>
  );
};
