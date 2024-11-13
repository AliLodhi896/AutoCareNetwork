import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, ScrollView, Dimensions } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./terms-and-conditions.style";
import WashubClient from "../../../services/api/api";
import RenderHtml from "react-native-render-html";
import { useAppState } from "../../../context/app-state-context";
import Modal from "react-native-modal";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import { decode } from "html-entities";

function TermsAndConditions() {
  const { appState } = useAppState();
  const scrollRef = useRef<ScrollView>(null);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { authState, setAuthState } = useAuthState();

  useEffect(() => {
    (async () => {
      try {
        const { response } = await WashubClient.getTerms();
        setTermsAndConditions(response.data.Terms);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  useEffect(() => {
    const showModal = !authState.AcceptTerms && !appState.isLoading && termsAndConditions 

    if (!showModal) {
      
      setModalVisible(false);
      return
    }
    
    
    const timer = setTimeout(() => setModalVisible(true), 500);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }    
  }, [authState.AcceptTerms, appState.isLoading, termsAndConditions]);

  const acceptTerms = async () => {
    await WashubClient.acceptTerms();
    setModalVisible(false);
    setAuthState({ AcceptTerms: true });
  };

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
        margin: 25,
      }}
      statusBarTranslucent={true}
      deviceHeight={Dimensions.get("screen").height}
      useNativeDriver={false}
      avoidKeyboard
    >
      {termsAndConditions !== "" && (
        <View style={{flex: 1, padding: 20}}>
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            style={[styles.modalContentContainer, {borderRadius: 16, backgroundColor: "white", margin: 20}]}
            ref={scrollRef}
          >
            <View style={styles.modalContainer}>
              <RenderHtml
                contentWidth={200}
                source={{ html: decode(termsAndConditions) }}
              />
            </View>
          </ScrollView>

          <Pressable
            style={[styles.modalButton, {marginHorizontal: 40}]}
            onPress={async () => await acceptTerms()}
          >
            <Text style={styles.buttonText}>Accept T&C</Text>
          </Pressable>
        </View>
      )}   
    </Modal>
  );
}

export default TermsAndConditions
