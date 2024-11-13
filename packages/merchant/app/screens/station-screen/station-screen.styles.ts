import { StyleSheet } from "react-native";
import { spacings } from "../../../../shared/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    result: {
      padding: 12,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomColor: '#ddd',
      borderBottomWidth: 0.5,
      backgroundColor: 'white',
    },
    stationText: {
      fontSize: 15,
    },
    list: { flex: 1, width: "100%", paddingVertical: spacings.medium }
  });

export default styles;