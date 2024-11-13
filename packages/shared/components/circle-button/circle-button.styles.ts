import { StyleSheet } from 'react-native';
import { color, fontsize, spacings } from '../../theme';


export const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.palette.red,
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: spacings.small,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text: {
    color: color.palette.black,
    fontSize: fontsize.medium,
    fontWeight: "400",
  },
  innerText: {
    color: color.palette.black,
    fontSize: fontsize.small,
    fontWeight: "400",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
})