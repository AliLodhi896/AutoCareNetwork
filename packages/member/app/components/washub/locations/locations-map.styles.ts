import { Platform, StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  legendContainer: {
    position: "absolute",
    height: normalize(70),
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    zIndex1: 99999,
    paddingHorizontal: normalize(20),
  },
  legendItem: {
    marginTop: normalize(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  legendText: {
    fontSize: normalize(12),
    color: "#3E3E3E",
    fontWeight: "700",
    // paddingHorizontal: 5,
  },
});
