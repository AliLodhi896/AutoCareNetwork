import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    paddingBottom: 20,
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export const screenStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "transparent"
  }
})

export const centerContent = ({
  height, insets
}: { height?: number, insets: { top: number, bottom: number } }) => {
  return {  
    paddingTop: Platform.OS === "android" ? (height || 80) + insets.top : (height || 50) + insets.top,
    paddingBottom: Platform.OS === "android" ? 100 : (70 + insets.bottom)
  }
}