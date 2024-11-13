import {
  color,
  fontsize,
  screenDimensions,
  spacings,
  typography,
} from "../../../../shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.red,
    width: "100%",
    marginHorizontal: 0.5 * spacings.small,
    paddingHorizontal: spacings.large,
    paddingTop: spacings.medium,
    paddingBottom: spacings.large,
    borderRadius: spacings.borderRadius.large,
    alignItems: "center",
    maxHeight: 0.6 * screenDimensions.height,
  },

  contentText: {
    fontSize: fontsize.small,
    fontWeight: "400",
    fontFamily: typography.primary,
    textAlign: "center",
    color: color.palette.white,
  },
  contentView: {
    marginVertical: spacings.large,
  },
  formView: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  iconText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingTop: spacings.tiny,
  },
  modalHeadView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoView: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: spacings.large,
    marginTop: spacings.small,
  },
  form: {
    flex: 1,
    paddingVertical: spacings.smaller,
    marginBottom: spacings.large,
  },
  submit: {
    marginHorizontal: spacings.large,
    marginTop: spacings.large,
  },
  submitText: {
    fontSize: fontsize.mediumOne,
    fontWeight: "500",
  },
});
