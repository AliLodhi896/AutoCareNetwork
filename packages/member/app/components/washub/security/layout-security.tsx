import React, { ReactNode, useCallback } from "react";
import {
  ImageBackground,
  Platform,
  View,
  ViewProps,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./layout-security.style";
import IconWSText from "../../svg/icon-ws-text";
import IconKey from "../../svg/icon-key";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import WashubClient from "../../../services/api/api";
import Communications from "react-native-communications";
import { normalize } from "../../../../../shared/utils/normalize";
import analytics from '@react-native-firebase/analytics';

const BackgroundDrops = require("../washub-app-background.png");
const Logo = require("../../../../assets/images/logo-transparent.png");

const isIOS = Platform.OS === "ios";

interface Props {
  children: ReactNode;
  headerStyle?: ViewProps;
}


const LayoutSecurity = ({ children, headerStyle, ...props }: Props) => {

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Reset Password',
    });
  }
  

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#1B588A" }} {...props}>
      <ImageBackground
        source={BackgroundDrops}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.layoutHeader}>
          <Image
            source={Logo}
            style={{
              alignSelf: "center",
              width: normalize(100),
              height: normalize(109),
            }}
          />
          <View style={styles.backContainer}>
            {navigation.canGoBack() && (
              <Pressable
                style={styles.backPressable}
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={{ ...styles.backButton, ...styles.backButtonXS }}
                  text="<"
                />
                <Text style={styles.backButton} text="BACK" />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.layoutBody}>{children}</View>
        <View style={styles.layoutFooter}>
          <View style={styles.lauoutFooterBtns}>
            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => {
                scrreenView()
                Communications.web(WashubClient.forgotPassword());
              }}
            >
              <View style={styles.footerIconWrapper}>
                <IconKey />
              </View>
              <Text style={styles.footerText} text="Reset Password" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerTouchable}
              onPress={() => {
                navigation.navigate("contact");
              }}
            >
              <View style={styles.footerIconWrapper}>
                <IconWSText />
              </View>
              <Text style={styles.footerText} text="Contact us" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LayoutSecurity;
