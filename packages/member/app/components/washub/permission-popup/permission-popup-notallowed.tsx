import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, ScrollView, useWindowDimensions, Image } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./permission-popup-style";
import { useAppState } from "../../../context/app-state-context";
import Modal from "react-native-modal";

const PermissionPopupNotAllowed = ({ modalVisible, text, setModalVisible, onPress }) => {
    const { appState } = useAppState();
    const scrollRef = useRef<ScrollView>(null);
    const [termsAndConditions, setTermsAndConditions] = useState("");
    const screenDimensions = useWindowDimensions();

    return (
        <Modal
            animationIn="fadeInLeft"
            animationOut={"fadeOutRight"}
            animationInTiming={500}
            animationOutTiming={500}
            propagateSwipe
            accessibilityViewIsModal
            backdropTransitionOutTiming={0}
            isVisible={modalVisible}
            style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 40,
            }}
            deviceHeight={screenDimensions.height}
            deviceWidth={screenDimensions.width}
            useNativeDriver={false}
            avoidKeyboard
        >
            <>
                <View style={styles.modalContentContainer}>
                    <View style={styles.modalContainer}>
                        <View style={{ padding: 10, height: 50, width: 50 }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={require('../../../../assets/images/bell.png')}
                            />
                        </View>
                        <Text style={styles.modalTitle}>
                            {text}
                        </Text>
                        <Pressable
                            style={[styles.modalButton]}
                            onPress={onPress}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </Pressable>
                    </View>

                </View>
            </>
        </Modal>
    );
};

export default PermissionPopupNotAllowed;
