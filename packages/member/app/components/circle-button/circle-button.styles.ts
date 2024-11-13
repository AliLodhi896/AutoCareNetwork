import { fontsize } from '../../../../shared/theme/spacing';
import { StyleSheet } from 'react-native';
import { color, spacings } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.palette.red,
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: spacings.small
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
});
