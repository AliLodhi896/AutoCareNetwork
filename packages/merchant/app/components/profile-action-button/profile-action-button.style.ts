import { screenDimensions, spacings } from './../../../../shared/theme/spacing';
import { StyleSheet } from "react-native";
import { color } from '../../../../shared/theme';
import { shadower } from '../../../../shared/utils/common';

export const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: color.palette.white,
    },
    textContainerStyle:{marginRight: spacings.huge},
    container: {flex:1},
    imageInner: {
        borderRadius: spacings.large,
        borderWidth: spacings.thin,
        borderColor: color.palette.lightBlackBackground,
        justifyContent: "center",
        alignItems: "center"
      },
      imageOuter: {
        borderRadius: spacings.large,
        marginLeft: 0.75 * spacings.large,
        marginRight:  spacings.medium,
        borderWidth: spacings.thin,
        borderColor: color.palette.red,
        justifyContent: "center",
        alignItems: "center"
      },
      actionContainer: {
        position: "absolute",
        left: -spacings.medium,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: spacings.medium,
        paddingHorizontal: spacings.medium,
        borderRadius: spacings.medium,
        backgroundColor: color.palette.lightBlackBackground,
        ...shadower(0.2)
      },
      actionButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: spacings.medium,
      },
      actionText: {
        fontSize: spacings.medium,
        color: color.palette.white,
        fontWeight: "600",
        marginLeft: spacings.medium,
        alignSelf: "center",
      },
      circle: {
        width: spacings.large,
        height: spacings.large,
        borderRadius: spacings.large / 2,
        backgroundColor: color.palette.red,
        marginBottom: 0
      },
      circleView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }
  });