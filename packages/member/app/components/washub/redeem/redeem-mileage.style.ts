import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#1B588A",
    paddingHorizontal: normalize(23),
    paddingTop: normalize(24),
    paddingBottom: normalize(60),
  },
  premiumContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#FB3C33",
    padding: normalize(10),
    marginHorizontal:20,

    marginTop:normalize(15),
    paddingVertical:normalize(10),
  },
  deluxContainer:{
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#00BCFF",
    padding: normalize(10),
    marginHorizontal:20,
    marginTop:normalize(15),
    paddingVertical:normalize(15),

  },
  title: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: fontsize.mediumOne,
    textAlign: "center",
  },

  selecttitle: {
    color: "#FFFFFF",
    fontSize: normalize(isAndroidFontLargest() ? 12 : 14),
    textAlign: "center",
  },

  bold:{
    fontWeight:'bold',
    fontSize: fontsize.mediumOne,
  },
  text: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    textAlign: "center",
    marginVertical: normalize(23),
  },
  titlepremium:{
    color: "#FFFFFF",
    fontFamily: typography.bold,

    textAlign: "center",
  },
  textpremium: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    textAlign: "center",
  },
  chargepremium: {
    color: "#FFFFFF",
    fontFamily: typography.bold,

    fontSize: fontsize.small,
    textAlign: "center",
  },
  titledelux:{
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: 24,
    textAlign: "center",
  },
  chargedelux:{
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: fontsize.tiny,
    textAlign: "center",
    marginTop:2
  },


ultimateContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#fff",
    padding: normalize(10),
    marginHorizontal:20,
    marginTop:normalize(15),
    paddingVertical:normalize(10),
    borderWidth:1,
    borderColor:'#00BCFF',
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
    titleultimate:{
    color: "#000",
    fontFamily: typography.bold,
    fontSize: normalize(isAndroidFontLargest() ? 16 : 22),
    textAlign: "center",
  },
  textultimate: {
    color: "#000",
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    textAlign: "center",
  },
  chargeultimate: {
    color: "#000",
    fontFamily: typography.bold,
    fontSize: fontsize.tiny,
    textAlign: "center",
  },




washontainer:{
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    backgroundColor: "#00BCFF",
    padding: normalize(10),
    marginHorizontal:20,
    marginTop:normalize(15),
    paddingVertical:normalize(10),
  },
  titlewash:{
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: 24,
    textAlign: "center",
  },
  textwash: {
    color: "#FFFFFF",
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    textAlign: "center",
  },
  chargewash: {
    color: "#FFFFFF",
    fontFamily: typography.bold,
    fontSize: fontsize.small,
    textAlign: "center",
  },






  error: {
    color: "red",
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    marginLeft: normalize(24),
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: normalize(2),
    fontFamily: typography.primary,
    fontSize: fontsize["mediumOne+"],
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(16),
    marginHorizontal: normalize(24),
  },
  redeemButton: {
    alignSelf: "center",
    width: normalize(isAndroidFontLargest() ? 72 : 68),
    height: normalize(isAndroidFontLargest() ? 72 : 68),
    position: "absolute",
    bottom: normalize(-30),
  },
  redeemButtonText: {
    fontSize: normalize(isAndroidFontLargest() ? 11 : 13),
  },


  notfoundText:{
    color: "#000",
    fontFamily: typography.primary,
    fontSize: 18,
    textAlign: "center",
    marginTop:"50%"
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:"50%"
  },
});
