// React
import { AntDesign, Entypo, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
// Tools
import { Text, View, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatureCard from '../components/feature-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/widgets.style';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { VoyageService } from '../voyage/service/voyage.service';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Widget } from '../widget/interface/widget.interface';
import { WidgetStore } from '../widget/store/widget.store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Widgets'>;
  route: RouteProp<RootStackParamList, 'Widgets'>;
  widgetStore: WidgetStore;
  voyageStore: VoyageStore;
}

export enum WidgetType {
  AGENDA = 'agenda',
  WALLET = 'wallet',
  ACCOUNT_CASH = 'account-cash',
  COUNTDOWN = 'countdown',
  MAP = 'map',
  NOTE = 'note',
}

export type WidgetUI = {
  name: string;
  text: string;
  icon: JSX.Element;
  type: WidgetType;
}

export const defaultWidgets: Array<WidgetUI> = [
  {
    name: 'Agenda',
    type: WidgetType.AGENDA,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <AntDesign name='calendar' size={42}/>
  },
  {
    name: 'Wallet',
    type: WidgetType.WALLET,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <Ionicons name='wallet-outline' size={42}/>
  },
  {
    name: 'Ardoise',
    type: WidgetType.ACCOUNT_CASH,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <MaterialCommunityIcons name="account-cash-outline" size={42}/>
  },
  {
    name: 'Décompte',
    type: WidgetType.COUNTDOWN,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <Ionicons name="ios-hourglass-outline" size={42} />
  },
  {
    name: 'Notes partagées',
    type: WidgetType.NOTE,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <Ionicons name="ios-document-text-outline" size={42}/>
  },
  {
    name: 'Map personnalisée',
    type: WidgetType.MAP,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
    icon: <Feather name='map' size={42}/>
  },
];

const WidgetScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  widgetStore: stores.widgetStore as WidgetStore,
}))(observer((props: Props) => {
 
  const [voyage, setVoyage] = useState<Voyage | null>(null);

  function goBack(): void {
    props.navigation.goBack();
  }

  async function handleWidgetPressed(type: WidgetType): Promise<void> {
    const widget = props.widgetStore.widgets.filter((widget) => widget.name === type)[0]
    console.log(props.widgetStore.widgets);
    // met a jour le voyage dans la base
    await VoyageService.getInstance().toggleWidget(props.route.params.voyageId, widget._id);

    await props.voyageStore.fetchAllVoyage();
  
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
    props.widgetStore.fetchWidgets();
    getVoyageFromStore();
  }, [props.voyageStore.usersVoyage]);

  return (
    <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/plannit-1.png')} resizeMode='contain' style={styles.logo}/>
            </View>
            <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                <Entypo name="chevron-left" size={36} color="grey" />
                <Text style={styles.goBackText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.widgetView}>
                <Text style={styles.explication}>Sélectionnez les fonctionnalités pour votre voyage</Text>
                {
                  defaultWidgets.map(defaultWidget =>
                    <TouchableOpacity 
                      onPress={(): Promise<void> => handleWidgetPressed(defaultWidget.type) } 
                      key={defaultWidget.name} 
                      style={[styles.widgetCard, voyage && voyage.activeWidgets.filter((value: Widget) => value.name === defaultWidget.type)[0] && { borderColor: 'black', borderWidth: 1 }]}
                    >
                      <FeatureCard style={styles.widgetCardImage}>
                          {defaultWidget.icon}
                      </FeatureCard>
                      <View style={styles.widgetContainerText}>
                          <Text style={styles.titleWidget}>{defaultWidget.name}</Text>
                          <Text style={styles.descriptionWidget}>{defaultWidget.text}
                          </Text>
                      </View>
                    </TouchableOpacity>
                  ) 
                }
                
            </View>
        </ScrollView>
    </View>
  );
}));

export default WidgetScreen;

function setState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}
