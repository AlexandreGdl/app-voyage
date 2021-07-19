// React
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { Text, Animated, View, KeyboardAvoidingView, Keyboard, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import UserPictureProfile from '../components/user-picture-profile/user-picture-profile.component';
import CardComponent from '../components/voyage-card/voyage-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import { styles } from '../style/profile.style';
import { User } from '../user/interface/user.interface';
import { UserStore } from '../user/store/user.store';
import { VoyageStore } from '../voyage/store/voyage.store';
import { CommonActions } from '@react-navigation/native';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Voyage'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}


const ProfileScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => { 

  function logout(): void {
    AsyncStorage.removeItem('token');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Auth' },
        ],
      })
    );
  }

  function handleGoToVoyage(voyageId: string): void {
    props.navigation.navigate('Voyage', { voyageId });
  }

  return (
    <View style={{flex : 1}}>
      <ScrollView style={{flex : 1}}>
        <View style={styles.imgBg}>
          {props.userStore.username && 
          <View style={styles.travellersElement}>
            <UserPictureProfile isActive user={props.userStore as User} withMargin={false} />
            <Text style={styles.username}>{props.userStore.username.charAt(0).toUpperCase() + props.userStore.username.slice(1).toLowerCase()}</Text>
            <Button
                onPress={logout}
                title="Se déconnecter"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
          </View>
          }
        </View>
        <View>
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
            <Text style={styles.textVoyage}>Séjours terminés</Text>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.cardContainer, {paddingBottom: 140}]} horizontal>
              <CardComponent onPress={(): void => handleGoToVoyage('2')} img='https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
              <CardComponent onPress={(): void => handleGoToVoyage('qsdqsd')} img='https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' width={Dimensions.get('screen').width/1.3} height={Dimensions.get('screen').width/1.3} titleVoyage='Lisbonne, Portugal' nbTraveller={4} nbDay={7} date={new Date()}/>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BottomNavBarComponent navigation={props.navigation}/>
    </View>
  );
}));

export default ProfileScreen;