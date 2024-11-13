import { screenDimensions } from './../../../../shared/theme/spacing';
import { StyleSheet } from "react-native"
import {
  color,
  fontsize,
  Radii,
  spacings,
  typography,
} from "../../../../shared/theme"
import { palette } from "../../../../shared/theme/palette"
import { normalize } from '../../../../shared/utils/normalize';
export const dashboardStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  headerIcon: {
    color: palette.white,
    fontSize: 20,
    marginLeft: 5,
  },
  headerText: {
    color: palette.black,
    fontSize: 10,
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    borderRadius: Radii.rounded,
    borderWidth: 3,
    backgroundColor: palette.white,
    borderColor: color.primary,
    padding: spacings.medium,
    marginBottom: 30,
  },
  title: {
    fontSize: fontsize['huge+'],
    alignSelf: "center",
    color: palette.black,
    marginBottom: spacings.medium
  },
  dotText: {
    color: palette.red,
    fontSize: 40,
  },
  tableHead: {
    display: "flex",
    backgroundColor: palette.lightGreyBackground,
    minHeight: 50,
    borderRightColor: palette.red,
    justifyContent: "center",
    paddingHorizontal: spacings.medium,
    alignItems: 'center',
  },
  tableText: {
    color: palette.black,
    fontFamily: typography.secondary,
  },
  dateRangeContainer: {
    backgroundColor: palette.lightGreyBackground,
    borderRadius: Radii.small,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 40,
    width: "100%",
    padding: 10,
  },
  timeLabelText: {
    fontSize: 12,
  },
  carDetailsContainer: {
    padding: 10,
    minWidth: '60%'
  },
  vehicleImage: {
    width: "90%",
    height: normalize(270),
    marginHorizontal: "5%",
    marginTop: spacings.small
  },
  tableRow: {
    paddingHorizontal: spacings.medium,
  },
  dateWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    color: '#111111',
    textAlign: 'center',
    fontFamily: typography.primary,
    fontSize: fontsize.tiny
  },
  listContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: color.primary,
    borderRadius: Radii.rounded,
    overflow: "hidden",
    flexDirection: 'row',
  },
  listItem: {
    display: 'flex',
    padding: spacings.small,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  modalContainer: {
    width: screenDimensions.width - spacings.large,
    borderWidth: 4,
    borderColor: color.primary,
    borderRadius: Radii.rounded,
    backgroundColor: color.primary,
  },
  modalCircle: {
    borderWidth: 4,
    borderColor: color.palette.white,
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 0
  },
  modalText: {
    color: color.palette.white,
    fontSize: fontsize.thin
  },
  closeIconsStyle: {
    width: normalize(25),
    height: normalize(25),
    marginBottom: spacings.tiny
  },
  modalBottomContainer: {
    paddingVertical: spacings.medium,
    backgroundColor: color.primary,
  },
  modalTopContainer: {
    borderRadius: Radii.rounded,
  },
  vehicleInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: spacings.large,
    paddingTop: spacings.medium,
    backgroundColor: color.palette.white,
  },
line: {backgroundColor: color.palette.white},
  detailWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.palette.white,
    paddingVertical: spacings.huge,
    paddingHorizontal: spacings.large,
    borderRadius: spacings.borderRadius.large,
    
  },
  detailWrapperRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacings.medium
  },
  detailWrapperRightKey: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailWrapperRightValue: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: spacings.medium,
  },
  valueText: {
    fontWeight: "400",
    marginVertical: spacings.small,
    textTransform: "capitalize",
    fontFamily: typography.primary,
    lineHeight: spacings.mediumOne
  },
  detailText: {
    textAlign: 'center',
    fontWeight: "200",
    fontFamily: typography.secondary,
    marginVertical: spacings.small,
    lineHeight: spacings.mediumOne
  },
  licensePlatedetailText: {
    fontWeight: "400",
    marginVertical: spacings.tiny
  },
  licensePlateContainer: {
    paddingHorizontal: spacings.medium,
  },
  customerVehicleDetails: {
    fontSize: fontsize.medium,
    fontWeight: "bold",
    marginVertical: spacings.small,
    textTransform: 'uppercase',
    paddingHorizontal: spacings.medium,
  },
  vehicleImageContainer: {
    backgroundColor: color.palette.white,
    borderTopLeftRadius: Radii.rounded,
    borderTopRightRadius: Radii.rounded,
  },
  refreshIconStyle: {
    width: normalize(31),
    height: normalize(28)
  },
  refreshText: {
    fontSize: fontsize.tiny,
    color: color.palette.white,
    paddingRight: spacings.small
  }

})
