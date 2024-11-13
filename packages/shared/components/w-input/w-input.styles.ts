import { StyleSheet } from 'react-native';
import { color, fontsize, spacings, typography } from '../../theme';
import { normalize } from '../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    margin: 5,
    borderWidth: 2,
    borderRadius: 2 * spacings.smaller,
    borderColor: color.palette.red,
    height: normalize(65),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    justifyContent: "center",
  },
  secureButton: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2 * spacings.smaller,
  },
  textInput: {
    flex: 1,
    alignSelf: "center",
    minHeight: normalize(30),
    padding: 0,
    color: color.palette.black,
    fontFamily: typography.secondary,
    fontSize: fontsize.medium,
  },
})
