import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: '100%', 
    height: '10%', 
    marginTop: 100
  },
  buttonsContainer: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    marginBottom: 100
  },
  buttonContainer: {
    width: Dimensions.get('screen').width * 0.75, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  formContainer: {
    position: 'absolute', 
    bottom: 20, 
    backgroundColor: 'white', 
    width: '100%', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    paddingTop: 50
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
  changeFormText: {
    textAlign: 'center', 
    paddingVertical: 15, 
    fontSize: 16, 
    fontFamily: 'Montserrat-Bold', 
    paddingBottom: 40
  }
});