// React
import React, { FunctionComponent } from 'react';
// Tools
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root-stack-parameters-list';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: 25,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

const BottomNavBarComponent: FunctionComponent<Props> = (props: Props) => {

  function handleGoToMap(): void {
    props.navigation.replace('Map');
  }

  function handleGoToHome(): void {
    props.navigation.replace('Home');
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity style={{ marginBottom: 7 }} onPress={handleGoToHome}>
          <Fontisto name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 7 }} onPress={handleGoToMap}>
          <Fontisto name="map-marker-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>
  );
}

export default BottomNavBarComponent;