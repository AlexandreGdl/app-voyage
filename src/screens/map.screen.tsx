// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { Animated, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { MapEvent, Marker, Region } from 'react-native-maps';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/map.style';
import TypesIcon from '../components/types-icon/types-icon.component';
import { PlaceService } from '../place/service/place.service';
import { Place } from '../place/interface/place.interface';
import { PlaceStore } from '../place/store/place.store';
import { Entypo } from '@expo/vector-icons';
import BottomCardComponent from '../components/bottom-card/bottom-card.component';
import CreateVoyageComponent from '../components/create-voyage/create-voyage.component';
import PlacesListComponent from '../components/places-list/places-list.component';
import { PlaceObject } from '../place/object/place.object';

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

  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region>(INITIAL_REGION);
  const mapRef = useRef<null | MapView>(null);

  function openCard(): void {
    setCardOpen(true);
  }

  function closeCard(): void {
    setCardOpen(false);
  }

  function goToPlace(place: PlaceObject): void {
    setInitialRegion({ 
      latitude: place.position.lat, 
      longitude: place.position.long, 
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    closeCard();
    mapRef.current?.animateToRegion({
        latitude: place.position.lat, 
        longitude: place.position.long,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }, 1000);
  }

  useEffect(() => {
    props.placeStore.fetchGlobalPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} showsUserLocation showsPointsOfInterest={false} style={styles.map} initialRegion={INITIAL_REGION}>
        {props.placeStore.globalPlaces.map((place: Place, index: number) =>
          place.position && 
          <Marker title={place.name} key={index} coordinate={{ latitude: place.position.lat, longitude: place.position.long }}>
            <TypesIcon name={place.type.name} />
          </Marker>
        )}
      </MapView>
      <BottomNavBarComponent onBtnPressed={openCard} customIcon={<Entypo name="chevron-up" size={36} color="white" />} navigation={props.navigation} />
      <BottomCardComponent closeCard={closeCard} withShadow open={cardOpen}>
        <PlacesListComponent goToPlace={goToPlace} places={props.placeStore.globalPlaces} />
      </BottomCardComponent>
    </View>
  );
}));

export default MapScreen;