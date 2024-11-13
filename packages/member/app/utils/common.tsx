import React from "react";
import { PixelRatio, Platform, StyleSheet, View } from "react-native";
import { AutoImage, Text } from "../../../shared/components";
import {
  color,
  fontsize,
  Radii,
  screenDimensions,
  spacings,
  typography,
} from "../../../shared/theme";
import { translate } from "../i18n";
import { Card, isDealerBundleApp } from "../services/api";
import HTML from "react-native-render-html";
import { shadower } from "../../../shared/utils/common";
import { ICardType } from "../washub-types";

export function headerLogo(): any {
  return isDealerBundleApp() ? DB_LOGO : ANIT_LOGO;
}

export const DB_LOGO = require("../../assets/images/logos/db_header.png");
export const ANIT_LOGO = require("../../assets/images/app-logo.png");
export function getWashText(card?: Card): string {
  const washCount = card?.WashesAvailable ?? 0;
  if (washCount > 0) {
    const washText =
      washCount === 1 ? translate("common.wash") : translate("common.washes");
    return `${washCount} ${washText} ${translate("common.available")}`;
  } else if (card?.CanWashToday) {
    return `${translate("redeemWashScreen.washAvailableToday")}?`;
  }
  return translate("redeemWashScreen.noWashAvailable");
}

export function getEntitlements(cards: Card[]): string[] {
  return cards
    .filter((c) => c.CardType === "MEMBER")
    .reduce((acc: any[], c) => {
      const { ExpirationDate, CardDescription, ValidDate } = c;

      const issueDateArray = ValidDate?.split("/");
      const expirationDateArray = ExpirationDate?.split("/");

      const issueText =
        issueDateArray?.length > 0
          ? " " +
            issueDateArray[0] +
            " / " +
            issueDateArray[1] +
            " / " +
            issueDateArray[2].slice(2)
          : "";

      const expirationText =
        expirationDateArray?.length > 0
          ? " " +
            expirationDateArray[0] +
            " / " +
            expirationDateArray[1] +
            " / " +
            expirationDateArray[2].slice(2)
          : "";
      const styles = StyleSheet.create({
        headerimage: {
          alignSelf: "center",
        },
        block: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: spacings.large,
        },
        blockTitle: {
          fontFamily: typography.secondary,
          color: color.palette.white,
        },
        blockBody: {
          fontFamily: typography.primary,
          color: color.palette.white,
          marginTop: spacings.small,
        },
        text: {
          fontFamily: typography.secondary,
          color: color.palette.white,
        },
        image: {
          width: screenDimensions.width - 2 * spacings.mediumOne,
          height: 2 * spacings.massive,
          borderRadius: Radii.large,
          ...shadower(2),
          alignSelf: "center",
        },
        content: {
          flex: 1,
          paddingHorizontal: spacings.medium,
        },
        confirmText: {
          fontFamily: typography.secondary,
          color: color.palette.white,
          textTransform: "uppercase",
          fontSize: fontsize.medium,
        },
        line: {
          backgroundColor: "white",
          height: 1,
          width: "100%",
          opacity: 0.5,
          marginVertical: spacings.large,
        },
      });

      const descHtml = (
        <View>
          <AutoImage
            resizeMode="contain"
            style={styles.image}
            source={{ uri: c.DealerLogoUrl }}
          />
          <View style={styles.content}>
            <View style={styles.line} />

            <Text style={styles.text}>
              {translate("entitlementModal.headText")}:
            </Text>

            <View style={styles.block}>
              <Text style={styles.blockTitle}>
                {translate("entitlementModal.plan")}:
              </Text>
              <Text style={styles.blockBody}>{CardDescription}</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>
                {translate("entitlementModal.issue")}:
              </Text>
              <Text style={styles.blockBody}>{issueText}</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>
                {translate("entitlementModal.expires")}:
              </Text>
              <Text style={styles.blockBody}>{expirationText}</Text>
            </View>

            <View style={styles.line} />

            <Text style={styles.text}>
              {translate("entitlementModal.footerText0")}{" "}
              <Text style={styles.confirmText}>
                {translate("common.confirm")}
              </Text>{" "}
              {translate("entitlementModal.footerText1")}{" "}
              {translate("entitlementModal.footerText2")}
            </Text>
            {c.CardType === "MEMBER" && c.Entitlements != null && (
              <HTML
                contentWidth={screenDimensions.width}
                computeEmbeddedMaxWidth={() => screenDimensions.width - 100}
                source={{
                  html: `<div style="textAlign:center;margin: 6px;color:${color.palette.white};"> 
                 <img style="align-self:center;" src=${c.DealerLogoUrl}>${c.Entitlements}
             </div>`,
                }}
              />
            )}
          </View>
        </View>
      );

      acc.push(descHtml);

      return acc;
    }, []);
}

export function getDistanceInMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371; //convert to miles;
}

export function isAndroidFontLargest() {
  const fontScale = PixelRatio.getFontScale();

  if (Platform.OS === "android") {
    return fontScale > 1.29;
  }
  return fontScale > 1.2;
}

export function getCardBookServiceUrl(card: Card): string {
  let productLink = "";
  card.Products.forEach((product) => {
    if (product.BookServiceLink) {
      productLink = product.BookServiceLink;
      return;
    }
  });
  if (card.CardType === ICardType.Service) {
    productLink = card.BookServiceUrl;
  }
  return productLink ?? "";
}
