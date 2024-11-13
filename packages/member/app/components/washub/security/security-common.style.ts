import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { typography } from "../../../../../shared/theme";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#ffffff",
    borderRadius: normalize(8),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(27),
    borderColor: "#00BCFF",
    borderWidth: 2,
    //maxHeight: normalize(400),
    maxHeight: "90%",
  },
});
