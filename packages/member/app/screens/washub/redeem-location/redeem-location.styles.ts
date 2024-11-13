import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { fontsize, typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#1B588A",
    paddingHorizontal: normalize(23),
    paddingTop: normalize(24),
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  codeWrapper: {
    height: normalize(150),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: normalize(isAndroidFontLargest() ? 15 : 20),
    textAlign: "center",
    marginTop: normalize(isAndroidFontLargest() ? 13 : 20),
  },
  text: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    textAlign: "center",
  },
  text2: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: normalize(22),
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  textCode: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.large,
    textAlign: "center",
  },
  textCar: {
    textTransform: "uppercase",
    marginTop: normalize(25),
  },

  licensePlate: {
    backgroundColor: "#FFFFFF",
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    alignSelf: "center",
    display: "flex",
    marginTop: normalize(15),
    marginBottom:10
  },
  stationInfo: {
    //flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(25),
    padding:10,
    width:'100%'
  },
  stationName: {
    color: "#1D1D1D",
    fontWeight: "700",
    fontSize: normalize(isAndroidFontLargest() ? 18 : 22),
    textAlign: "center",
  },
  stationAddr: {
    color: "#1D1D1D",
    fontFamily: typography.primary,
    fontSize: normalize(14),
    textAlign: "center",
  },
  entitledText: {
    color: "#1D1D1D",
    fontFamily: typography.primary,
    fontSize: normalize(18),
    textAlign: "center",
  },
  serviceName: {
    color: "red",
    fontFamily: typography.primary,
    fontSize: normalize(18),
    textAlign: "center",
  },
  licensePlateText: {
    color: "#1D1D1D",
    fontFamily: typography.fourth,
    fontSize: fontsize.tiny,
    textAlign: "center",
    textTransform: "uppercase",
  },
  licensePlateNumber: {
    color: "#1D1D1D",
    fontFamily: typography.fourth,
    fontSize: normalize(isAndroidFontLargest() ? 20 : 30),
    textAlign: "center",
    marginTop: normalize(3),
  },
  actionLinkXS: {
    fontSize: fontsize["tiny-"],
    marginRight: normalize(3),
  },
  actionLink: {
    color: "#fff",
    fontFamily: typography.bold,
    textTransform: "uppercase",
    fontSize: fontsize.tiny,
    textAlign: "center",
  },
  linksWrapper: {
    marginTop: normalize(isAndroidFontLargest() ? 20 : 40),
    display: "flex",
    alignSelf: "center",
  },
  links: {
    alignItems: "center",
    justifyContent: 'center',
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#00BCFF',
    height: 70,
    width: 70,
    position: 'absolute',
    bottom: 0,
    alignSelf: "center",
  },
});
