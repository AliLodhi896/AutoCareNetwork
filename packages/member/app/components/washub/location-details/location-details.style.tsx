import { fontsize } from "../../../../../shared/theme/spacing";
import { StyleSheet } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: normalize(12),
  },
  title: {
    color: "#1D1D1D",
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: normalize(4),
    
  },
  bold: {
    fontWeight: "bold",
  },
  smallText: {
    color: "#1D1D1D",
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    textAlign: "center",
  },
  text: {
    color: "#1D1D1D",
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    textAlign: "center",
  },
  premiumOnlyWarning: {
    color: "#ff0000",
    fontSize: fontsize.medium,
    fontFamily: typography.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  actions: {
    marginBottom: normalize(75),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: normalize(30),
  },
  favoriteContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginHorizontal:10,
  }
});
