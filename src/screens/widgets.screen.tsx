// React
import { AntDesign, Entypo, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
// Tools
import { Text, View, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatureCard from '../components/feature-card.component';
import { RootStackParamList } from '../root-stack-parameters-list';
import Theme from '../style/theme';
// Styles
import { styles } from '../style/widgets.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Widgets'>
}

type WidgetUI = {
  name: string;
  text: string;
  icon: JSX.Element;
}

const WidgetScreen: FunctionComponent<Props> = (props: Props) => {
 
  const defaultWidgets: Array<WidgetUI> = [
    {
      name: 'Agenda',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <AntDesign name='calendar' size={42}/>
    },
    {
      name: 'Wallet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <Ionicons name='wallet-outline' size={42}/>
    },
    {
      name: 'Ardoise',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <MaterialCommunityIcons name="account-cash-outline" size={42}/>
    },
    {
      name: 'Décompte',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <Ionicons name="ios-hourglass-outline" size={42} />
    },
    {
      name: 'Notes partagées',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <Ionicons name="ios-document-text-outline" size={42}/>
    },
    {
      name: 'Map personnalisée',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
      icon: <Feather name='map' size={42}/>
    },
  ];
  function goBack(): void {
    props.navigation.goBack();
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
                  <TouchableOpacity key={defaultWidget.name} style={styles.widgetCard}>
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
}

export default WidgetScreen;