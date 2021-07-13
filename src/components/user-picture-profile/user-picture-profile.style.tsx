import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    textPictureProfile : {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    pictureProfile : {
        backgroundColor: '#dedede',
        width: 75,
        height: 75,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000", 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    linearBorder : {
        height: 80, 
        width: 80, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius:82 / 2,
    },
  });