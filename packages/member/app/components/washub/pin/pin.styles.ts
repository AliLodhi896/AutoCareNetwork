import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

const SELF_VAL_SIZE = 18;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  pinContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 4,
  },
  selfValContainer: {
    width: 18,
    height: 18,
  },
  pin: {
    width: normalize(30),
    height: normalize(42),
  },
  selfValImage: {
    width: SELF_VAL_SIZE,
    height: SELF_VAL_SIZE,
  },
});
