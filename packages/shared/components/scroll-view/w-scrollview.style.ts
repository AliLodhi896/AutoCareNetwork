import { StyleSheet } from "react-native"
import { color } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 10,
  },
  stickyButton: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: color.palette.white,
  },
  loadingContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    zIndex: 99,
    backgroundColor: color.transparentWhite,
  },
})