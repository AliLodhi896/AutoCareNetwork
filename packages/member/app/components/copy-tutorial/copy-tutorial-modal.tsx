import React, { useRef, useEffect } from "react";
import { useState } from "react";
import PageControl from "./PageControl";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "../../../../shared/components/text/text";
import { PADDING, styles } from "./copy-tutorial-modal.styles";
import FingerPrintIcon from "../../components/svg/finger_press";
import { color, spacings } from "../../../../shared/theme";
import { translate } from "../../i18n";
import useModal from "../../../../shared/contexts/modal/useModal";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";

const { width } = Dimensions.get("window");

export default function CopyTutorial(props: {
  visible: boolean;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const modal = useModal();
  const scrollRef = useRef<ScrollView>(null);

  const onNext = () => {
    if (index < 2) {
      setIndex(index + 1);
    } else {
      props.onComplete();
      modal.hideModal();
    }
  };

  const onBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (!props.visible) {
      setIndex(0);
    }
  }, [props.visible]);

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      x: (width - PADDING * 2) * index,
      y: 0,
      animated: true,
    });
  }, [index]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ScrollView
          ref={scrollRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View style={styles.page}>
            <Text style={styles.header}>
              {translate("webScreen.copiableAccountVehicleInfo")}
            </Text>
            <Text fontFamily="secondary" style={styles.content}>
              {translate("webScreen.copyTutorial.text0")}
            </Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../../assets/images/tour1.png")}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.header}>
              {" "}
              {translate("webScreen.copyTutorial.text1")}
            </Text>
            <Text fontFamily="secondary" style={styles.content}>
              {translate("webScreen.copyTutorial.text2")}
            </Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../../assets/images/tour2.png")}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.header}>
              {" "}
              {translate("webScreen.copyTutorial.text3")}
            </Text>
            <Text fontFamily="secondary" style={styles.content}>
              {translate("webScreen.copyTutorial.text4")}
            </Text>
            {
              <FingerPrintIcon
              />
            }
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.sideIcon} onPress={onBack}>
            <View style={styles.sideIcon}>
              {index > 0 && (
                <VIcon
                  family="Ionicons"
                  name={"chevron-back"}
                  size={spacings.icons.small}
                  color={color.palette.white}
                />
              )}

              <Text style={[styles.buttonText, { opacity: index > 0 ? 1 : 0 }]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>

          <PageControl pageCount={3} index={index} />

          {index === 2 ? (
            <TouchableOpacity style={styles.sideIcon} onPress={onNext}>
              <Text style={styles.buttonText}> {translate("common.done")}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sideIcon} onPress={onNext}>
              <View style={styles.sideIcon}>
                <Text style={styles.buttonText}>
                  {translate("common.next")}
                </Text>

                <VIcon
                  family="Ionicons"
                  name={"chevron-forward"}
                  size={spacings.icons.small}
                  color={color.palette.white}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
