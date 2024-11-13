import React from "react";
import { useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./vehicle-preview.styles";
import { AutoImage as Image } from "../../../../shared/components/auto-image/auto-image";
import CardFlip from "../../common/CardFlip";
import { VehicleInfo } from "../../../../shared/global-types";
import { Text } from "../../../../shared/components/text/text";
import { Card } from "../../services/api";
import ArrowFlipIcon from "../../../../shared/components/svg/arrow-flip-icon";
import ImageView from "../../../../shared/components/image-view/image-view";
import { normalize } from "../../../../shared/utils/normalize";

const VehicleDetails = (props: { info: VehicleInfo; flip?: () => void }) => {
  const { Make, Model, Year, VehicleIdNumber } = props.info;
  const formatVIN = (vin: string) => {
    return (
      <>
        <Text style={styles.detailInfo}>
          {vin.slice(0, 13)}
          <Text style={{ ...styles.detailInfo, color: "rgb(251, 60, 51)" }}>
            {vin.slice(-4)}
          </Text>
        </Text>
      </>
    );
  };
  return (
    <View style={{ ...styles.detailWrapper }}>
      <ArrowFlipIcon style={styles.detailsArrow} />
      <Text style={styles.detailTitle}>
        {Make} {Model}
      </Text>
      <Text style={styles.detailTitle}>{Year}</Text>
      <Text style={styles.detailInfo}>VIN# {formatVIN(VehicleIdNumber)}</Text>
    </View>
  );
};

export function VehiclePreview(props: {
  card: Card;
  color?: string;
  allowFlip?: boolean;
}) {
  const { card = {} as Card, color, allowFlip } = props;
  const { VehicleInfo } = card;
  const flipRef = useRef(null);

  if (!VehicleInfo) {
    return null;
  }

  const flip = () => {
    const current = flipRef.current as any;
    if (current) {
      current.flip();
    }
  };

  const VehicleImage = (
    <ImageView style={{ ...styles.cardFront }}>
      <Image
        resizeMode="cover"
        style={styles.vehiclePhoto}
        source={{ uri: VehicleInfo.PhotoUrl }}
      />
    </ImageView>
  );

  if (!allowFlip) {
    return VehicleImage;
  }
  return (
    <TouchableOpacity
      onPress={flip}
      style={{ width: normalize(315), alignSelf: "center" }}
    >
      <CardFlip
        sizingView={<View style={{ ...styles.cardFront }} />}
        ref={flipRef}
      >
        <ImageView
          style={
            (styles.cardFront, { ...{ width: "100%", alignSelf: "center" } })
          }
        >
          <ArrowFlipIcon style={styles.detailsArrow} />
          <Image
            resizeMode="cover"
            style={styles.vehiclePhoto}
            source={{ uri: VehicleInfo.PhotoUrl }}
          />
        </ImageView>

        <View style={styles.cardFront}>
          <VehicleDetails info={VehicleInfo} color={color} flip={flip} />
        </View>
      </CardFlip>
    </TouchableOpacity>
  );
}
