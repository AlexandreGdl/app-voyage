import React, { Component, useEffect, useState } from 'react';
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
import { VoyageStore } from './src/voyage/store/voyage.store';
import { UserService } from './src/user/service/user.service';
import { UserStore } from './src/user/store/user.store';
import { useNavigation } from '@react-navigation/native';
import BottomNavBarComponent from './src/components/bottom-navbar/bottom-navbar.component';
import TravellerScreen from './src/screens/traveller.screen';
import SlatesScreen from './src/screens/slates.screen';
import ProfileScreen from './src/screens/profile.screen';


const StackNavigator = createStackNavigator<RootStackParamList>();

export default function App() {

  const [placeStore] = useState<PlaceStore>(new PlaceStore());
  const [widgetStore] = useState<WidgetStore>(new WidgetStore());
  const [userStore] = useState<UserStore>(new UserStore());
  const [voyageStore] = useState<VoyageStore>(new VoyageStore());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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

    if (token) {
      const user = await UserService.getInstance().getUserConnected();
      if (user) {
        userStore.initUser(user);
        setIsLoggedIn(true);
      }
    }
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
      if (isLoggedIn) {
        await getWidgets();
      }
      setLoading(false);
    })();
  }, []);
  
  if (!loaded || loading) return null;
  
  return (
    <Provider
      placeStore={ placeStore }
      widgetStore={ widgetStore }
      voyageStore={ voyageStore }
      userStore={ userStore }
    >
      <NavigationContainer>
        <StackNavigator.Navigator initialRouteName={getInitialRouteName()}>
          <StackNavigator.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <StackNavigator.Screen name="Home" options={{ headerShown: false, animationEnabled: false }} component={HomeScreen} />
          <StackNavigator.Screen name="Slates" options={{ headerShown: false }} component={SlatesScreen} />
          <StackNavigator.Screen name="Map" options={{ headerShown: false, animationEnabled: false }} component={MapScreen} />
          <StackNavigator.Screen name="Profile" options={{ headerShown: false, animationEnabled: false }} component={ProfileScreen} />
          <StackNavigator.Screen name="Voyage" options={{ headerShown: false }} component={VoyageScreen} />
          <StackNavigator.Screen name="Traveller" options={{ headerShown: false }} component={TravellerScreen} />
          <StackNavigator.Screen name="Widgets" options={{ headerShown: false }} component={WidgetsScreen} />
        </StackNavigator.Navigator>

      </NavigationContainer>
    </Provider>
  );
}