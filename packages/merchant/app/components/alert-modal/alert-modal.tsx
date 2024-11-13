import React from "react";
import { TouchableOpacity, View } from "react-native";
import useModal from "../../../../shared/contexts/modal/useModal";
import { translate } from "../../i18n";
import { color, spacings } from "../../../../shared/theme";
import { Text } from "../../../../shared/components/text/text";
import { styles } from "./alert-modal.styles";
import { VIcon } from "../../../../shared/components/v-icon/v-icon";
import { CircleButton } from "../../../../shared/components/circle-button/circle-button";

interface AlertModalProps {
  title?: string;
  content: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export const AlertModal = ({ title, content, backgroundColor, onPress }: AlertModalProps) => {
  const modal = useModal();

  const closeModal = () => {
    modal.hideModal();
    onPress && onPress();
  }
  
  return (
    <View style={[styles.helpContainer, backgroundColor && {backgroundColor: backgroundColor}]}>
        <View style={styles.modalHeadView}>
          <TouchableOpacity onPress={() => modal.hideModal()}>
            <VIcon
              family="Ionicons"
              name="close-sharp"
              size={spacings.icons.small}
              color={color.palette.white}
            />
          </TouchableOpacity>
        </View>


        {title && <Text
          style={styles.AlertModalBoldText}
          text={title}
        />}

   
        <View style={styles.AlertModalView}>
          <Text
            style={styles.AlertModalContentText}
            text={content}
          />
        </View>

        <View>
         <CircleButton
            
            noText
            onPress={closeModal}
            style={styles.circle}
            textStyle={styles.circleText}
            icon={<Text style={styles.circleText}>{translate("common.ok")}</Text>}
          />
        </View>
    </View>
  );
};
