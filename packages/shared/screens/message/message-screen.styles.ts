import { screenDimensions } from '../../theme/spacing';
import { StyleSheet } from "react-native";
import { WASHUB_MEMBER_COLOR } from '../../services/api';

const CONTAINER_HEIGHT = 400;

export const styles = StyleSheet.create({
  loader: {
    margin: 30,
  },
  webContainer: {
    flex: 0,
    height: CONTAINER_HEIGHT,
    width: '100%',
  },
  scrollTray: {
    width: 6,
    position: 'absolute',
    height: CONTAINER_HEIGHT,
    backgroundColor: '#c8c8c8',
    right: 0,
  },
  scrollIndicator: {
    backgroundColor: WASHUB_MEMBER_COLOR,
  },
  messageWrapper: {
    overflow: 'hidden',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
    height: screenDimensions.height,
    width: screenDimensions.width
  },
});
