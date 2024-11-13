import { View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { VehiclePreview } from "../vehicle-preview/vehicle-preview";
import { Card } from "../../../../shared/services/api";
import {
  formattedCode,
  getMemberNumber,
} from "../../../../shared/utils/common";
import { Text } from "./../../../../shared/components/text/text";
import { styles } from "./wash-card.styles";
import { translate } from "../../i18n";
import { color, Radii, spacings } from "../../../../shared/theme";
import CardFlip from "../../common/CardFlip";
import { navigate } from "../../navigators";
import { getWashText } from "../../utils/common";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";
import { Button } from "../../../../shared/components/button/button";
import { DottedLine } from "../../../../shared/components"
import { useNavigation } from '@react-navigation/native';

type Props = {
  onSelect?: (card: Card) => void;
  card: Card;
  hideCode?: boolean;
  singleCard?: boolean;
};

const Checkmark = (
  <VIcon family="FontAwesome" name="check-circle" size={0.9*spacings.large} color={color.palette.green} />
);
const Close = (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Radii.rounded,
      height: 20,
      width: 20,
      backgroundColor: color.primary,
    }}
  >
    <VIcon
      family="MaterialCommunityIcons"
      name="close-thick"
      size={15}
      color={color.palette.white}
    />
  </View>
)

export default function WashCard(props: Props): JSX.Element {
  const { singleCard } = props;
  const flipRef = useRef<any>();
  const navigation = useNavigation()
    const [side, setSide] = useState<0 | 1>(0)

  
  useEffect(() => {
    const handleFocusEvent = () => {
      if (side === 1) flipRef.current?.flip()
    }
    const unsubscribe = navigation.addListener('focus', handleFocusEvent)
    return unsubscribe
  }, [side])
  
  const cardSelected = () => {
    const { onSelect } = props;
    if (onSelect) {
      onSelect(props.card);
    } else {
      flipRef.current?.flip();
    }
  };

  const myPlanButton = () => (
  <View style={styles.footer}>
      <Button
        textStyle={styles.buttonStyle}
        text={`${translate("profileScreen.whatDoMyPlanIncludes")}?`}
        onPress={() => navigate("profile", { screen: "Terms" })}
      />
    </View>
  );

  const renderFront = () => {
    const { card, hideCode } = props;
    const { CardDescription, ExpirationDate } = card;
    const expirationDateArray = ExpirationDate?.split("/");
    const expirationText =
      expirationDateArray?.length > 0
        ? " " +
          expirationDateArray[0] +
          " / " +
          expirationDateArray[1] +
          " / " +
          expirationDateArray[2].slice(2)
        : "";

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={cardSelected}
        style={[
          styles.cardContainer,
          {
            paddingBottom: singleCard ? spacings.huge : spacings.large,
            marginBottom: singleCard ? spacings.huge : 0,
          },
        ]}
      >
        <View
          style={{
            height: "100%",
            borderRadius: 19,
            overflow: "hidden",
          }}
        >
          {card.DealerLogoUrl && (
            <Image
              style={styles.dealerLogo}
              resizeMode="contain"
              source={{ uri: card.DealerLogoUrl }}
            />
          )}
          <VehiclePreview card={card} />
          {!hideCode && (
            <Text style={styles.codeBar}>
              {translate("washCard.cardCode")}:{" "}
              {formattedCode(getMemberNumber(card))}
            </Text>
          )}
          <View>
            <View style={[styles.washAvailability, styles.marginHorizontal]}>
              <View style={styles.leftTextView}>
                {props.card.CardStatus === "Active" ? (
                  <Text
                    style={{
                      ...styles.active,
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    {getWashText(props.card)}
                  </Text>
                ) : (
                  <Text
                    style={{ ...styles.inactive, textTransform: "uppercase" }}
                  >
                    {translate("washCard.notActivePlan")}
                  </Text>
                )}
              </View>
              <View style={styles.washStatusIcon}>
                {card?.CanWashToday ? Checkmark : Close}
              </View>
            </View>
            {(ExpirationDate || CardDescription) && <DottedLine />}

            {!!CardDescription && (
              <Text
                style={[
                  styles.washes,
                  styles.washSecondary,
                  styles.marginHorizontal,
                  { marginTop: 15 },
                ]}
              >
                <Text fontFamily="secondary">
                  {translate("profileScreen.plan")}{" "}
                </Text>
                : {CardDescription}
              </Text>
            )}

            {ExpirationDate && (
              <Text
                style={[
                  styles.washes,
                  styles.washSecondary,
                  styles.marginHorizontal,
                ]}
              >
                <Text fontFamily="secondary">
                  {translate("washCard.expires")}
                </Text>
                : {expirationText}
              </Text>
            )}
          </View>
        </View>
        {singleCard && myPlanButton()}
      </TouchableOpacity>
    )
  };

  const renderBack = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={cardSelected}
        style={[styles.cardContainer]}
      >
        <>
          <View style={styles.cardBack}>
            <Text fontFamily="secondary" style={styles.backText}>
              {translate("washCard.message")}
            </Text>
          </View>
          {singleCard && myPlanButton()}
        </>
      </TouchableOpacity>
    );
  };

  return (
    <CardFlip onFlip={(side) => {
      setSide(side)
    }} style={{ 
      overflow: 'hidden'
     }} sizingView={renderFront()} ref={flipRef}>
      {renderFront()}
      {renderBack()}
    </CardFlip>
  );
}
