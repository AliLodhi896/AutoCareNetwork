import { View, Text } from 'react-native'
import React from 'react'
import {styles} from './plan.styles'
import { normalize } from '../../../../../shared/utils/normalize'
const Plan = ({
    title,
    dateText,
    description
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>6 Washes / Month</Text>
      <Text  style={styles.secondText}>For one year. Expire 10/31/23</Text>
      <Text style={styles.secondText}>2022 Toyta highlander</Text>
    </View>
  )
}

export default Plan