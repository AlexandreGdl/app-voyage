import { Dimensions, StyleSheet } from 'react-native';
import Theme from './theme';

export const styles = StyleSheet.create({
  darkBackground: { 
    width: Dimensions.get('screen').width, 
    height: Dimensions.get('screen').height, 
    position: 'absolute', 
    backgroundColor: 'black' ,
  },
  cardContainer : {
    paddingLeft: 24
  },
  imgBg : {
      width: Dimensions.get('screen').width,
      height: 220,
      shadowColor: "#000", 
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },

  imgBorderRadius : {
      borderBottomLeftRadius: 65
  },

  logo : {
      width: '100%',
      height: '30%',
      marginTop: 75
  },

  subTitle : {
      color: 'white',
      fontFamily: 'Montserrat-Bold',
      textAlign: 'center'
  },

  textVoyage : {
      fontFamily: 'Montserrat-Bold',
      paddingTop: 40,
      paddingBottom: 10,
      paddingLeft: Theme.PAGE_PADDING_HORIZONTAL
  },
  subtitle :{
    paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL
  }
});