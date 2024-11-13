import {StyleSheet} from "react-native";

const verticalMargin = 8;
const paddingVertical = 12;

export const EverwashSDKStyles = StyleSheet.create({
  activityIndicatorColor:  "#FB3C33",
  buttonStyle: {
    alignItems: "center",
    backgroundColor: '#FB3C33',
    borderRadius: 12,
    height: 70,
    justifyContent: "center",
    marginVertical: verticalMargin,
    paddingVertical: paddingVertical,
    width: "80%"
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontWeight: '500',
    fontSize: 21,
  },
  textStyle: {
    color: "#1D1D1D",
    textAlign: "center",
    fontSize: 24
  },
});