import {
  ActivityIndicator,
  Image,
  View,
  Alert,
  Animated,
  ScrollView,
  Easing,
} from "react-native";

import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";

import QRCode from "react-native-qrcode-svg";
import Barcode from "react-native-barcode-builder";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./redeem-screen.styles";
import {
  formatStandardTime,
  formattedCode,
} from "../../../../shared/utils/common";
import WashubClient from "../../services/api/api";
import { useAppState } from "../../context/app-state-context";
import { navigate } from "../../navigators";
import { Redemption } from "../../../../shared/services/api";
import { VehiclePreview } from "../../components/vehicle-preview/vehicle-preview";
import WashIcon from "../../components/svg/car-wash";
import {
  Button,
  GradientBackground,
  Screen,
  VIcon,
} from "../../../../shared/components";
import { translate } from "../../i18n";
import CustomHeader from "../../../../shared/components/custom-header/custom-header";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { color, spacings } from "../../../../shared/theme";
import { cardStyles } from "../washub/favourites/favourites-screen.styles";
import { scheduleFeedback } from "../../services/actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { centerContent } from "../../../../shared/components/screen/screen.styles";
import { useAuthState } from "../../../../shared/contexts/auth-state-context";
import { Text } from "../../../../shared/components/text/text";

const pulseColor = (alpha: number) => `rgba(255,50,0, ${alpha})`;

const SuccessIcon = (
  <VIcon
    family="Ionicons"
    name="md-checkmark-circle"
    size={150}
    color={color.palette.green}
  />
);

const generateHTML = (body: string) => {
  return ` 
  <!DOCTYPE html>\n
  <html>
    <head>
      <title>Hello World</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=320, user-scalable=no">
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
          font: 70% arial, sans-serif;
          background: transparent;
        }
      </style>
    </head>
    <body>
      <div>${body}</div>
    </body>
  </html>
    `;
};

