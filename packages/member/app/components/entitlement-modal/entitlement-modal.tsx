import React from "react";
import { TouchableOpacity, View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { styles } from "./entitlement-modal.style";
import { ScrollView } from "react-native-gesture-handler";
import { color,  spacings } from "../../../../shared/theme";
import { translate } from "../../i18n";
import { Text } from "../../../../shared/components/text/text";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";

interface EntitlementModalProps {
  entitlements: Array<string>;
  advanceEntitlements: () => void;
}

export const EntitlementModal = (props: EntitlementModalProps) => {
  const { entitlements, advanceEntitlements } = props;
  const modal = useModal();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.entitlementScroll}>
        <View style={styles.content}>
        <View>
          {entitlements[0]}
        </View>

        <View style={styles.bottomView}>
        <TouchableOpacity
            style={styles.advanceEntitlementsButton}
            onPress={() => {
              advanceEntitlements();
              modal.hideModal();
            }}
          >
            <VIcon
              onPress={() => {
                advanceEntitlements();
                modal.hideModal();
              }}
              family="FontAwesome"
              name="check"
              size={spacings.icons["medium+"]}
              color={color.palette.white}
            />
            <Text style={styles.advanceEntitlementsButtonText}>
              {translate("common.confirm")}
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};
