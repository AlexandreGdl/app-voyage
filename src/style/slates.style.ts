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
		height: 150,
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
		flex: 1,
		flexDirection: 'column'
	},
	greyText: { 
		fontWeight: '500', 
		color: Theme.GREY_TEXT, 
		fontSize: 20 
	},
	priceTotal: { 
		color: '#000000', 
		fontSize: 35, 
		fontWeight: '500', 
		marginBottom: 8, 
		marginTop: 15 
	},
	blueContainer: {
		borderTopLeftRadius: 33, 
		alignItems: 'center', 
		borderTopRightRadius: 33, 
		backgroundColor: Theme.BLUE_BG, 
		minHeight: Dimensions.get('screen').height, 
		width: Dimensions.get('screen').width, 
		paddingVertical: 20
	},
	headerBox: {
		shadowColor: "#000", 
		shadowOffset: {
				width: 0,
				height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: '#fff', 
		borderRadius: 10, 
		alignItems: 'center', 
		width: '60%', 
		paddingVertical: 10,
		marginBottom: 40
	},
	slateBox: {
		shadowColor: "#000", 
		shadowOffset: {
				width: 0,
				height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: '#fff', 
		borderRadius: 10, 
		alignItems: 'center', 
		width: '90%', 
		paddingVertical: 10,
		minHeight: 56
	},
	date: { 
		width: '90%', 
		fontSize: 18, 
		color: '#fff', 
		marginBottom: 10 
	},
	slateContainer: { 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		width: '100%', 
		paddingHorizontal: 20, 
		paddingVertical: 8
	},
	slateTitle: { 
		fontSize: 21, 
		marginBottom: 8, 
		fontFamily: 'Montserrat-Bold'
	},
	slateBy: { 
		fontSize: 16, 
		color: Theme.GREY_TEXT, 
		fontFamily: 'Montserrat-Medium' 
	},
	slatePrice: { 
		color: Theme.PURPLE, 
		fontSize: 21, 
		fontFamily: 'Montserrat-Bold' 
	},
	headerBtn: { 
		fontSize: 16, 
		color: 'white', 
		fontFamily: 'Montserrat-Bold' 
	},
	headerBtnItem: { 
		borderRadius: 50, 
		paddingHorizontal: 16, 
		paddingVertical: 6 
	},
	btnContainer: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		width: '90%', 
		marginBottom: 22 
	}
});