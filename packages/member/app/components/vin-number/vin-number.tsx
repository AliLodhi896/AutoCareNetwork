import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text/text'; 
import { styles } from './vin-number.style';

const DB_BG_COLOR = '#f9ad40';

export default function VIN({
    vin,
    fontSize,
}: {
    vin?: string | null;
    fontSize?: number;
}) {
    const last6 = vin?.slice(-6);
    const first = vin?.slice(0, -6);

    return (
        <View style={styles.container}>
            <Text allowFontScaling={false} style={{ fontSize }}>
                {first}
            </Text>
            <Text allowFontScaling={false} style={{ color: DB_BG_COLOR, fontSize }}>
                {last6}
            </Text>
            <Text
                allowFontScaling={false}
                selectable
                style={[styles.invisibleText, { fontSize }]}>
                {vin}
            </Text>
        </View>
    );
}