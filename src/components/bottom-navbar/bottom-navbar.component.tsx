// React
import React, { FunctionComponent, useState } from 'react';
// Tools
import { Dimensions, StyleSheet, View, Text, LayoutChangeEvent, ViewStyle, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root-stack-parameters-list';
import Theme from '../../style/theme';
import ButtonComponent from '../button.component';

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
  onBtnPressed?: () => void;
  style?: ViewStyle;
  hideBtn?: boolean;
  customIcon?: JSX.Element;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 25,
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  buttonPlus: {
    position: 'absolute',
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
  }
}); 

const BottomNavBarComponent: FunctionComponent<Props> = (props: Props) => {

  const [buttonWidth, setButtonWidth] = useState(50);

  function handleGoToMap(): void {
    props.navigation?.replace('Map');
  }

  function handleGoToHome(): void {
    props.navigation?.replace('Home');
  }

  function handleGoToProfile(): void {
    props.navigation?.replace('Profile');
  }

  function getButtonWidth(event: LayoutChangeEvent): void {
    const { layout } = event.nativeEvent;
    setButtonWidth(layout.width);
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={handleGoToHome}>
          <SimpleLineIcons name="home" size={24} color="grey" /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('En construction', 'Désolé, cette page n\'est pas encore disponible !')}>
          <SimpleLineIcons name="fire" size={24} color="grey" />
        </TouchableOpacity>
        {!props.hideBtn && <TouchableOpacity>
        </TouchableOpacity>}
        <TouchableOpacity onPress={handleGoToMap}>
          <SimpleLineIcons name="map" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToProfile}>
          <SimpleLineIcons name="user" size={24} color="grey" />
        </TouchableOpacity>
      </View>
      {!props.hideBtn && <View onLayout={getButtonWidth} style={[styles.buttonPlus, {left: (Dimensions.get('screen').width/2) - (buttonWidth/2)}]}>
        <ButtonComponent onPress={props.onBtnPressed} gradient={Theme.PRIMARY_GRADIENT} childrenStyle={{padding: 15 }}>
          {props.customIcon ?
            props.customIcon
            :
          <Entypo name="plus" size={36} color="white" />          
          }
        </ButtonComponent>
      </View>}
    </View>
  );
}

export default BottomNavBarComponent;