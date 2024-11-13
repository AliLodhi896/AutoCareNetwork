import React, { useState, useEffect } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View } from "react-native";
import { styles } from "./redeem-mileage.style";

export function ChooseWashPlan({
  isPremiumOnly,
}: {
  isPremiumOnly: boolean;
}) {
  return (
    <View>
      <Text style={{...styles.title,...styles.bold,color:'#000',marginTop:50}}>G&E CARD WASH</Text>
      <View style={styles.premiumContainer}>
        <Text style={styles.titlepremium}>PREMIUM WASH</Text>
        <Text style={{ ...styles.textpremium}}>Delux + Underbody, Wheel blaster, Bug Prep, Lustra Sheet</Text>
        <Text style={{ ...styles.chargepremium}}>$2 UPCHARGE</Text>
      </View>
    </View>
  );
}
