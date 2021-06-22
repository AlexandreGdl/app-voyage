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
    titles : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        paddingBottom: 10
    },
    voyageView : {
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL
    },
    buttonPlus: {
        alignItems: 'flex-start',
        paddingBottom: 50,
        shadowColor: "#000", 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card : {
        shadowColor: "#000", 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    goBackButton : {
        alignItems: 'center',
        padding: 13,
        flexDirection: 'row',
    },
    goBackText : {
        color: 'grey',
        fontFamily: 'Montserrat-Medium'
    }
});