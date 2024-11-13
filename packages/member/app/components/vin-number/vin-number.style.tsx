import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      maxWidth: '100%',
    },
    invisibleText: {
      zIndex: 10,
      backgroundColor: 'transparent',
      position: 'absolute',
      opacity: 0.0101,
      width: '100%',
      height: '100%',
    },
  });
  