// React
import { Entypo } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { Text, View, Image, ImageBackground, Button, Dimensions, ScrollView, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import AddTravellerComponent from '../components/add-traveller/add-traveller.component';
import BottomCardComponent from '../components/bottom-card/bottom-card.component';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import ButtonComponent from '../components/button.component';
import FeatureCard from '../components/feature-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/voyage.style';
import { UserStore } from '../user/store/user.store';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Widget } from '../widget/interface/widget.interface';
import { WidgetType, defaultWidgets, WidgetUI } from './widgets.screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserPictureProfile from '../components/user-picture-profile/user-picture-profile.component';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Voyage'>;
  route: RouteProp<RootStackParamList, 'Voyage'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}

const VoyageScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => { 

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [voyage, setVoyage] = useState<Voyage | null>(null);

  function goBack(): void {
    props.navigation.goBack();
  };

  function goToWidgets() : void {
    props.navigation.navigate('Widgets', { voyageId: props.route.params.voyageId });
  };

  function goToTravellers(): void {
    props.navigation.navigate('Traveller', { voyageId: props.route.params.voyageId })
  }
  
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

  function goToOneWidgets(widget: Widget): void {
    const { link } = defaultWidgets.filter((value: WidgetUI) => value.type === widget.name)[0];
    if (link) props.navigation.navigate(link, { voyageId: props.route.params.voyageId });
  }

  useEffect(() => {
    getVoyageFromStore();
  }, [props.voyageStore.usersVoyage]);
  
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.logoContainer}>
              <Image source={require('../../assets/plannit-1.png')} resizeMode='contain' style={styles.logo}/>
          </View>
          <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
            <Entypo name="chevron-left" size={36} color="grey" />
            <Text style={styles.goBackText}>Retour</Text>
          </TouchableOpacity>
          <View style={styles.voyageView}>
            <Text style={styles.titles}>Voyageurs</Text>
            <View  style={styles.containerProfile}>
              <TouchableWithoutFeedback onPress={goToTravellers}  style={styles.wrapperListProfile}>
                {
                  voyage && voyage.owner &&
                  <UserPictureProfile withMargin={false} isActive={false} user={voyage.owner} />

                }
                {
                  voyage && voyage.members.slice(0, 4).map(member => (
                      <UserPictureProfile withMargin={true} isActive={member._id === props.userStore._id} user={member} />
                  ))
                }
              </TouchableWithoutFeedback>
              <View style={styles.buttonPlus}>
                <ButtonComponent onPress={openCard} gradient={Theme.PRIMARY_GRADIENT} style={{marginTop: 0}} childrenStyle={{padding: 15}}>
                  <Entypo name="plus" size={36} color="white" />
                </ButtonComponent>
              </View>
              {
                voyage && voyage.members.length > 4 && <Text style={styles.plusMember}>+{voyage.members.length - 4} </Text>
              }
            </View>
            {
              voyage && voyage.members.length > 4 && <Text style={styles.plusMember}>+{voyage.members.length - 4} </Text>
            }
          </View>
          <Text style={[styles.titles]}>Fonctionnalités</Text>
          <View style={styles.card}>
            <FeatureCard onPress={goToWidgets} textStyle={{color: 'white'}} text="Ajouter" gradient={Theme.PRIMARY_GRADIENT}>
              <Entypo name="plus" size={36} color="white" />
            </FeatureCard>
            {voyage && voyage.activeWidgets.map((widget: Widget) => (
                <FeatureCard onPress={(): void => goToOneWidgets(widget)} textStyle={{color: 'black'}} text={widget.name} gradient={['#fff', '#fff']}>
                  {generateIcon(widget.name)}
                </FeatureCard>
              ))}
          </View>
          </ScrollView>
          {cardOpen && <Animated.View onTouchEnd={closeCard} style={[styles.darkBackground, { opacity: fadeAnim }]}>
          </Animated.View>}
          <BottomCardComponent open={cardOpen}>
            <AddTravellerComponent onActionEnd={closeCard} voyageId={props.route.params.voyageId} voyageStore={props.voyageStore} onVoyageCreated={closeCard} />
          </BottomCardComponent>
      </View>
    </KeyboardAvoidingView>
  );
}));

export default VoyageScreen;