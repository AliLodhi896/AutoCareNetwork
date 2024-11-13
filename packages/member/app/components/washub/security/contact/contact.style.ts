import { StyleSheet } from "react-native";
import { normalize } from "../../../../../../shared/utils/normalize";
import { typography } from "../../../../../../shared/theme";

export const styles = StyleSheet.create({
  contactTitle: {
    color: "#fff",
    fontSize: normalize(20),
    textAlign: "center",
    fontFamily: typography.bold,
    textTransform: "uppercase",
    marginTop: normalize(45),
  },
  contactTouchable: {
    height: normalize(80),
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactIcons: {
    marginTop: normalize(55),
    marginBottom: normalize(80),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contactContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#1B588A",
    fontSize: normalize(20),
    textAlign: "center",
    fontFamily: typography.bold,
    textTransform: "uppercase",
    marginTop: normalize(45),
  },
  text: {
    color: "#1B588A",
    fontSize: normalize(16),
  },
});
