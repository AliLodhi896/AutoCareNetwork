import { Platform, StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacings } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginHorizontal: spacings.small,
    marginTop: spacings.massive + 20,
    borderWidth: spacings.tiny - 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    backgroundColor: color.palette.white,
    paddingVertical: spacings.medium,
    paddingHorizontal: spacings.medium,
    height:screenDimensions.height  - normalize(310),
  },
  container: {
    borderWidth: spacings.tiny - 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    backgroundColor: color.palette.white
  },
  font15: {
    fontSize: fontsize.medium,
  },
  flex: {
    flex: 1,
  },
  logo: {
    marginLeft: 0.18 * screenDimensions.width,
  },
  header: {
    height: normalize(0.16*screenDimensions.height),
  },
  logoView: {
    width: "100%",
  },
  flexColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  acceptButton: {
    alignSelf: 'center',
    marginTop: spacings.large,
    paddingHorizontal: spacings.large,
    fontSize: normalize(18),
  },
  acceptButtonText: {
    fontSize: normalize(18),
  },
  boldItalic: {
    fontWeight: 'bold',
    color: color.palette.white,
    fontStyle: 'italic',
  },
  selfValAccentYellow: {
    color: color.palette.white,
  },
  selfValAccentRedeem: {
    color: color.palette.white,
    fontWeight: 'bold',
  },
  selfValText: {
    fontStyle: 'italic',
    color: color.palette.black,
    marginRight: 8,
  },
  selfValModal: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: spacings.large,
    borderRadius: spacings.borderRadius.large,
    backgroundColor: color.palette.red,
  },
  okBtn: {
    marginTop: spacings.large,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: spacings.icons.huge,
    width: spacings.icons.huge,
    borderRadius: spacings.icons.huge / 2,
    borderWidth: spacings.thin,
    borderColor: color.palette.white,
    justifyContent: "center",
    alignItems: "center",
  },
  okBtnText: {
    fontSize: fontsize.large,
    color: color.palette.white,
    fontWeight: "bold"

  },
  selfValTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: spacings.small,
    fontSize: normalize(18),
    color: color.palette.white
  },
  selfValBody: {
    marginLeft: spacings.mediumOne,
    marginRight: spacings.mediumOne,
    textAlign: 'center',
    color: color.palette.white
  },
  selfValImage: {
    height: spacings.icons.medium,
    width: spacings.icons.medium,
  },
  selfValContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacings.small
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  content: {
    paddingBottom: 10,
  },
  description: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  actions: {
    width: "100%",
    flexDirection: 'row',
    marginTop: spacings.massive,
    paddingHorizontal: spacings.large,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: fontsize["medium+"],
    color: color.palette.black,
    marginTop: spacings.small
  },
  subtitle: {
    fontSize: fontsize.mediumOne,
    color: color.palette.black,
    marginTop: spacings.small
  },
  distance: {
    fontSize: fontsize.medium,
    color: color.palette.black,
    fontWeight: 'bold',
    marginTop: spacings.small
  },
  row: {
    padding: 8,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: fontsize.tiny,
    color: color.palette.red,
    paddingTop: spacings.tiny,
    textTransform: "uppercase",
    fontWeight: "bold"
  },
});
