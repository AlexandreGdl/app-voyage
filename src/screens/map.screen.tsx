// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
// Tools
import { Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/map.style';
import TypesIcon, { IconTypeEnum } from '../components/types-icon/types-icon.component';
import { PlaceService } from '../place/service/place.service';
import { Place } from '../place/interface/place.interface';
import { PlaceStore } from '../place/store/place.store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Map'>;
  placeStore: PlaceStore;
}

const INITIAL_REGION = {
  latitude: 38.7167,
  longitude: -9.1333,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  placeStore: stores.placeStore as PlaceStore,
}))(observer((props: Props) => {

  useEffect(() => {
    props.placeStore.fetchGlobalPlaces();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {props.placeStore.globalPlaces.map((place: Place, index: number) =>
          place.position && 
          <Marker key={index} coordinate={{ latitude: place.position.lat, longitude: place.position.long }}>
            <Text>{place.name}</Text>
            {console.log('rendered at', place.position)}
            <TypesIcon iconName="add" name={IconTypeEnum.RESTAURANT} />
          </Marker>
        )}
      </MapView>

      <BottomNavBarComponent navigation={props.navigation} />
    </SafeAreaView>
  );
}));

export default MapScreen;