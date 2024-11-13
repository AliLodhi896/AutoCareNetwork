import { fontsize } from './../../theme/spacing';
import { StyleSheet } from "react-native";
import { color, spacings } from "../../theme";

export const styles = StyleSheet.create({
  backBtnView: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    fontSize: fontsize.tiny,
    paddingLeft: spacings.tiny
  }
});
