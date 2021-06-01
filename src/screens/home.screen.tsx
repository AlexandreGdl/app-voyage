// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
// Tools
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import { RootStackParamList } from '../root-stack-parameters-list';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: FunctionComponent<Props> = (props: Props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>HOME</Text>
      <BottomNavBarComponent navigation={props.navigation} />
    </SafeAreaView>
  );
}

export default HomeScreen;