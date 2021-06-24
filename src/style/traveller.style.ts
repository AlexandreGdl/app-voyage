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
        marginBottom: 20
    },
    travellerView : {
        paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL
    },
    wrapper: {
        alignItems: 'flex-start',
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
    buttonPlus: {
        shadowColor: "#000", 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        right: 30,
        bottom: 30
    },
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
        borderRadius:82 / 2
    },
    me : {
    },
    travellersElement : {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    username : {
        fontSize: 18,
        marginLeft: 40,
        fontFamily: 'Montserrat',
    }
});