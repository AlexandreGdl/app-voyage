// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { Text, Animated, View, ImageBackground, KeyboardAvoidingView, Keyboard, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import CreateVoyageComponent from '../components/create-voyage/create-voyage.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import { styles } from '../style/home.style';
import { ScrollView } from 'react-native-gesture-handler';
import CardComponent from '../components/voyage-card/voyage-card.component';
import BottomCardComponent from '../components/bottom-card/bottom-card.component';
import { VoyageStore } from '../voyage/store/voyage.store';
import { inject, observer } from 'mobx-react';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  voyageStore: VoyageStore;
}

const HomeScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
}))(observer((props: Props) => {

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

  function handleGoToVoyage(voyageId: string): void {
    props.navigation.navigate('Voyage', { voyageId });
  }

  useEffect(() => {
    props.voyageStore.fetchAllVoyage();
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground source={require('../../assets/Photo-3.jpg')} imageStyle={styles.imgBorderRadius} style={styles.imgBg}>
            <Image source={require('../../assets/Plannit-logo-blanc.png')} resizeMode='contain' style={styles.logo}/>
            <Text style={styles.subTitle}>Tout va plus vite !</Text>
          </ImageBackground>
          <View style={{ flex: 1 }}>
            <Text style={styles.textVoyage}>Vos voyages</Text>
            {
                props.voyageStore.usersVoyage.length === 0 && <Text style={styles.subtitle}>Pour créer un voyage, utiliser le bouton plus en bas de votre écran.</Text>
            }
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer} horizontal>
              {
                props.voyageStore.usersVoyage.map(voyage => {
                  return (
                    <CardComponent key={voyage._id} onPress={(): void => handleGoToVoyage(voyage._id)} img='https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/2} height={Dimensions.get('screen').width/2} titleVoyage={voyage.name} flag={voyage.cityName.split(', ')[1]} nbTraveller={4} nbDay={7} date={new Date()}/>
                  )
                })
              }
            </ScrollView>
            <Text style={styles.textVoyage}>Pour vous</Text>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.cardContainer, {paddingBottom: 140}]} horizontal>
              <CardComponent onPress={(): void => handleGoToVoyage('2')} img='https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
              <CardComponent onPress={(): void => handleGoToVoyage('qsdqsd')} img='https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
            </ScrollView>
          </View>
        </ScrollView>
        <BottomNavBarComponent navigation={props.navigation} onBtnPressed={openCard} />
          
        {cardOpen && <Animated.View onTouchEnd={closeCard} style={[styles.darkBackground, { opacity: fadeAnim }]}>
          </Animated.View>}
        <BottomCardComponent open={cardOpen}>
          <CreateVoyageComponent voyageStore={props.voyageStore} onVoyageCreated={closeCard} />
        </BottomCardComponent>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}));


export default HomeScreen;