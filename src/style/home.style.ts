import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  darkBackground: { 
    width: Dimensions.get('screen').width, 
    height: Dimensions.get('screen').height, 
    position: 'absolute', 
    backgroundColor: 'black' ,
  },
});