// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
// Tools
import { ImageBackground, Text, View, Image, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import CardComponent from '../components/voyage-card/voyage-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
import { styles } from '../style/home.style';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: FunctionComponent<Props> = (props: Props) => {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground source={require('../../assets/Photo-3.jpg')} imageStyle={styles.imgBorderRadius} style={styles.imgBg}>
          <Image source={require('../../assets/Plannit-logo-blanc.png')} resizeMode='contain' style={styles.logo}/>
          <Text style={styles.subTitle}>Tout va plus vite !</Text>
        </ImageBackground>
        <View style={{ flex: 1 }}>
          <Text style={styles.textVoyage}>Vos voyages</Text>
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer} horizontal>
            <CardComponent img='https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/2} height={Dimensions.get('screen').width/2} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
            <CardComponent img='https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  width={Dimensions.get('screen').width/2} height={Dimensions.get('screen').width/2} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
          </ScrollView>
          <Text style={styles.textVoyage}>Pour vous</Text>
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer} horizontal>
            <CardComponent img='https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
            <CardComponent img='https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
          </ScrollView>
          
        </View>
      </ScrollView>
      <BottomNavBarComponent navigation={props.navigation} />
    </View>
  );
}

export default HomeScreen;