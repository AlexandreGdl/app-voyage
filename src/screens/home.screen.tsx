// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { Text, Animated, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomCardComponent from '../components/bottom-card.component.tsx/bottom-card.component';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import CreateVoyageComponent from '../components/create-voyage/create-voyage.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import { styles } from '../style/home.style';
import CardComponent from '../components/voyage-card/voyage-card.component';
import Theme from '../style/theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: FunctionComponent<Props> = (props: Props) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cardOpen, setCardOpen] = useState<boolean>(false);


  function closeCard(): void {
    Keyboard.dismiss();
    Animated.spring(
      fadeAnim,
      {
        useNativeDriver: true,
        toValue: 0
      }
    ).start();
    setCardOpen(false);
  }

  function openCard(): void {
    setCardOpen(true);
    Animated.spring(
      fadeAnim,
      {
        useNativeDriver: true,
        toValue: 0.8
      }
    ).start();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../../assets/Photo-2.jpg')} style={styles.imgBg}>

        </ImageBackground>
        <Text>Vos voyages</Text>
        <CardComponent titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
        <CardComponent titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>

      </SafeAreaView>
      <BottomNavBarComponent navigation={props.navigation} onBtnPressed={openCard} />
        
      {cardOpen && <Animated.View onTouchEnd={closeCard} style={[styles.darkBackground, { opacity: fadeAnim }]}>
        </Animated.View>}
      <BottomCardComponent open={cardOpen}>
        <CreateVoyageComponent onVoyageCreated={closeCard} />
      </BottomCardComponent>
     </KeyboardAvoidingView>
  );
}

export default HomeScreen;