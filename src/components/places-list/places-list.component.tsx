import React, { FunctionComponent, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ListRenderItem, PanResponderGestureState } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Place } from '../../place/interface/place.interface';
import { PlaceObject } from '../../place/object/place.object';
import { styles } from './places-list.style';
import { PlaceTypeEnum } from '../../place/place-type.enum';
import TypesIcon from '../types-icon/types-icon.component';
import Animated from 'react-native-reanimated';

type Props = {
    places: PlaceObject[],
    goToPlace(place: PlaceObject): void;
}

type placeType = {
  link: string;
  type: PlaceTypeEnum;
  text: string;
}

export const placesTypes: placeType[] = [
  {
    link: 'https://images.pexels.com/photos/264512/pexels-photo-264512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    type: PlaceTypeEnum.MALL,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
  },
  {
    link: 'https://images.pexels.com/photos/4937197/pexels-photo-4937197.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    type: PlaceTypeEnum.MONUMENTS,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
  },
  {
    link: 'https://images.pexels.com/photos/4858584/pexels-photo-4858584.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    type: PlaceTypeEnum.POINT_OF_VIEW,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
  },
  {
    link: 'https://images.pexels.com/photos/4676640/pexels-photo-4676640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    type: PlaceTypeEnum.RESTAURANT_BAR,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
  },
  {
    link: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    type: PlaceTypeEnum.SUPERMARKET,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non neque dolor. ',
  }
]

const PlacesListComponent: FunctionComponent<Props> = (props: Props) => {

  function goToPlace(place: PlaceObject) {
    props.goToPlace(place);
  }
  
  function renderItem({item, index}: {item: PlaceObject, index: number}): JSX.Element {
    const type = placesTypes.find((value: placeType) => value.type === item.type.name );
    return (
      <TouchableOpacity key={item._id} onPress={() => goToPlace(item)}>
        <View style={styles.listElement}>
          <Image source={{ uri: (type as placeType).link }} resizeMode='cover' style={styles.logo}/>
          <View style={styles.iconType}>
              <TypesIcon name={item.type.name} />
          </View>
          <View style={styles.element}>
              <Text style={styles.titleElement}>{item.name}</Text>
              <Text style={styles.descriptionElement}>{type?.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardList}>
        <FlatList 
          data={props.places}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );  
};

export default PlacesListComponent;