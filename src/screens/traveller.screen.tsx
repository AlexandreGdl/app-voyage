// React
import { Entypo } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
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
import UserPictureProfile from '../components/user-picture-profile/user-picture-profile.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/traveller.style';
import { UserStore } from '../user/store/user.store';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Widget } from '../widget/interface/widget.interface';
import { WidgetType, defaultWidgets, WidgetUI } from './widgets.screen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Traveller'>;
  route: RouteProp<RootStackParamList, 'Voyage'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}

const TravellerScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => { 

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [voyage, setVoyage] = useState<Voyage | null>(null);

  function goBack(): void {
    props.navigation.goBack();
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
    const newVoyage = props.voyageStore.usersVoyage.find((toFind: VoyageObject) => toFind._id === props.route.params.voyageId);
    if (newVoyage) {
      setVoyage(newVoyage.toJS());
    } else {
      props.navigation.goBack();
    }
  }

  function generateIcon(icon: WidgetType): JSX.Element | undefined {
    return defaultWidgets.find((value: WidgetUI) => value.type === icon)?.icon;
  }

  useEffect(() => {
    getVoyageFromStore();
  }, [props.voyageStore.usersVoyage]);
  
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
        <View style={styles.travellerView}>
          <Text style={styles.titles}>Voyageurs</Text>
          <View style={styles.wrapper}>
            {
              voyage && voyage.owner &&
              <View style={styles.travellersElement}>
                <UserPictureProfile withMargin={false} user={voyage.owner} isActive={voyage.owner._id === props.userStore._id} />
                <Text style={styles.username}>{voyage.owner.username.charAt(0).toUpperCase() + voyage.owner.username.slice(1).toLowerCase()}</Text>
              </View>
            }
            {
              voyage && voyage.members.slice(0, 4).map(member => {
                return (
                  <View style={styles.travellersElement}>
                    <UserPictureProfile isActive={member._id === props.userStore._id} user={member} withMargin={false} />
                    <Text style={styles.username}>{member.username.charAt(0).toUpperCase() + member.username.slice(1).toLowerCase()}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonPlus} >
        <ButtonComponent onPress={openCard} gradient={Theme.PRIMARY_GRADIENT} childrenStyle={{padding: 15}}>
          <Entypo name="plus" size={36} color="white" />
        </ButtonComponent>
      </View>

      {cardOpen && <Animated.View onTouchEnd={closeCard} style={[styles.darkBackground, { opacity: fadeAnim }]}>
      </Animated.View>}
      <BottomCardComponent open={cardOpen}>
          <AddTravellerComponent onActionEnd={closeCard} voyageId={props.route.params.voyageId} voyageStore={props.voyageStore} onVoyageCreated={closeCard} />
      </BottomCardComponent>
    </View>
  );
}));

export default TravellerScreen;