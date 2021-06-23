import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  }
});