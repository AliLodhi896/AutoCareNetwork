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
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    // flexDirection: "column",
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
    fontSize:16
  },
  modalContainer: {
    backgroundColor: color.palette.white,
    width: screenDimensions.width - spacings.large,
    marginHorizontal: 0.5 * spacings.small,
    paddingHorizontal: spacings.huge,
    paddingTop: spacings.large,
    paddingBottom: spacings.large,
    borderRadius: spacings.borderRadius.smaller,
    alignItems: "center",
    height:'auto'
  },
  modalTitle: {
    fontSize: fontsize.mediumOne,
    fontWeight: "700",
    fontFamily: typography.primary,
    color: color.palette.black,
    marginBottom: spacings.small,
  },
  modalContentContainer: {
    fontSize: fontsize.small,
    fontWeight: "400",
    fontFamily: typography.primary,
    textAlign: "center",
    color: color.palette.black,
    width: "100%",
    height:'80%'
  },
  modalButton: {
    backgroundColor: color.palette.lightBlue,
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
});
