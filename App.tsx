import React from 'react';
import AuthScreen from './src/screens/auth.screen';
import { useFonts } from 'expo-font';

export default function App() {
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

  if (!loaded ) return null;
  
  return <AuthScreen />;
}