import React, { useRef } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View } from "react-native";
import { styles } from "./redeem-mileage.style";
import { TextInput } from "react-native-gesture-handler";
import { CircleActionButton } from "../circle-action-button/circle-action-button";
import { Card } from "../../../services/api";
import WashubClient from "../../../services/api/api";
import { Location } from "../../../../../shared/global-types";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { number, object } from "yup";

interface MileageProps {
  card: Card;
  station: Location;
  selectedPlan: any;
  transactionId: any
}

interface IMileageForm {
  Code: string;
  Mileage: number;
}

const validations = object().shape({
  Code: number().required(),
  Mileage: number().test(
    "len",
    "Min 3 numbers",
    (val) => val.toString().length >= 3
  ),
});

export function RedeemMileage({ card, station ,selectedPlan,transactionId }: MileageProps) {
  const navigator = useNavigation();
  const formRef = useRef(null);
  const formValues: IMileageForm = {
    Code: card.CardCode,
    Mileage: null,
  };

  const onSubmit = async (values: IMileageForm) => {
    const { error, response } = await WashubClient.updateMileage({
      Code: card.CardCode,
      Mileage: values.Mileage,
    });
    if (response.status === 200) {
      navigator.navigate("redeemDrive", {
        station: station,
        selectedPlan:selectedPlan,
        transactionId:transactionId
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title} text="ENTER MILEAGE" />
        <Text style={styles.text}>
          In order to redeem your wash, please enter your current mileage
        </Text>
        <Formik
          initialValues={formValues}
          onSubmit={(values: IMileageForm) => onSubmit(values)}
          validationSchema={validations}
          innerRef={formRef}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                id="Mileage"
                style={styles.input}
                placeholder="Enter mileage"
                // keyboardType="numeric"
                placeholderTextColor="#969696"
                onChangeText={handleChange("Mileage")}
                onBlur={handleBlur("Mileage")}
                value={values.Mileage}
              />
              {touched && errors["Mileage"] && (
                <Text style={styles.error} text={errors["Mileage"]} />
              )}
              <CircleActionButton
                style={styles.redeemButton}
                textStyle={styles.redeemButtonText}
                text={"REDEEM WASH"}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </>
          )}
        </Formik>
      </View>
    </>
  );
}
