import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
  formContainer: {
    position: 'absolute', 
    bottom: 20, 
    backgroundColor: 'white', 
    width: '100%', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    paddingTop: 50,
  }, 
  formTitle: {
    fontFamily: 'Montserrat-Bold', 
    fontSize: 32, 
    marginHorizontal: 50, 
    marginVertical: 20
  },
  formLabel: {
    fontFamily: 'Montserrat-Medium', 
    fontSize: 14, 
    color: 'grey', 
    marginHorizontal: 50, 
    marginBottom: 8
  },
  formInput: {
    fontFamily: 'Montserrat', 
    fontSize: 16, 
    marginHorizontal: 50, 
    borderBottomWidth: 1, 
    paddingBottom: 8, 
    paddingLeft: 8
  },
  formError: {
    borderColor: 'red'
  },
})