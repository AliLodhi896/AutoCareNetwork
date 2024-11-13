import { spacings, fontsize, typography } from "../../../../../shared/theme";
import { StyleSheet } from "react-native";
import { normalize } from "../../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  title: {
    color: "#1B588A",
    fontSize: fontsize.large,
    fontFamily: typography.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: normalize(20),
  },
  flatListContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: normalize(8),
    borderColor: "#1B588A",
    borderWidth: 5,
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
  },
  flatList: {
    padding: normalize(25),
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
    paddingBottom: normalize(15),
    marginBottom: normalize(20),
  },
  footer: {
    height: normalize(10),
  },
  emptyList: {
    textAlign: "center",
    fontSize: fontsize["mediumOne+"],
    fontFamily: typography.primary,
  },
});
