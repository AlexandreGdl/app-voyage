import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  header: { 
    marginTop: 60, 
    marginHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  headerIcons: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 5, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 50 
  },
  place: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center'
  },
  country: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8
  },
  bottomContent: {
    position: 'absolute',
    bottom: -200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    minHeight: 300,
    alignSelf: 'flex-end',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heartContainer: {
    position: 'absolute',
    left: (Dimensions.get('screen').width / 2) - 25,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapper: {
    marginTop: 40,
    marginHorizontal: 15,
    marginBottom: 30
  },
  title: {
    fontSize: 30, 
    color: 'rgba(0, 0, 0, 0.8)', 
    fontWeight: 'bold'
  },
  text: { 
    fontSize: 16, 
    color: 'rgba(0, 0, 0, 0.6)', 
    marginTop: 10, 
    lineHeight: 30 
  },
  activitiesWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10, 
    width: '100%', 
    flexWrap: 'wrap' 
  },
  activitieItem: { 
    alignItems: 'center', 
    padding: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.2)', 
    marginHorizontal: 5, 
    marginVertical: 5 
  },
  iconContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 50 
  }
});