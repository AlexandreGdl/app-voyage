// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
// Tools
import { inject, observer } from 'mobx-react';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/slates.style';
import { PlaceStore } from '../place/store/place.store';
import { ScrollView, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Entypo } from '@expo/vector-icons';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { RouteProp } from '@react-navigation/core';
import { Slate } from '../slate/interface/slate.interface';
import Theme from '../style/theme';
import { UserStore } from '../user/store/user.store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Slates'>;
  route: RouteProp<RootStackParamList, 'Slates'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}

const SlatesScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => {

  const [voyage, setVoyage] = useState<Voyage | null>(null);

  function goBack(): void {
    props.navigation.goBack();
  }

  function getVoyageFromStore(): void {
    const newVoyage = props.voyageStore.usersVoyage.find((toFind: VoyageObject) => toFind._id === props.route.params.voyageId);
    if (newVoyage) {
      setVoyage(newVoyage.toJS());
    } else {
      props.navigation.goBack();
    }
  }

  function getTotalSlatesAmount(): number {
    let amount = 0;
    if (voyage) {
      voyage.slates.forEach((slate: Slate) => {
        amount += slate.amount;
      });
    }
    return amount;
  }

  function getUserAmount(): number {
    let amount = 0;
    if (voyage) {
      voyage.slates.forEach((salte: Slate) => {
        if (salte.donorId === props.userStore._id) amount += salte.amount;
      })
    }
    return amount;
  }

  useEffect(() => {
    getVoyageFromStore();
  }, [props.voyageStore.usersVoyage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
            <Image source={require('../../assets/plannit-1.png')} resizeMode='contain' style={styles.logo}/>
        </View>
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
          <Entypo name="chevron-left" size={36} color="grey" />
          <Text style={styles.goBackText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.blueContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.greyText}>Total</Text>
            <Text style={styles.priceTotal}>{getTotalSlatesAmount()}€</Text>
            <Text style={styles.greyText}>Mes dépenses: {getUserAmount()}€</Text>
          </View>

          <Text style={styles.date}>SAMEDI 19 JUIN</Text>
          <View style={styles.slateBox}>
            {voyage && voyage.slates.map((slate: Slate, index: number) => (
              <View key={slate._id} style={[styles.slateContainer, { marginBottom: voyage.slates.length > index + 1 ? 15 : 0 }]}>
                <View>
                  {/* Title.toUpperCase() */}
                  <Text style={styles.slateTitle}>{slate.title.toUpperCase()}</Text>
                  {/* Donor name */}
                  <Text style={styles.slateBy}>Payé par {slate.donorUser.username} {slate.donorId === props.userStore._id && '(Moi)'}</Text>
                </View>
                {/* Slate Amount */}
                <Text style={styles.slatePrice}>{slate.amount}€</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}));

export default SlatesScreen;