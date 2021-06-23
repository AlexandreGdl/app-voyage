// React
import { AntDesign, Entypo, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';
import React, { FunctionComponent } from 'react';
// Tools
import { Text, View, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatureCard from '../components/feature-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/widgets.style';
import { WidgetStore } from '../widget/store/widget.store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Widgets'>;
  widgetStore: WidgetStore;
}

export enum WidgetType {
  AGENDA = 'agenda',
  WALLET = 'wallet',
  ACCOUNT_CASH = 'account-cash',
  COUNTDOWN = 'countdown',
  MAP = 'map',
  NOTE = 'note',
}

type WidgetUI = {
  name: string;
  text: string;
  icon: JSX.Element;
  type: WidgetType;
}

const WidgetScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  widgetStore: stores.widgetStore as WidgetStore,
}))(observer((props: Props) => {
 
  const defaultWidgets: Array<WidgetUI> = [
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

  function goBack(): void {
    props.navigation.goBack();
  }

  function handleWidgetPressed(type: WidgetType): void {
    console.log(props.widgetStore.widgets.filter((widget) => widget.name === type)[0]);
  }
  
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
                { defaultWidgets.map(defaultWidget =>
                  <TouchableOpacity onPress={(): void => handleWidgetPressed(defaultWidget.type) } key={defaultWidget.name} style={styles.widgetCard}>
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