const RedeemScreen = () => {
  const { setAppState } = useAppState();
  const { authState } = useAuthState();
  const route = useRoute<any>();
  const { station, response } = route.params;
  const [pulseAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(response ? false : true);
  const [codeInfo, setCodeInfo] = useState(response);
  const [date, setDate] = useState(new Date());

  const [error, setError] = useState(null);
  const { profile } = authState;
  const { card } = route.params;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [pulseAnimation]);

  const borderColor = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [pulseColor(1), pulseColor(0)],
  });

  const margin = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  useEffect(() => {
    if (!response && !codeInfo) {
      WashubClient.redeemWash({
        CardCode: card.CardCode,
        StationId: station.LocationId,
        selfValidated: station.AllowsSelfValidation,
      }).then((redeemResponse) => {
        setIsLoading(false);
        /* setCodeInfo({
          RedemptionType: "CardCode",
          RedemptionCode: "169745932",
          RedemptionInstruction: "RedemptionInstruction",
          ResponseMessage:
            "ResponseMessage jhbjfdb hj hhdf hjb jb h fh fhgj jgjgsfjgjgj sjg",
        });*/
        if (redeemResponse.error) {
          setIsLoading(false);
          setError(redeemResponse.error.message);
        } else {
          const redemption: Redemption = {
            response: redeemResponse.result,
            station: station,
            card: card,
            date: date.toDateString(),
            email: profile?.Email,
          };
          setAppState({
            activeRedemption: redemption,
            lastRedemption: redemption,
          });

          setIsLoading(false);
          setCodeInfo(redeemResponse.result);
        }
      });
    }
  }, [card, response, station, codeInfo]);

  const dismiss = () => {
    Alert.alert(`${translate("redeemWashScreen.dismissMsg")}?`, undefined, [
      { text: translate("common.no") },
      {
        text: translate("common.yes"),
        onPress: () => {
          setAppState({ activeRedemption: null });

          navigate("home", {
            screen: "default",
          });
          scheduleFeedback({ station, card });
        },
      },
    ]);
  };

  const renderResponseMessage = () => {
    if (!codeInfo) {
      return null;
    }

    const { ResponseMessage, ResponseHtmlMessage } = codeInfo;

    return (
      <WebView
        key={ResponseMessage}
        originWhitelist={["*"]}
        source={{
          html: generateHTML(ResponseHtmlMessage || ResponseMessage),
        }}
        containerStyle={styles.webContainer}
      />
    );
  };

  const renderCode = () => {
    if (!codeInfo) {
      return null;
    }

    const { RedemptionCode, RedemptionType, RedmptionInstructions } = codeInfo;

    return (
      <View style={styles.codeContainer}>
        <Text style={styles.headerText}>{RedmptionInstructions}</Text>
        <View style={styles.qrView}>
          {RedemptionType === "QRCode" && (
            <QRCode
              value={String(RedemptionCode)}
              size={180}
              logo={require("../../../../assets/images/app-logo-small.png")}
            />
          )}
          {RedemptionType === "Barcode" && (
            <Barcode value={String(RedemptionCode)} format="CODE128" />
          )}
        </View>
        <Text style={styles.codeBar}>
          {translate("redeemWashScreen.redemptionCode")}:{" "}
          {formattedCode(RedemptionCode)}
        </Text>
        <Text style={styles.enjoyText}>
          {translate("redeemWashScreen.enjoyMsg1")}!
        </Text>
        {renderResponseMessage()}
      </View>
    );
  };

  const logoUrl = route.params.card.DealerLogoUrl
    ? route.params.card.DealerLogoUrl
    : "";

  let content;
  if (isLoading) {
    content = (
      <View style={styles.container}>
        <ActivityIndicator color="#222" style={styles.loader} size="large" />
      </View>
    );
  } else if (error) {
    content = content = <Text style={styles.errorMessage}>{error}</Text>;
  } else if (codeInfo) {
    if (station.AllowsSelfValidation) {
      content = (
        <View style={{ alignItems: "center" }}>
          {
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={{ uri: logoUrl }}
            />
          }
          <View style={styles.pulseCard}>
            <Animated.View
              style={[
                styles.pulse,
                {
                  borderWidth: Animated.multiply(pulseAnimation, 8),
                  margin,
                  borderColor,
                },
              ]}
            />
            <Text style={styles.title}>
              {date.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
            <Text style={styles.title}>{formatStandardTime(date)}</Text>
            {SuccessIcon}
            <Text style={styles.headerText}>
              {translate("redeemWashScreen.enjoyMsg2")}!
            </Text>
          </View>

          <View style={styles.centerColumn}>
            {renderResponseMessage()}
            <Text style={styles.attendantNotice}>
              {translate("redeemWashScreen.showScreenToAttendant")}
            </Text>
            <Text style={styles.cardCode}>
              {translate("redeemWashScreen.cardCode")}:{" "}
              {formattedCode(card.CardCode)}
            </Text>
          </View>
        </View>
      );
    } else {
      content = (
        <View style={styles.containerOuter}>
          <Image
            style={styles.logoImage}
            resizeMode="contain"
            source={{ uri: logoUrl }}
          />
          {renderCode()}
        </View>
      );
    }
  }

  return (
    <View testID="redeemScreen" style={styles.FULL}>
      <Screen
        unsafe
        style={[
          styles.containerOuter,
          centerContent({ insets: { top: insets.top, bottom: insets.bottom } }),
        ]}
      >
        <GradientBackground />
        <View style={styles.containerOuter}>
          <View style={[cardStyles.card, styles.card]}>
            <View style={styles.container}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                indicatorStyle="black"
                style={styles.scrollView}
              >
                {content}
                <VehiclePreview allowFlip card={card} />
                {!error && (
                  <Button
                    onPress={() => dismiss()}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 60,
                      marginBottom: 40,
                    }}
                  >
                    <Text style={styles.cancelButton}>
                      {translate("common.done")}
                    </Text>
                  </Button>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
        <CustomHeader
          leftContent={
            <BackButton
              text={translate("common.close")}
              onPress={navigation.goBack}
              type="close"
            />
          }
          centerContent={
            <WashIcon
              width={spacings.icons["medium+"]}
              height={spacings.icons["medium+"]}
              fill={color.palette.red}
            />
          }
        />
      </Screen>
    </View>
  );
};

export default RedeemScreen;
