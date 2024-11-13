import React from "react";
import { View, Image } from "react-native";
import MapPinIcon from "../../svg/map-pin";
import { styles } from "./pin.styles";
import { PinColors } from "../../../washub-types";
import { Location } from "../../../../../shared/global-types";
const SelfValImage = require("../../../../assets/images/smartphone_approve.png");

type Props = {
  station: Location;
};

const Pin = ({ station }: Props) => {
  const color = station?.WashUpcharge !== 0  ? PinColors.red : PinColors.blue;

  return (
    <View style={styles.container}>
      <View style={styles.pinContainer}>
        <MapPinIcon style={styles.pin} color={color} />
      </View>
      {station.AllowsSelfValidation && (
        <View style={styles.selfValContainer}>
          <Image style={styles.selfValImage} source={SelfValImage} />
        </View>
      )}
    </View>
  );
};

export default Pin;
