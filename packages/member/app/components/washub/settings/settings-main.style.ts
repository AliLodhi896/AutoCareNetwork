import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { spacings, typography } from "../../../../../shared/theme";

export const styles = StyleSheet.create({
  title: {
    fontSize: normalize(32),
    fontWeight: "bold",
    color: "#1B588A",
    textAlign: "center",
    marginBottom: normalize(20),
  },
  box: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(33),
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: normalize(18),
    borderBottomColor: "#BCC4C8",
    borderBottomWidth: 1,
  },
  itemTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: normalize(20),
    fontFamily: typography.bold,
    textTransform: "uppercase",
  },
  textXS: {
    fontSize: normalize(14),
    fontFamily: typography.bold,
    marginLeft: normalize(10),
  },
  actionButton: {
    marginTop: normalize(35),
    paddingTop: normalize(5),
    width: normalize(67),
    height: normalize(67),
    alignSelf: "center",
  },
  actionButtonText: {
    fontSize: normalize(16),
    lineHeight: normalize(18),
  },
});
