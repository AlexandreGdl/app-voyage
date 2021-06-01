// React
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
// Tools
import { Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/map.style';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'MarkerDetail'>
  route: RouteProp<RootStackParamList, 'MarkerDetail'>,
}

const MarkerDetailScreen: FunctionComponent<Props> = (props: Props) => {

  const { marker } = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{marker.position.latitude}</Text>
      <Text>{marker.position.longitude}</Text>
    </SafeAreaView>
  );
}

export default MarkerDetailScreen;
