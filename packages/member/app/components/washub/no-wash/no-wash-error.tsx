import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, ScrollView, useWindowDimensions,Image } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./no-wash.style";
import WashubClient from "../../../services/api/api";
import RenderHtml from "react-native-render-html";
import { useAppState } from "../../../context/app-state-context";
import Modal from "react-native-modal";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { decode } from "html-entities";
import { Loader } from "../loader/loader";
import { fontsize } from "../../../../../shared/theme";

const NoWashError = ({ modalVisible, text,setModalVisible }) => {
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
            backdropOpacity={0.85}
            isVisible={modalVisible}
            style={{
                alignItems: "center",
                justifyContent: "center",
                // margin: 40,
                backgroundColor:"transparent"
            }}
            statusBarTranslucent={true}
            deviceHeight={screenDimensions.height}
            deviceWidth={screenDimensions.width}
            // useNativeDriver={false}
            // avoidKeyboard
        >
            <>
                <View style={styles.modalContentContainer}>
                    <View style={styles.modalContainer}>
                        <View style={{padding:10,backgroundColor:'white',borderRadius:100,position:'absolute',marginTop:-40,height:80,width:80}}>
                            <Image 
                                style={{width:'100%',height:'100%'}}
                                source={require('../../../../assets/images/warning.png')}
                            />
                        </View>
                        <Text style={styles.modalTitle}>
                            {text}
                        </Text>
                        <Pressable
                        style={[styles.modalButton]}
                        onPress={setModalVisible}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </Pressable>
                    </View>

                </View>
            </>
        </Modal>
    );
};

export default NoWashError;
