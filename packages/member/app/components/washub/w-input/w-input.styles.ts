import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import {
  color,
  fontsize,
  spacings,
  typography,
} from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    margin: 5,
    borderWidth: 2,
    borderRadius: normalize(8),
    borderColor: "#00BCFF",
    height: normalize(60),
    alignItems: "center",
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
    color: "#969696",
    fontFamily: typography.primary,
    fontSize: fontsize["mediumOne+"],
  },
});
