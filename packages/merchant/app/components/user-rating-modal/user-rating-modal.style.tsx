import {
  color,
  fontsize,
  screenDimensions,
  spacings,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 0.5 * screenDimensions.height,
    backgroundColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    width: 0.9 * screenDimensions.width,
    marginVertical: spacings.medium
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  scrollContainer: {
    paddingHorizontal: spacings.large,
    paddingTop: spacings.huge,
    paddingBottom: spacings.large,
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
