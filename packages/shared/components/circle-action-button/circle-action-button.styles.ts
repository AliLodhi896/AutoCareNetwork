import { StyleSheet } from "react-native";
import { spacings } from "../../theme";

export const styles = StyleSheet.create({
  frame: { alignItems: "center" },
  container: {
    alignItems: "center",
    justifyContent: 'center',
    padding: spacings["medium+"],
    paddingHorizontal: spacings["medium+"] + 3,
  },
  icon: {},
  text: {
    paddingTop: spacings.tiny,
  },
});
