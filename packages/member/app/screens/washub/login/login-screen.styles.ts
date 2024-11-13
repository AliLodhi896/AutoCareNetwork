import { typography } from "./../../../../../shared/theme/typography";
import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  form: {},
  btnContainer: {
    marginTop: normalize(30),
    width: normalize(260),
    flexDirection: "column",
    alignSelf: "center",
  },
  loginBtn: {
    backgroundColor: "#00BCFF",
    borderRadius: normalize(100),
    padding: 0,
    marginVertical: 0,
    height: normalize(45),
  },
  loginBtnText: {
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    letterSpacing: 0,
  },
  loginBtnContainer: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    textAlign: "center",
  },
  orText: {
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    color: "#FFFFFF",
    letterSpacing: 0,
    textAlign: "center",
    marginVertical: normalize(15),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: normalize(50),
  }
});
