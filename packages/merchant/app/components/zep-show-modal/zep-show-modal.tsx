import React from "react";
import { TouchableOpacity, View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import HTML from "react-native-render-html";
import { styles } from "./zep-show-modal.style";
import { ScrollView } from "react-native-gesture-handler";
import { color, screenDimensions, spacings } from "../../../../shared/theme";
import { translate } from "../../i18n";
import { Text } from "../../../../shared/components/text/text";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";

interface ZepQualificationInfoModalProps {
  zepQualificationInfo: string;
}

export const ZepQualificationInfoModal = (props: ZepQualificationInfoModalProps) => {
  const { zepQualificationInfo} = props;
  const modal = useModal();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.entitlementScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <HTML
            contentWidth={screenDimensions.width}
            computeEmbeddedMaxWidth={() => screenDimensions.width - 100}
            source={{
              html: `<div style="textAlign:center;margin: 6px;color:${color.palette.white};"> ${zepQualificationInfo} </div>`,
            }}
          />

          <TouchableOpacity
            style={styles.advanceEntitlementsButton}
            onPress={() => {
              modal.hideModal();
            }}
          >
            <VIcon
              onPress={() => {
                modal.hideModal();
              }}
              family="FontAwesome"
              name="check"
              size={spacings.icons["medium+"]}
              color={color.palette.white}
            />
            <Text style={styles.advanceEntitlementsButtonText}>
              {translate("common.done")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
