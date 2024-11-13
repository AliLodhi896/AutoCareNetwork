import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";
import { typography } from "../../../../../shared/theme";
import { isAndroidFontLargest } from "../../../utils/common";

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
  contactBox: {
    backgroundColor: "#1B588A",
    borderRadius: normalize(8),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(27),
  },
  contactText: {
    color: "#fff",
    fontSize: normalize(16),
  },

  deleteActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: normalize(35),
    marginBottom: normalize(20),
  },
  deleteCancel: {
    backgroundColor: "#BDE8F9",
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(80),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteCancelText: {
    fontSize: normalize(isAndroidFontLargest() ? 11 : 13),
    fontFamily: typography.bold,
    color: "#1B588A",
    textTransform: "uppercase",
  },
  deleteConfirm: {
    backgroundColor: "#00BCFF",
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(80),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteConfirmText: {
    fontSize: normalize(isAndroidFontLargest() ? 11 : 13),
    fontFamily: typography.bold,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
