import React, { useEffect, useState } from 'react';
import AuthScreen from './src/screens/auth.screen';
import { useFonts } from 'expo-font';
import { Provider } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/home.screen';
import { RootStackParamList } from './src/root-stack-parameters-list';
import MapScreen from './src/screens/map.screen';
import { PlaceStore } from './src/place/store/place.store';
import VoyageScreen from './src/screens/voyage.screen';
import WidgetsScreen from './src/screens/widgets.screen';
import { WidgetStore } from './src/widget/store/widget.store';


const StackNavigator = createStackNavigator<RootStackParamList>();

export default function App() {

  const [placeStore] = useState<PlaceStore>(new PlaceStore());
  const [widgetStore] = useState<WidgetStore>(new WidgetStore());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loaded] = useFonts({
    // Montserrat Font
    'Montserrat': {
      uri: require('./assets/fonts/Montserrat-Regular.ttf')
    },
    
    'Montserrat-Medium': {
      uri: require('./assets/fonts/Montserrat-Medium.ttf')
    },

    'Montserrat-Medium-Italic': {
      uri: require('./assets/fonts/Montserrat-MediumItalic.ttf')
    },

    'Montserrat-Bold': {
      uri: require('./assets/fonts/Montserrat-Bold.ttf')
    },

    //Mukta Vaani Font
    'MuktaVaani': {
      uri: require('./assets/fonts/MuktaVaani-Regular.ttf')
    },

    'MuktaVaani-Medium': {
      uri: require('./assets/fonts/MuktaVaani-Medium.ttf')
    },

    'MuktaVaani-Bold': {
      uri: require('./assets/fonts/MuktaVaani-Bold.ttf')
    },
  });

  async function getUser(): Promise<void> {
    const token = await AsyncStorage.getItem('token');

    if (token) setIsLoggedIn(true);
  }

  function getInitialRouteName(): keyof RootStackParamList | undefined {
    if (isLoggedIn) return 'Home';
    return 'Auth';
  }

  async function getWidgets(): Promise<void> {
    await widgetStore.fetchWidgets();
  }
  
  useEffect(() => {
    (async () => {
      await getUser();
      if (isLoggedIn) await getWidgets();
    })();
  }, []);
  
  if (!loaded ) return null;
  
  return (
    <Provider
      placeStore={ placeStore }
      widgetStore={ widgetStore }
    >
      <NavigationContainer>
        <StackNavigator.Navigator initialRouteName={getInitialRouteName()}>
          <StackNavigator.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <StackNavigator.Screen name="Home" options={{ headerShown: false, animationEnabled: false }} component={HomeScreen} />
          <StackNavigator.Screen name="Map" options={{ headerShown: false, animationEnabled: false }} component={MapScreen} />
          <StackNavigator.Screen name="Voyage" options={{ headerShown: false }} component={VoyageScreen} />
          <StackNavigator.Screen name="Widgets" options={{ headerShown: false }} component={WidgetsScreen} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}