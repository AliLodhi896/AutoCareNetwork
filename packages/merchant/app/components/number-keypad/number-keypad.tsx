import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { VIcon, Text } from '../../../../shared/components';
import { color, spacings } from '../../../../shared/theme';
import { styles } from './number-keypad.style';

type Props = {
  onSelect: (value: string) => void;
  onDelete: () => void;
};

export const NumericKeypad = (props: Props) => {
  const { onSelect, onDelete } = props;

  const NumberButton = ({ value }: { value: string }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onSelect(value)}
      accessibilityLabel={value}>
      <View>
        <Text style={styles.buttonText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <NumberButton value="1" />
        <NumberButton value="2" />
        <NumberButton value="3" />
      </View>
      <View style={styles.row}>
        <NumberButton value="4" />
        <NumberButton value="5" />
        <NumberButton value="6" />
      </View>
      <View style={styles.row}>
        <NumberButton value="7" />
        <NumberButton value="8" />
        <NumberButton value="9" />
      </View>
      <View style={styles.row}>
        <View style={styles.rowContent} />
        <NumberButton value="0" />
        <TouchableOpacity style={styles.backspace} onPress={onDelete}>
          <VIcon
            family="Ionicons"
            name="backspace-outline"
            size={spacings.large}
            color={color.palette.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};




