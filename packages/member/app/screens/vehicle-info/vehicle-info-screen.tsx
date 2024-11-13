import React, { FC, useEffect, useRef, useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import {
  Button,
  AutoImage as Image,
  WForm,
  LineInput,
} from "../../../../shared/components";
import { translate } from "../../i18n";
import { object, string } from "yup";
import { styles } from "./vehicle-info-screen.styles";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { HomeNavigatorParamList } from "../washub/home/home-stack";
import {
  formattedCode,
  getMemberNumber,
} from "../../../../shared/services/api/Utils";
import { useAppState } from "../../context/app-state-context";
import { Picker } from "../../../../shared/components/w-picker/w-picker";
import statesJSON from "./states.json";
import WashubClient from "../../services/api/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { Text } from "../../../../shared/components/text/text";
import { WFormRef } from "../../../../shared/components/w-form";
import { saveVehicleInfo } from "../../services/actions";
import LogoIcon from "../../../../shared/components/svg/logo-icon";
import TickIcon from "../../../../shared/components/svg/tick-icon";
import LoadingScreen from "../../../../shared/screens/loading-screen/loading-screen";
import { palette } from "../../../../shared/theme/palette";
import AvoidingView from "../../../../shared/components/avoiding-view/avoiding-view-screen";

const stateItems = statesJSON.map((e) => ({
  label: `${e.value} - ${e.name}`,
  value: e.value,
  key: e.value,
}));

const validations = object().shape({
  vin: string()
    .required(translate("vehicleInfoScreen.validations.vin.required"))
    .length(17, translate("vehicleInfoScreen.validations.vin.length")),
  vehicleYear: string()
    .required(translate("vehicleInfoScreen.validations.vehicleYear.required"))
    .matches(
      /^[0-9]*$/,
      translate("vehicleInfoScreen.validations.vehicleYear.matches")
    ),
  vehicleMake: string()
    .required(translate("vehicleInfoScreen.validations.vehicleMake.required"))
    .matches(/^[a-zA-Z ]*$/),
  vehicleModel: string()
    .required(translate("vehicleInfoScreen.validations.vehicleModel.required"))
    .matches(/^[a-zA-Z0-9 ]*$/),
  vehicleColor: string().required(
    translate("vehicleInfoScreen.validations.vehicleColor.required")
  ),
  licencePlateNumber: string()
    .required(
      translate("vehicleInfoScreen.validations.licencePlateNumber.required")
    )
    .matches(/^[a-zA-Z0-9]*$/),
  licencePlateState: string().required(
    translate("vehicleInfoScreen.validations.licencePlateState.required")
  ),
});

export const VehicleInfoScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "vehicleInfo">
> = observer(({ navigation, route }) => {
  const WFormRef = useRef<WFormRef>(null);
  const { card, editable: isEditable } = route?.params;
  const [loading, setLoading] = useState(false);
  const { VehicleInfo } = card;
  const [hasWarned, setHasWarned] = useState(false);
  const authState = useAuthState();
  const insets = useSafeAreaInsets();
  const appState = useAppState();
  const { isNewUser } = authState.authState;
  const { hasSavedVehicleInfo: hasSavedInfo } = appState.appState;
  const isFirstPrompt = isNewUser && !hasSavedInfo;
  const hasInfo = !!VehicleInfo?.VehicleIdNumber && !isFirstPrompt;
  const missingValues =
    !VehicleInfo ||
    !VehicleInfo?.Year ||
    !VehicleInfo?.LicensePlateNumber ||
    !VehicleInfo?.Make ||
    !VehicleInfo?.Model ||
    !VehicleInfo?.LicensePlateState;
  const editable = !hasInfo || missingValues || isEditable;
  const [vehicleInfo, setVehicleInfo] = useState(hasInfo ? VehicleInfo : null);
  const colorOptions = vehicleInfo?.ColorOptions ?? [];
  const colorItems = colorOptions.map((c) => ({
    label: c.ColorName,
    value: c.ColorId,
    key: c.ColorId,
  }));
  const showRegisteredText =
    !!(vehicleInfo?.ColorId || vehicleInfo?.Color) &&
    !!vehicleInfo?.LicensePlateNumber &&
    !!vehicleInfo?.VehicleIdNumber &&
    !!vehicleInfo?.LicensePlateState &&
    !!vehicleInfo?.Model &&
    !!vehicleInfo?.Make &&
    !!vehicleInfo?.Year &&
    !editable;

  const getColor = (id: number) =>
    colorItems.find((item) => item.value === id)?.label;

  useEffect(() => {
    if (isFirstPrompt && isEditable && !hasWarned) {
      setHasWarned(true);
      Alert.alert(
        "Verify VIN",
        "Please verify the accuracy of the VIN to your vehicle. If the VIN listed is incorrect, please update it now.\n\nBe Advised:\nThis will be your only opportunity to change the VIN. If you have any need to update the VIN later, you will need to contact Washub Network.",
        [{ text: "OK" }]
      );
    }
  }, []);

  const save = async (info: any) => {
    setLoading(true);
    const yearString = info?.vehicleYear;
    const VehicleYear = parseInt(yearString, 10);
    const VehicleMake = info?.vehicleMake;
    const VehicleModel = info?.vehicleModel;
    const VehicleColorId = getColor(info.vehicleColor)
      ? info.vehicleColor
      : null;
    const VehicleColor = getColor(info.vehicleColor)
      ? getColor(info.vehicleColor)
      : info.vehicleColor;
    const LicensePlateNumber = info?.licencePlateNumber;
    const VehicleIdNumber = info?.vin;
    const LicensePlateState = info?.licencePlateState;

    await WashubClient.updateVehicleInfo({
      MemberNumber: getMemberNumber(card),
      VehicleYear,
      VehicleMake,
      VehicleModel,
      VehicleColorId,
      VehicleColor,
      LicensePlateNumber,
      LicensePlateState,
      VehicleIdNumber,
    })
      .then(({ result, error, response }) => {
        if (result) {
          saveVehicleInfo(appState, authState, {
            CardCode: getMemberNumber(card),
            info: result.VehicleInfo,
          });
        } else {
          const msg =
            error?.message ?? `An unknown error occurred (${response.status})`;
          Alert.alert("Error", msg, [{ text: "OK" }]);
        }
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Error", error.message, [{ text: "OK" }]);
        setLoading(false);
      });
  };

  const onSave = () => {
    WFormRef.current.submit();
  };
  const handleColorChange = async (newId: number) => {
    const res = await WashubClient.validateVN({
      VehicleIdNumber: vehicleInfo?.VehicleIdNumber,
      VehicleColorId: newId,
    });
    setVehicleInfo({
      ...res.VehicleInfo,
      LicensePlateNumber: vehicleInfo?.LicensePlateNumber,
      LicensePlateState: vehicleInfo?.LicensePlateState,
    });
  };

  const goToHome = () => {
    navigation.navigate("default");
  };
  const content = (
    <WForm
      style={styles.form}
      ref={WFormRef}
      onSubmit={(value) => {
        save(value);
      }}
      onChange={(value) => {
        if (vehicleInfo?.ColorId !== value.vehicleColor) {
          parseInt(value.vehicleColor, 10) > 0 &&
            handleColorChange(parseInt(value.vehicleColor, 10));
        }
      }}
      validationSchema={validations}
      initialValue={{
        vin: vehicleInfo?.VehicleIdNumber,
        vehicleYear: vehicleInfo?.Year?.toString(),
        vehicleMake: vehicleInfo?.Make,
        vehicleModel: vehicleInfo?.Model,
        vehicleColor: getColor(vehicleInfo?.ColorId) || vehicleInfo?.Color,
        licencePlateNumber: vehicleInfo?.LicensePlateNumber,
        licencePlateState: vehicleInfo?.LicensePlateState,
      }}
    >
      <Text preset="header" style={styles.title}>
        {translate("homeScreen.vehicleInfo")}
        <Text style={styles.smallerCircle}>●</Text>
      </Text>
      <Text style={styles.subTitle}>
        {translate("vehicleInfoScreen.membershipNumber")}:{"   "}
        {formattedCode(getMemberNumber(card))}
      </Text>
      {vehicleInfo?.VehiclePhotoExists && (
        <Image
          resizeMode="cover"
          style={styles.vehicleImage}
          source={{ uri: vehicleInfo?.PhotoUrl }}
        />
      )}
      <View>
        <LineInput
          editable={editable}
          labelStyle={styles.labelStyle}
          fieldName="vin"
          label={translate("vehicleInfoScreen.form.vin")}
        />
        <LineInput
          editable={editable}
          fieldName="vehicleYear"
          labelStyle={styles.labelStyle}
          returnKeyType="next"
          keyboardType="numeric"
          label={translate("vehicleInfoScreen.form.vehicleYear")}
        />
        <LineInput
          editable={editable}
          labelStyle={styles.labelStyle}
          fieldName="vehicleMake"
          label={translate("vehicleInfoScreen.form.vehicleMake")}
        />
        <LineInput
          editable={editable}
          labelStyle={styles.labelStyle}
          fieldName="vehicleModel"
          label={translate("vehicleInfoScreen.form.vehicleModel")}
        />
        {colorItems?.length > 0 ? (
          <Picker
            pickerStyle={styles.picker}
            labelStyle={styles.labelStyle}
            fieldName="vehicleColor"
            placeholder={translate("vehicleInfoScreen.form.vehicleColor")}
            items={colorItems}
            label={translate("vehicleInfoScreen.form.vehicleColor")}
          />
        ) : (
          <LineInput
            editable={true}
            labelStyle={styles.labelStyle}
            fieldName="vehicleColor"
            label={translate("vehicleInfoScreen.form.vehicleColor")}
          />
        )}

        <LineInput
          editable={true}
          labelStyle={styles.labelStyle}
          fieldName="licencePlateNumber"
          label={translate("vehicleInfoScreen.form.licencePlateNumber")}
        />

        {editable ? (
          <Picker
            pickerStyle={styles.picker}
            fieldName="licencePlateState"
            labelStyle={styles.labelStyle}
            placeholder={translate("vehicleInfoScreen.form.vehicleColor")}
            items={stateItems}
            label={translate("vehicleInfoScreen.form.licencePlateState")}
          />
        ) : (
          <LineInput
            editable={false}
            labelStyle={styles.labelStyle}
            fieldName="licencePlateState"
            label={translate("vehicleInfoScreen.form.licencePlateState")}
          />
        )}
      </View>
    </WForm>
  );
  const formContent = loading ? (
    <LoadingScreen
      style={{
        backgroundColor: palette.white,
      }}
    />
  ) : (
    content
  );

  return (
    <AvoidingView
      header={
        <CustomHeader
          styles={styles.header}
          leftContent={
            <BackButton
              text={translate("common.close")}
              onPress={goToHome}
              type="close"
            />
          }
          centerContent={
            <View style={styles.logo}>
              <LogoIcon />
            </View>
          }
          rightContent={
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => onSave()}
              >
                <Text style={styles.headerButtonText}>
                  {translate("common.save")}
                </Text>
                <TickIcon />
              </TouchableOpacity>
            </View>
          }
        />
      }
    >
      <View style={styles.card}>
        {formContent}
        {showRegisteredText && (
          <Button
            style={styles.btn}
            textStyle={styles.btnTxt}
            text={translate("vehicleInfoScreen.vehicleRegistered")}
          />
        )}
      </View>
    </AvoidingView>
  );
});
