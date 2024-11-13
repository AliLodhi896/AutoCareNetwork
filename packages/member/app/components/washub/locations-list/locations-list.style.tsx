import {
  fontsize,
  screenDimensions,
} from "../../../../../shared/theme/spacing";
import { StyleSheet, Platform } from "react-native";
import { typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    flex: 1,
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    paddingHorizontal: normalize(22),
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemData: {
    flexShrink: 1,
  },
  itemText: {
    fontFamily: typography.primary,
    fontSize: normalize(15),
    lineHeight: normalize(22),
  },
  actionButtonText: {
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    lineHeight: normalize(22),
    color: "#00BCFF",
    marginBottom: normalize(10),
  },
  actionButton: {
    alignSelf: "center",
    width: normalize(67),
    height: normalize(66),
    fontSize:6
  },

  title: {
    color: "#1D1D1D",
    fontSize: normalize(isAndroidFontLargest() ? 18 : 20),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: normalize(18),
  },
  separator: {
    height: normalize(25),
  },
  footer: {
    height: normalize(25),
  },
  emtpyList: {
    marginTop: '30%',
    marginHorizontal: normalize(42),
    textAlign: "center",
    fontSize: normalize(isAndroidFontLargest() ? 16 : 18),
    fontFamily: typography.primary,
  },
});
