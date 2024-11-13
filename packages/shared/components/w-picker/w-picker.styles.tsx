import {
  color,
  spacing,
  fontsize,
  typography,
  spacings,
} from "../../theme";
import { StyleSheet } from "react-native";

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
    width: 290,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
    width: 290,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export const pickerSelectErrorStyle = StyleSheet.create({
  inputIOS: {
    ...pickerSelectStyles.inputIOS,
    borderColor: color.palette.red,
  },
  inputAndroid: {
    ...pickerSelectStyles.inputAndroid,
    borderColor: color.palette.red,
  },
});

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.red + "69",
    marginBottom: spacing[4],
    borderRadius: spacings.borderRadius.small,
  },
  label: {
    fontSize: fontsize.medium,
    marginRight: 10,
    color: color.palette.black,
  },
  textInput: {
    fontSize: fontsize.medium,
    paddingVertical: 0,
    paddingLeft: spacings.medium,
    fontFamily: typography.primary,
    flex: 1,
  },
  pickerView: {
    flex: 1,
    flexDirection: "column",
  },
});
