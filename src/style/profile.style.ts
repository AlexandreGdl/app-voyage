import { Dimensions, StyleSheet } from 'react-native';
import Theme from './theme';

export const styles = StyleSheet.create({
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
        borderBottomLeftRadius: 65,
        backgroundColor: '#43BED8',
        justifyContent: 'center',
        alignItems: 'center'
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
    goBackButton : {
        alignItems: 'center',
        padding: 13,
        flexDirection: 'row',
    },
    goBackText : {
        color: 'grey',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16
    },
    travellersElement : {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30
    },
    username : {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        paddingVertical: 10
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginTop: 40
    },
    textVoyage : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginTop: 40,
        marginBottom: 15,
        paddingLeft: Theme.PAGE_PADDING_HORIZONTAL
    },
    subtitle :{
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL
    },
    cardContainer : {
        paddingLeft: 24
    },
});