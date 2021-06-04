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
  changeFormText: {
    textAlign: 'center', 
    paddingVertical: 15, 
    fontSize: 16, 
    fontFamily: 'Montserrat-Bold', 
    paddingBottom: 40
  }
});