import {
    color,
    spacings,
    screenDimensions,
    fontsize,
    typography,
  } from "../../../../../shared/theme";
  import { StyleSheet } from "react-native";
  
  export const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      flex:1
    },
    button: {
      backgroundColor: color.palette.white,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: spacings.small,
      padding: spacings.small,
      borderRadius: 10,
      shadowColor: "#333",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 2,
      shadowOpacity: 0.2,
    },
    buttonText: {
      alignSelf: "center",
      color: "#ffffff",
      fontFamily: typography.primary,
    },
    modalContainer: {
      backgroundColor: color.palette.white,
      width: screenDimensions.width - spacings.large,
      marginHorizontal: 0.5 * spacings.small,
      paddingHorizontal: spacings.huge,
      paddingTop: spacings.medium,
      paddingBottom: spacings.medium,
      borderRadius: spacings.borderRadius.smaller,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: fontsize.medium,
      fontWeight: "500",
      fontFamily: typography.primary,
      color: color.palette.black,
      marginBottom: spacings.small,
      marginTop:20,
      textAlign:'center'
    },
    modalContentContainer: {
      fontSize: fontsize.small,
      fontWeight: "400",
      fontFamily: typography.primary,
      textAlign: "center",
      color: color.palette.black,
      width: "100%",
      alignItems:'center',
      flex:1,
      justifyContent:'center'
    },
    modalButton: {
      backgroundColor: color.palette.lightBlue,
      alignItems: "center",
      justifyContent: "center",
      padding: spacings.small,
      marginTop:20,
      borderRadius: 10,
      shadowColor: "#333",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 2,
      shadowOpacity: 0.2,
    },
  });
  