// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
// Tools
import { inject, observer } from 'mobx-react';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/slates.style';
import { PlaceStore } from '../place/store/place.store';
import { ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Entypo } from '@expo/vector-icons';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { RouteProp } from '@react-navigation/core';
import { Slate } from '../slate/interface/slate.interface';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Slates'>;
  route: RouteProp<RootStackParamList, 'Slates'>;
  voyageStore: VoyageStore;
}

const SlatesScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
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
        <Text>nombre de dette la les pauvres : {voyage && voyage.slates.length}</Text>
        {voyage && voyage.slates.map((slate: Slate) => (
          <View>
            <Text>{slate.donorUser.username} doit {slate.amount}€ à {slate.recipientUser.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}));

export default SlatesScreen;