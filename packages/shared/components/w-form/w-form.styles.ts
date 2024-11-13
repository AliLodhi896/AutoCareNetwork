import { StyleSheet } from 'react-native';
import { color, spacings } from '../../theme';

export const styles = StyleSheet.create({
    formError: {
      padding: spacings.smaller,
      marginHorizontal: 1.2 * spacings.smaller,
    },
    formErrorText: {
      color: color.error,
      fontSize: 14,
      fontWeight: "500",
    },
    formRow: {
      display: "flex",
      flexDirection: "column",
    },
    mainContainer: {
      height: "100%",
    },
  });
  