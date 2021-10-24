import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderWidth:4,
    borderColor: COLORS.BLACK_SECONDARY,
    width: 48,
    height: 48,
    // borderWidth: 4,
    // borderColor: COLORS.BLACK_SECONDARY,
  },
});