import { Dimensions, StyleSheet } from 'react-native';
import Theme from './theme';

export const styles = StyleSheet.create({
    darkBackground: { 
        width: Dimensions.get('screen').width, 
        height: Dimensions.get('screen').height, 
        position: 'absolute', 
        backgroundColor: 'black' ,
    },
    logo : {
        width: '100%',
        height: '30%',
        marginTop: 75
    },
    logoContainer : {
        width: Dimensions.get('screen').width,
        height: 150
    },
    goBackButton : {
        alignItems: 'center',
        padding: 13,
        flexDirection: 'row',
    },
    goBackText : {
        color: 'grey',
        fontFamily: 'Montserrat-Medium'
    },
    container: {
      flex: 1
    }
});