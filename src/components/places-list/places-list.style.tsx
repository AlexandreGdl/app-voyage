import { Dimensions, StyleSheet } from 'react-native';
import Theme from '../../style/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        paddingVertical: Theme.PAGE_PADDING_HORIZONTAL
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 15,
        marginRight: 10
    },
    cardList: {
        height: 500,
    },
    listElement: {
        paddingVertical: 10,
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',
        marginHorizontal: Theme.PAGE_MARGIN_HORIZONTAL
    },
    element : {
        width: '70%',
    },
    titleElement: {
        fontFamily: 'Montserrat-Bold'
    },
    descriptionElement :{
        fontFamily: 'Montserrat'
    },
    iconType: {
        position: 'absolute',
        top: 5,
        left: -5,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50
    }
});