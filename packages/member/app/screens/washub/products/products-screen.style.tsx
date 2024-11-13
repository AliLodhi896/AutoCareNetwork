import { spacings, fontsize, typography } from "../../../../../shared/theme";
import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: normalize(170),
  },
  title: {
    color: "#1B588A",
    fontSize: normalize(30),
    fontFamily: typography.primary,
    fontWeight: "bold",
    marginTop: spacings["medium+"],
    marginBottom: spacings["mediumOne+"],
  },
  separator: {
    height: normalize(45),
  },
  emtpyList: {
    marginTop: normalize(40),
    marginHorizontal: normalize(42),
    textAlign: "center",
    fontSize: fontsize.medium,
    fontFamily: typography.primary,
  },
  loginBtn: {
    backgroundColor: "#00BCFF",
    borderRadius: normalize(100),
    padding: 0,
    marginVertical: 0,
    height: normalize(45),
    marginBottom:20
  },
  loginBtnText: {
    fontFamily: typography.bold,
    fontSize: normalize(14),
    lineHeight: normalize(18),
    letterSpacing: 0,
  },
});
