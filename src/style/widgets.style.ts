import { Dimensions, StyleSheet } from 'react-native';
import Theme from './theme';

export const styles = StyleSheet.create({
    widgetView : {
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL,
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
        fontFamily: 'Montserrat-Medium',
        fontSize: 16
    },
    explication : {
        fontFamily: 'Montserrat',
        fontSize: 16,
    },
    widgetCard : {
        borderRadius: 20,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white'
    },
    widgetCardImage : {
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        width: 140,
        height: 140,
        marginTop: 0
    },
    widgetContainerText : {
        maxWidth: '60%',
        paddingHorizontal: 15
    }, 
    titleWidget : {
        fontFamily : 'Montserrat-Bold',
        fontSize: 16,
        paddingBottom: 5
    },
    descriptionWidget : {
    }
});