// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
// Tools
import { ImageBackground, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import CardComponent from '../components/voyage-card/voyage-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
import { styles } from '../style/home.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: FunctionComponent<Props> = (props: Props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/Photo-2.jpg')} style={styles.imgBg}>

      </ImageBackground>
      <Text>Vos voyages</Text>
      <CardComponent titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
      <CardComponent titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
      <BottomNavBarComponent navigation={props.navigation} />
    </SafeAreaView>
  );
}

export default HomeScreen;