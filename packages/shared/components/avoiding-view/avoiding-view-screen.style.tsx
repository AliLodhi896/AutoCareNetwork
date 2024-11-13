import { screenDimensions} from "../../theme";
import { StyleSheet } from "react-native";
import { screenStyles } from "../screen/screen.styles";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainView:{
    height: screenDimensions.height,
    width: screenDimensions.width,
    justifyContent: 'center', 

  },
  container: screenStyles.container,
});
