import {
  color,
  fontsize,
  screenDimensions,
  spacings,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.7 * screenDimensions.height,
    marginVertical: spacings.medium
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    paddingHorizontal: spacings.large,
    paddingTop: spacings.huge,
    paddingBottom: spacings.large,
    width: 0.9 * screenDimensions.width,
  },

  advanceEntitlementsButton: {
    alignSelf: "center",
  },
  advanceEntitlementsButtonText: {
    fontSize: 20,
    color: color.palette.white,
  },
  feedbackSpacer: {
    height: spacings.medium,
  },
  text: {
    color: color.palette.white,
    marginBottom: spacings.small,
    fontSize: fontsize.medium,
  },
  submitBtn: { marginTop: spacings.large },
  submitText: { fontSize: fontsize["medium+"] },
  feedBackInput: { marginTop: spacings.large },
});
