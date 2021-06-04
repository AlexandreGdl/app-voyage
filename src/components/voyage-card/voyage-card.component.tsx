// React
import React, { FunctionComponent, useState } from 'react';
// Tools
import { Dimensions, StyleSheet, View, Text, LayoutChangeEvent, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root-stack-parameters-list';
import Theme from '../../style/theme';
import ButtonComponent from '../button.component';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './voyage-card.style';
import moment from 'moment';
import 'moment/locale/fr';


moment.locale('fr');

type Props = {
  titleVoyage: string;
  nbTraveller: number;
  nbDay: number;
  date: Date;
  width: number;
  height: number;
  img: string;
}

const CardComponent: FunctionComponent<Props> = (props: Props) => {

  const monthDate = moment(props.date).format('MMM');
 
  return (
    <TouchableOpacity>
      <ImageBackground source={{uri: props.img}} imageStyle={[styles.image, {width: props.width, height: props.height}]} style={[styles.card, {width: props.width, height: props.height}]}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{moment(props.date).format('DD')}</Text>
          <Text style={styles.dateText}>{ monthDate[0].toUpperCase() + monthDate.slice(1) }</Text>
        </View>
        <LinearGradient start={Theme.START_INNERSHADOW} end={Theme.END_INNERSHADOW} colors={Theme.INNER_SHADOW_GRADIENT} style={styles.gradient}>  
          <View style={styles.text}>
            <Text style={styles.titleVoyage}>{props.titleVoyage}</Text>
            <View style={styles.filters}>
              <Text style={styles.travellerFilter}>{props.nbTraveller} voyageurs</Text>
              <Text style={styles.dayFilter}>{props.nbDay} jours</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default CardComponent;