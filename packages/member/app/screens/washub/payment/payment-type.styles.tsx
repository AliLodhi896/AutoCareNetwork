import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { fontsize, typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40
  },
  rowInfo: {
    marginBottom: normalize(20),
  },
  title: {
    fontSize: normalize(16),
    color: "#666666",
    textAlign: "center",
    fontWeight:'bold',
    fontFamily: typography.third,
  },
  text: {
    fontFamily: typography.third,
    fontSize: normalize(24),
    textAlign: "center",
    color: "#1B588A",
    lineHeight: normalize(25),
    marginTop:10,
    fontWeight:'bold'
  },
  helperTextContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:20
  },
  helperText:{
    fontSize: normalize(16),
    color: "#666666",
    textAlign: "center",
    fontWeight:'bold',
    fontFamily: typography.third,
    marginHorizontal:8
  }
});
