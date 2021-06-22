// React
import { Entypo } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useRef, useState } from 'react';
// Tools
import { Text, View, Image, ImageBackground, Button, Dimensions, ScrollView, Animated, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddTravellerComponent from '../components/add-traveller/add-traveller.component';
import BottomCardComponent from '../components/bottom-card/bottom-card.component';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import ButtonComponent from '../components/button.component';
import FeatureCard from '../components/feature-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/voyage.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Voyage'>
}

const VoyageScreen: FunctionComponent<Props> = (props: Props) => {
 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cardOpen, setCardOpen] = useState<boolean>(false);

  function goBack(): void {
    props.navigation.goBack();
  };

  function goToWidgets() : void {
    props.navigation.navigate('Widgets');
  };
  
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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.logoContainer}>
            <Image source={require('../../assets/plannit-1.png')} resizeMode='contain' style={styles.logo}/>
        </View>
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
          <Entypo name="chevron-left" size={36} color="grey" />
          <Text style={styles.goBackText}>Retour</Text>
        </TouchableOpacity>
        <View style={[styles.voyageView]}>
          <Text style={[styles.titles]}>Voyageurs</Text>
          <View style={styles.buttonPlus}>
            <ButtonComponent onPress={openCard} gradient={Theme.PRIMARY_GRADIENT} childrenStyle={{padding: 15 }}>
              <Entypo name="plus" size={36} color="white" />
            </ButtonComponent>
          </View>
          <Text style={[styles.titles]}>Fonctionnalités</Text>
          <View style={styles.card}>
            <FeatureCard onPress={goToWidgets} textStyle={{color: 'white'}} text="Ajouter" gradient={Theme.PRIMARY_GRADIENT}>
              <Entypo name="plus" size={36} color="white" />
            </FeatureCard>
          </View>
        </View>
        </ScrollView>

        {cardOpen && <Animated.View onTouchEnd={closeCard} style={[styles.darkBackground, { opacity: fadeAnim }]}>
        </Animated.View>}
        <BottomCardComponent open={cardOpen}>
          <AddTravellerComponent onVoyageCreated={closeCard} />
        </BottomCardComponent>
    </View>
  );
}

export default VoyageScreen;