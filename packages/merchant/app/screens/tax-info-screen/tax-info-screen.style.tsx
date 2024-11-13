import { StyleSheet } from "react-native";
import { spacings } from "../../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: spacings.medium,
  },
  longMessage: {
    marginTop: spacings.medium,
    textAlign: 'center',
    lineHeight: spacings["medium+"],
  },
});