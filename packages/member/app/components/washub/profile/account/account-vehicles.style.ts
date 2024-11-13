import { StyleSheet } from "react-native";
import {
  color,
  fontsize,
  spacings,
  typography,
} from "../../../../../../shared/theme";
import { normalize } from "../../../../../../shared/utils/normalize";
import { isAndroidFontLargest } from "../../../../utils/common";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: normalize(20),
  },
  actionButton: {
    alignSelf: "center",
    width: normalize(66),
    height: normalize(66),
    marginTop: normalize(20),
  },
  box: {
    borderRadius: spacings.smaller,
    borderColor: "#1B588A",
    borderWidth: 5,
    marginTop: spacings["small+"],
    padding: spacings["small+"],
    flex: 1,
  },
  vechicleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: normalize(90),
  },
  vechileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontFamily: typography.primary,
    fontSize: fontsize["mediumOne+"],
    lineHeight: fontsize.mediumOne,
  },
  vinText: {
    fontFamily: typography.primary,
    fontSize: fontsize.small,
    lineHeight: fontsize.mediumOne,
  },
  vinLinkAction: {
    color: color.palette.lightBlue,
  },
  vehicleActions: {
    flexDirection: "row",
    marginTop: normalize(10),
  },
  vehicleActionsPrimary: {
    justifyContent: "space-between",
  },
  itemError: {
    color: "#FF0000",
  },
  primary: {
    display: "flex",
    flexDirection: "row",
  },
  textPrimary: {
    marginLeft: spacings.smaller,
    fontSize: fontsize.medium,
    fontFamily: typography.primary,
  },
  primaryIcon: {
    width: normalize(24),
    height: normalize(24),
  },
  linkAction: {
    color: color.palette.lightBlue,
    fontSize: normalize(isAndroidFontLargest() ? 15 : 18),
  },
  linkActionNonPrimary: {
    marginLeft: normalize(24),
  },
});
