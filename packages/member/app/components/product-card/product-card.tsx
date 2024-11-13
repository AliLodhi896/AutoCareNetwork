import React from "react";
import { Text } from "../../../../shared/components/text/text";
import { Alert, Image, Linking, TouchableOpacity, View } from "react-native";
import { ProductCardProps } from "./product-card.props";
import { translate } from "../../i18n";
import { styles, sectionStyles } from "./product-card.style";
import { color, spacings } from "../../../../shared/theme";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../../../shared/services/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import SpannerIcon from "../../components/svg/spanner"
import useModal from "../../../../shared/contexts/modal/useModal";
import AutocareButton from "../autocare-button/autocare-button";
import {
  BookServiceModal,
  ConfirmBookServiceModal,
} from "../products-modals/products-modals";
import WashubClient from "../../services/api/api";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import { DottedLine } from '../../../../shared/components/dotted-line/dotted-line';

export function ProductCard({ product, card }: ProductCardProps) {
  const modal = useModal();
  const navigation = useNavigation();

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

  const startClaim = (key: string, prod: Product) => {
      console.warn("handing press")

    const action = actionInfo(key);
    const webData = {
      product: prod,
      card,
    };
    if (action) {
      if (key === "FileClaim" && prod.FileClaimLink) {
        navigation.navigate("webScreen", {
          url: prod.FileClaimLink,
          ...webData,
          onSubmit: () =>
            submitClaim(
              key,
              product,
              translate("productsScreen.serviceBookVia", {
                FileClaimLink: prod.FileClaimLink,
              }),
              true
            ),
        });
        return;
      } else if (key === "BookService" && prod.BookServiceLink) {
        navigation.navigate("webScreen", {
          url: prod.BookServiceLink,
          ...webData,
          onSubmit: () =>
            submitClaim(
              key,
              product,
              translate("productsScreen.serviceBookVia", {
                BookServiceLink: prod.BookServiceLink,
              }),
              true
            ),
        });
        return;
      } else {
        modal.showModal(
          <BookServiceModal
            title={action.name}
            content={translate("productsScreen.bookSeriveModalContent", {
              name: prod.ProductName,
              description: action.description,
            })}
            onConfirm={() =>
              modal.showModal(
                <ConfirmBookServiceModal card={card} k={key} product={prod} />
              )
            }
          />
        );
      }
    }
  };

  const submitClaim = async (
    key: string,
    product: Product,
    info: string,
    suppressResult?: boolean
  ) => {
    const action = actionInfo(key);
    let res = null;
    const claim = {
      MemberNumber: card.CardCode || card.DealerBundleMemberNumber,
      DealerProductID: product.DealerProductId.toString(),
      Override: suppressResult,
    };
    if (action) {
      if (key == "BookService") {
        res = await WashubClient.bookService({
          ...claim,
          ServiceRequestInfo: info,
        });
      } else {
        res = await WashubClient.fillClaim({
          ...claim,
          ClaimInfo: info,
        });
      }
    }

    if (res.error) {
      Alert.alert("Error", res.error.message);
    }
  };

  const phoneNumber = parsePhoneNumberFromString(product.PhoneNumber, "US");
  const formattedNumber = phoneNumber
    ? phoneNumber.formatNational()
    : product.PhoneNumber;
  const actionButtons = product.Actions.map((key) => {
    const action = actionInfo(key);
    if (action && formattedNumber) {
      if (action.name === "Book Service")
        return (
          <CircleButton
            innerText
            noText
            style={styles.sideCircle}
            textStyle={styles.sideText}
            text={action.name}
            onPress={() => {
              startClaim(key, product)
            }}
            icon={
              <SpannerIcon
                width={spacings.icons.medium}
                height={spacings.icons.medium}
                fill={color.palette.white}
              />
            }
          />
        )
        if ((action.name = "Submit Claim")) {
          return (
            <CircleButton
              innerText
              noText
              style={styles.sideCircle}
              textStyle={styles.sideText}
              text={action.name}
              onPress={() => startClaim(key, product)}
              icon={
                <Image  style={{ 
                  height: 40,
                  width: 30,

                 }} source={require('../../../assets/images/submit-claim-icon.png')} /> 
              }
            />
          )
        }
          return (
            <AutocareButton
              type="dealerBundle"
              caption={action.name}
              onPress={startClaim(key, product)}
            />
          )
    }
    return null;
  });
  return (
    <View style={[sectionStyles.card, actionButtons?.length === 0? {marginBottom: 5}: {}]}>
      <View style={sectionStyles.detailsCard}>
        <View style={sectionStyles.cardHeader}>
          <Text preset="bold" style={sectionStyles.bigText}>
            {product.ProductName}
          </Text>
        </View>
        <DottedLine/>
        <View style={{ padding: spacings.medium }}>
          <View>
            {product.ContractNumber?.length > 0 && (
              <View style={styles.itemRow}>
                <Text preset="fieldLabel" style={styles.label}>
                  {translate("webScreen.contractNumber")}:
                </Text>
                <Text style={[styles.content]}>{product.ContractNumber}</Text>
              </View>
            )}
            {product.ExpirationDate?.length > 0 && (
              <View style={styles.itemRow}>
                <Text preset="fieldLabel" style={styles.label}>
                  {translate("productsScreen.expirationDate")}:
                </Text>
                <Text style={[styles.content]}>{product.ExpirationDate}</Text>
              </View>
            )}
            {formattedNumber?.length > 0 && (
              <View style={styles.itemRow}>
                <Text preset="fieldLabel" style={styles.label}>
                  {translate("productsScreen.contactNumber")}:
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${formattedNumber}`)}
                >
                  <Text style={[styles.link, styles.content]}>
                    {formattedNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {product.ProductDescription?.length > 0 && (
              <View style={[styles.itemRow, {marginTop: spacings.medium}]}>
                <Text
                  preset="fieldLabel"
                  style={[styles.label, styles.longText]}
                >
                  {product.ProductDescription}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <>{actionButtons}</>
    </View>
  )
}
