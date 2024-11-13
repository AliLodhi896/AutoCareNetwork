import React from 'react'
import { TouchableOpacity, View, TextStyle, ViewStyle } from 'react-native';
import { Text, VIcon } from './../../components'
import { fontsize, color, } from './../../theme'
import { styles } from './settings-list-item.style';

interface SettingItemProp {
    label: string | null;
    onPress: () => void;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

export const SettingItem = (props: SettingItemProp) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.container, props.containerStyle]}
        >
            <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
            <VIcon
                family="FontAwesome"
                name="chevron-right"
                color={color.palette.lightGrey}
                size={fontsize.medium}
            />
        </TouchableOpacity>
    );
};