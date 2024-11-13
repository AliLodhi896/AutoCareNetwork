import React from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View } from "react-native";
import { styles } from "./plan-details.style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import IconX from "../../svg/icon-x";
import { normalize } from "../../../../../shared/utils/normalize";

interface PlanDetailsProps {
  close(): void;
}

export function PlanDetails({ close }: PlanDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => close()}>
          <IconX />
        </TouchableOpacity>
        <Text style={styles.title}>WHAT YOUR PLAN INCLUDES</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          <Text style={styles.text}>
            Autocare members are entitled to full-service car washes. While
            what’s included with a full-service wash may vary among different
            locations, your wash will always include at least the following:
          </Text>
          <View style={[styles.list, { marginTop: normalize(20) }]}>
            <Text style={styles.bullet}>{"\u2B24"}</Text>
            <Text style={styles.text}>EXTERIOR WASH OF YOUR CAR</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.bullet}>{"\u2B24"}</Text>
            <Text style={styles.text}>VACUUM OF THE INSIDE</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.bullet}>{"\u2B24"}</Text>
            <Text style={styles.text}>WIPE DOWN OF THE DASH/CONSOLE</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.bullet}>{"\u2B24"}</Text>
            <Text style={styles.text}>CLEANING OF WINDOWS INSIDE/OUT </Text>
          </View>
          <Text style={[styles.text, { marginVertical: normalize(20) }]}>
            NOTE: There are a small number of car washes that only offer
            exterior washes. Autocare partnered with these locations for your
            convenience. Any location that offers full service will provide a
            full service wash for Autocare members.
          </Text>
          <Text style={styles.text}>
            The cost of any upgrade beyond a full service wash is the member’s
            resposnsibility. Tipping is up to the member.
          </Text>
          <View style={styles.spacer} />
        </ScrollView>
      </View>
    </View>
  );
}
