import { Platform, StyleSheet } from "react-native";
import { color, fontsize, screenDimensions, spacings } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

const isIos = Platform.OS == "ios"

export const styles = StyleSheet.create({
  container: { flex: 1 },
  redeemCircle: {
    height: 1.8 * spacings.massive,
    width: 1.8 * spacings.massive,
    borderRadius: spacings.massive,
  },
  listCircle: {position: "absolute", bottom: -spacings.massive,left: 0, right:0},
  redeemText: {
    color: color.palette.white,
    fontSize: fontsize.tiny,
  },
  listHeader: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase',
    fontSize: 20,
    marginVertical: spacings.small
  },
  link: {
    fontSize: 12,
    color: Platform.OS === "ios" ? "#0000EE" : "#222222",
    textDecorationLine: Platform.OS === "ios" ? "underline" : "none",
  },
  redeemContainer: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    left: 0,
    backgroundColor: "transparent",
    width: screenDimensions.width,
  },
  centerButton: {
    position: "absolute",
    right: 10,
    width: 36,
    height: 36,
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 2,
    elevation: 8,
    alignItems: "center",
    borderRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    zIndex: 10,
  },
  searchButtonContainer: {
    flex: 1,
    left: 0,
    width: screenDimensions.width,
    position: "absolute",
    alignItems: "center",
  },
  searchButton: {
    flex: 1,
    backgroundColor: "white",
    elevation: 8,
    alignItems: "center",
    width: 160,
    borderRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  searchText: {
    fontWeight: "600",
    color: "#36B2F5",
    textAlign: "center",
    alignSelf: "center",
  },
  result: {
    padding: spacings.small,
    paddingVertical: spacings["medium+"],
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
  },
  distance: {
    fontWeight: "600",
    color: color.palette.red
  },
  list: {
    backgroundColor: "white",
    paddingBottom: spacings.large,
    borderRadius: spacings.borderRadius.smaller,
    paddingHorizontal: spacings.smaller
  },

  contentContainerStyle: { paddingBottom: spacings.huge },
  locationList:
    isIos ? {
      height: screenDimensions.height,
      width: screenDimensions.width,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 0.05 * screenDimensions.height
    } : {
      height: screenDimensions.height,
      width: screenDimensions.width,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 0.05 * screenDimensions.height
    }
  ,
  redeemListContainer: {
    marginHorizontal: spacings.small,
    borderWidth: spacings.tiny - 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    height: screenDimensions.height - normalize(330),
    width: 0.9 * screenDimensions.width,
  },
  premiumTextView: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacings.small
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spaceItem: {
    marginTop: spacings.tiny,
    lineHeight: spacings.small + 10
  },
  spaceItemSmall: {
    marginTop: spacings.tiny
  },
  listItemLeft: { flex: 1, flexDirection: "column", justifyContent: "space-between", marginRight: 10 },
  listItemRight: {heigh: '100%',flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" , alignSelf: 'flex-start'},
  itemTextBold: { fontSize: fontsize.small, fontWeight: "bold", textTransform: 'uppercase' },
  loader: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  }
});