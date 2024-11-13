import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Text } from "../../../../shared/components"
import { translate } from "../../i18n"
import { RedeemProps } from "./redeem-card.props"
import { styles } from "./redeem-card.style"


export const RedeemCard = (props: { redeem: RedeemProps }) => {
  const { redeem } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, styles.textSpace]}>{redeem.name}</Text>
        <Text style={[styles.others, styles.textSpace]}>{redeem.street}</Text>
        <Text style={[styles.others, styles.textSpace]}>{redeem.address}</Text>
        <Text style={[styles.others, styles.textSpace]}>{redeem.phone}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={[styles.type, styles.textSpace]}>{redeem.type}</Text>
          <View style={styles.rectangle}></View>
        </View>
        <Text style={[styles.miles, styles.textSpace]}>{redeem.mile} {translate('common.mile')}</Text>
      </View>
    </TouchableOpacity>
  )
}

