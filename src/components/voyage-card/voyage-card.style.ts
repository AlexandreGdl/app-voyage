import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card:  {
      width: 200,
      height: 200,
      borderRadius: 20,
      shadowColor: "#000", 
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    
    image : {
      borderRadius: 20,
      position: 'relative'
    },
  
    gradient : {
      width: '100%',
      height: '100%',
      position: 'absolute', 
      borderRadius: 20
    },
  
    date : {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopRightRadius: 19,
      borderBottomLeftRadius: 19,
      paddingVertical: 10,
      paddingHorizontal: 10,
      alignItems: 'center'
    },
  
    dateText : {
      fontFamily: 'Montserrat',
      fontSize: 11
    },
  
    text : {
      position: 'absolute',
      bottom: 0,
      width: '100%'
    },
  
    titleVoyage : {
      paddingHorizontal: 15,
      paddingBottom: 5,
      fontFamily: 'Montserrat-Bold',
      color: 'white'
    },
  
    filters : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingBottom: 10
    },
  
    travellerFilter : {
      color: 'white',
      fontFamily: 'Montserrat',
    },
  
    dayFilter : {
      color: 'white',
      fontFamily: 'Montserrat',
    }
  });