import { color, spacings } from './../../theme'
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    marginTop: spacings.medium,
    paddingHorizontal: spacings.medium,
  },
  profileText: {
    color: color.palette.black,
    fontStyle: "italic",
  },
  profileDetails: {
    flex: 1,
  },
  editIconContainer: {
    justifyContent: "center",
  },
});
