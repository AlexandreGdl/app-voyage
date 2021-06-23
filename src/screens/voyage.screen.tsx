// React
import { Entypo } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
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
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageStore } from '../voyage/store/voyage.store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Voyage'>;
  route: RouteProp<RootStackParamList, 'Voyage'>;
  voyageStore: VoyageStore;
}

const VoyageScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
}))(observer((props: Props) => { 

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [voyage, setVoyage] = useState<Voyage | null>(null);

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

  function getVoyageFromStore(): void {
    const newVoyage = props.voyageStore.usersVoyage.find((toFind: Voyage) => toFind._id === props.route.params.voyageId);
    if (newVoyage) {
      setVoyage(newVoyage);
    } else {
      props.navigation.goBack();
    }
  }

  useEffect(() => {
    getVoyageFromStore();
  }, []);
  
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
          <AddTravellerComponent voyageId={props.route.params.voyageId} voyageStore={props.voyageStore} onVoyageCreated={closeCard} />
        </BottomCardComponent>
    </View>
  );
}));

export default VoyageScreen;