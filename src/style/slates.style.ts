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
		flexDirection: 'column',
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
		paddingVertical: 20,
		shadowColor: "#000", 
		shadowOffset: {
				width: 0,
				height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
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
	},
	btnAddExpenses: {
		position: 'absolute',
		bottom: 50,
		right: 10,
    alignItems: 'center', 
    transform: [{translateY: -50}],
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
	},
	widgetTitle: { 
		fontSize: 20, 
		fontFamily: 'Montserrat-Bold', 
		textAlign: 'center', 
		marginBottom: 20 
	},
	containerTopGrey: {
		width: '30%', 
		backgroundColor: '#F0F0F0', 
		height: 5, 
		borderRadius: 50
	},
	inputLabel: { 
		color: Theme.GREY_TEXT, 
		fontSize: 16, 
		fontFamily: 'Montserrat', 
		fontWeight: '500', 
		marginTop: 30, 
		alignSelf: 'flex-start' 
	},
	input: { 
		borderWidth: 2, 
		borderColor: '#F2EFEF', 
		paddingHorizontal: 12, 
		paddingVertical: 5, 
		width: '100%', 
		marginTop: 15 
	},
	selectAll: { 
		width: '90%', 
		marginTop: 5 
	},
	selectAllContainer: { 
		width: '100%', 
		justifyContent: 'space-between', 
		flexDirection: 'row', 
		alignItems: 'center'
	},
	customLabel: { 
		alignSelf: 'auto', 
		marginTop: 0, 
		color: '#333' 
	},
	iconContainer: { 
		width: 40, 
		height: 40, 
		borderColor: '#333',
		borderRadius: 50, 
		justifyContent: 'center', 
		alignItems: 'center',
	},
	limiter: { 
		width: '90%', 
		height: 2, 
		backgroundColor: '#F0F0F0', 
		marginTop: 10 
	},
	itemContainer: { 
		width: '100%', 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		marginBottom: 20
	},
	icon: { 
		backgroundColor: '#dedede',
		borderRadius: 50, 
		width: 45, 
		height: 45, 
		justifyContent: 'center', 
		alignItems: 'center' ,
		shadowColor: "#000", 
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	}
});