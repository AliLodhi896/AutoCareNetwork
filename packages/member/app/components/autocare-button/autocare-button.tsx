import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Button } from '../../../../shared/components/button/button';
import { Text } from '../../../../shared/components/text/text';
import { styles } from './autocare-button.style';

type Props = {
  type: 'primary' | 'secondary' | 'bordered' | 'dealerBundle';
  caption: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
  onPress: () => void;
};

const AutocareButton = ({type = 'primary', ...props}: Props) => {
  const caption = props.caption.toUpperCase();
  let icon;
  let content;
  const styleOverrides: StyleProp<ViewStyle> = {};
  if (props.color) {
    styleOverrides.backgroundColor = props.color;
  }
  if (type === 'primary') {
    content = (
      <View
        style={[
          styles.button,
          styles.primaryButton,
          styleOverrides,
          props.style,
        ]}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.caption, styles.primaryCaption]}>
          {caption}
        </Text>
      </View>
    );
  } else if (type === 'secondary') {
    content = (
      <View style={[styles.button, styles.secondaryButton]}>
        <Text style={[styles.caption, styles.secondaryCaption]}>{caption}</Text>
      </View>
    );
  } else if (type === 'dealerBundle') {
    content = (
      <View
        style={[
          styles.button,
          styles.secondaryButton,
          styles.dealerBundleButton,
        ]}>
        <Text style={[styles.caption, styles.secondaryCaption]}>{caption}</Text>
      </View>
    );
  } else {
    const border = type === 'bordered' && styles.border;
    content = (
      <View
        style={[
          styles.button,
          styles.borderButton,
          border,
          { borderColor: props.color },
        ]}>
        {icon}
        <Text
          style={[
            styles.caption,
            styles.borderCaption,
            { color: props.color ?? 'black' },
          ]}>
          {caption}
        </Text>
      </View>
    );
  }

  return (
    <Button
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      {content}
    </Button>
  )
};

export default AutocareButton;
