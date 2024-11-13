import React, { FC, useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  DottedLine,
  GradientBackground,
  Screen,
  VIcon,
} from "../../../../shared/components";
import { styles, istyles } from "./my-member-numbers-screen.style";
import { translate } from "../../i18n";
import { color, fontsize, spacings } from "../../../../shared/theme";
import useModal from "../../../../shared/contexts/modal/useModal";
import {
  ShowMemberCardModal,
  UnlinkConfirmationModal,
} from "../../components/settings-modals/settings-modals";
import WashubClient from "../../services/api/api";
import { Card } from "../../../../shared/services/api/api.types";
import {
  formattedCode,
  getMemberNumber,
} from "../../../../shared/services/api/Utils";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { centerContent } from "../../../../shared/components/screen/screen.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingsNavigatorParamList } from "../settings/settings-stack";
import { Text } from "../../../../shared/components/text/text";
import { useNavigation } from "@react-navigation/native";

interface MemberCardProps {
  onUnlinkSuccesfull: () => void;
  canClick: boolean;
  card: Card;
}

const MemberCard = (props: MemberCardProps) => {
  const { card, canClick, onUnlinkSuccesfull } = props;
  const modal = useModal();

  const handleClick = (card: Card) => {
    modal.showModal(<ShowMemberCardModal card={card} />);
  };

  const unlinkCard = async () => {
    await WashubClient.unlinkCard(card.CardCode);
    onUnlinkSuccesfull();
  };

  const textCode = (
    <Text selectable style={istyles.text}>
      {formattedCode(getMemberNumber(card))}
    </Text>
  );

  const InactiveWarning = card.CardStatus === "Inactive" && (
    <Text style={istyles.inactive}>(inactive/expired)</Text>
  );

  const key = getMemberNumber(card);

  return canClick ? (
    <TouchableHighlight
      key={key}
      underlayColor="#cacaca"
      onPress={() => {
        canClick && handleClick(card);
      }}
    >
      <View style={istyles.container}>
        <View style={istyles.leftSection}>
          {textCode}
          {InactiveWarning}
        </View>
        <Button
          textStyle={istyles.unlinkText}
          preset="link"
          onPress={() =>
            modal.showModal(
              <UnlinkConfirmationModal
                onCancel={() => modal.hideModal()}
                onConfirm={unlinkCard}
              />
            )
          }
          style={istyles.unlinkButton}
          text={translate("common.unlink")}
        />
      </View>
    </TouchableHighlight>
  ) : (
    <View style={istyles.container} key={key}>
      <View>
        {textCode}
        {InactiveWarning}
      </View>
      <Button
        textStyle={istyles.unlinkText}
        preset="link"
        onPress={() =>
          modal.showModal(
            <UnlinkConfirmationModal
              onCancel={() => modal.hideModal()}
              onConfirm={unlinkCard}
            />
          )
        }
        style={istyles.unlinkButton}
        text={translate("common.unlink")}
      />
    </View>
  );
};

//TODO: remove this screen
export const MyMemberNumbersScreen: FC<
  StackScreenProps<SettingsNavigatorParamList, "myMemberNumbers">
> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    setLoading(true);
    const { error, result } = await WashubClient.getCards();
    if (!error) {
      setCards(result.Cards ?? []);
    }
    setLoading(false);
  };

  const removeCard = (card: Card) => {
    setCards(cards?.filter((m) => m.CardCode != card.CardCode));
  };

  const canClick = cards.length > 1;
  return (
    <View testID="MyMemberNumbersScreen" style={styles.safeArea}>
      <Screen
        style={[
          styles.container,
          centerContent({ insets: { top: insets.top, bottom: insets.bottom } }),
        ]}
        unsafe
      >
        <GradientBackground />
        <View
          style={{
            ...cardStyles.card,
            paddingVertical: 0,
            paddingTop: spacings.medium,
          }}
        >
          <Text preset="header" style={styles.title}>
            {translate("settingsScreen.items.myMemberNumber")}
            <Text style={styles.pointStyle}>{"."}</Text>
          </Text>

          <View style={styles.dotLineView}>
            <DottedLine />
          </View>
          {loading && (
            <ActivityIndicator
              style={{ marginTop: spacings.medium }}
              size={fontsize.huge}
              color={color.primary}
            />
          )}
          <FlatList
            style={{ paddingVertical: spacings.medium }}
            indicatorStyle="black"
            data={cards}
            renderItem={({ item }) => (
              <MemberCard
                card={item}
                canClick={canClick}
                onUnlinkSuccesfull={() => removeCard(item)}
              />
            )}
            keyExtractor={(item) => getMemberNumber(item)}
          />
        </View>
        <CustomHeader
          leftContent={
            <BackButton
              type="close"
              text={translate("common.close")}
              onPress={navigation.goBack}
            />
          }
          centerContent={
            <View>
              <VIcon
                family="FontAwesome"
                name="gear"
                size={fontsize.large}
                color={color.palette.red}
              />
            </View>
          }
        />
      </Screen>
    </View>
  );
};
