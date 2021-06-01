// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useState } from 'react';
// Tools
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/map.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Map'>
}

export interface MarkerType {
  position: {
    longitude: number;
    latitude: number;
  }
} 

const MapScreen: FunctionComponent<Props> = (props: Props) => {

  const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [markers, setMarkers] = useState<MarkerType[]>([{
    position: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  }]); 


  function handleMapPressed(event: MapEvent): void {
    const { coordinate } = event.nativeEvent;
    const marker = { position: coordinate };
    setMarkers([...markers, marker]);
  }

  function handleMarkerPressed(marker: MarkerType): void {
    props.navigation.navigate('MarkerDetail', { marker });
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView onPress={handleMapPressed} style={styles.map} initialRegion={INITIAL_REGION}>
        {markers.map((marker, index: number) => <Marker
          coordinate={marker.position}
          draggable
          key={index}
          onPress={() => handleMarkerPressed(marker)}
        >
        </Marker>)}
      </MapView>

      <BottomNavBarComponent navigation={props.navigation} />
    </SafeAreaView>
  );
}

export default MapScreen;