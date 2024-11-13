import { StyleSheet } from "react-native";
import { color, fontsize, spacings, typography } from "../../../../shared/theme";
export const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#f0f0f0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rowContent: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: spacings.small,
  },
  backspace: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: spacings.small,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: color.palette.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacings.small,
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: fontsize.large,
    fontFamily: typography.primary,
    color: color.palette.black,
  },
});

