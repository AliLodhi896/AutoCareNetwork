import { StyleSheet } from "react-native";
import { fontsize, spacings } from "../../../../shared/theme";

export const styles = StyleSheet.create({
    priceField: {
      flexDirection: 'row',
      width: 290,
      justifyContent: 'space-between',
      marginTop: spacings.small,
      marginBottom: spacings.small,
    },
    text18: {
      fontSize: fontsize.mediumOne,
    },
  });
  