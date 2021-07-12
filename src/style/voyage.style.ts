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
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL,
        marginBottom: 20
    },
    voyageView : {
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL
    },
    buttonPlus: {
        shadowColor: "#000", 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: -10
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
        justifyContent: 'space-between',
        marginHorizontal: Theme.PAGE_PADDING_HORIZONTAL
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
    containerProfile : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25
    },
    wrapperListProfile : {
        flexDirection: 'row'
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
        marginLeft: -10
    },
    textPictureProfile : {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    plusMember : {
        fontSize: 18,
        marginLeft: 20,
        fontFamily: 'Montserrat-Medium'
    },
    me : {
        borderColor: 'grey',
        borderWidth: 1
    },
    linearBorder : {
        height: 80, 
        width: 80, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius:82 / 2
    },
});