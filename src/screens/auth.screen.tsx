// React
import React, { FunctionComponent, useState, useRef } from 'react';
// Tools
import { View, Text, ImageBackground, Dimensions, Animated, KeyboardAvoidingView, Platform, Image, PanResponder, GestureResponderEvent, PanResponderGestureState} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
// Styles
import { styles } from '../style/auth.style';


type Props = {
  isLogin?: boolean;
}

const AuthScreen: FunctionComponent<Props> = (props: Props) => {

  
  const translateY = useRef(new Animated.Value(600)).current;
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  
  function animateMovement(gesture: PanResponderGestureState): void {
    translateY.setValue(gesture.dy);
  };

  function animateRelease(gesture: PanResponderGestureState): void {
    if (gesture.vy >= 0.9) {
      Animated.spring(translateY, {
        toValue: 600,
        useNativeDriver: true
      }).start();
    }
    else {
      openForm()
    }
  };

  const panResponder = PanResponder.create({
    onPanResponderMove: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      animateMovement(gesture);
    },
    onPanResponderRelease: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      animateRelease(gesture);
    },
    onMoveShouldSetPanResponder: () => true
  });

  function openForm(): void {
    Animated.spring(translateY, {
      toValue: 40,
      useNativeDriver: true
    }).start();
  }

  return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
      >
        <ImageBackground source={require('../../assets/Photo-1.jpg')} style={{ flex: 1 }}>
          <Image source={require('../../assets/Plannit-logo-blanc.png')} resizeMode='contain' style={{width: '100%', height: '10%', marginTop: 100}}/>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100}}>
            <View style={{width: Dimensions.get('screen').width * 0.75, shadowColor: "#000", 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,}}
            >
              <TouchableOpacity onPress={openForm} style={styles.btn}>
                <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#47bed8', '#ab5099']} style={{width: '100%'}}>
                  <Text style={{textAlign: 'center', paddingVertical: 15, color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold'}}>
                    Se connecter
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{width: Dimensions.get('screen').width * 0.75, shadowColor: "#000", 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,}}
            >
              <TouchableOpacity style={[styles.btn, {backgroundColor: "white"}]}>
                <Text style={{textAlign: 'center', paddingVertical: 15, fontSize: 16, fontFamily: 'Montserrat-Bold'}}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Animated.View {...panResponder.panHandlers} style={{position: 'absolute', bottom: 20, backgroundColor: 'white', width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 50, transform: [{translateY}]}}>
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 32, marginHorizontal: 50, marginVertical: 20}}>Se connecter</Text>
            <View style={{marginBottom: 32}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16, marginHorizontal: 50, marginBottom: 8}}>Identifiant</Text>
              <TextInput placeholder='toto' style={{fontFamily: 'Montserrat', fontSize: 16, marginHorizontal: 50, borderBottomWidth: 1}}/>
            </View>
            <View style={{marginBottom: 32}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16, marginHorizontal: 50, marginBottom: 8}}>Email</Text>
              <TextInput placeholder='toto' style={{fontFamily: 'Montserrat', fontSize: 16, marginHorizontal: 50, borderBottomWidth: 1}}/>
            </View>
            <View style={{marginBottom: 32}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16, marginHorizontal: 50, marginBottom: 8}}>Mot de passe</Text>
              <TextInput placeholder='toto' secureTextEntry={true} style={{fontFamily: 'Montserrat', fontSize: 16, marginHorizontal: 50, borderBottomWidth: 1}}/>
            </View >
            <View style={{marginHorizontal: 50, marginBottom: 25}}>
              <TouchableOpacity onPress={openForm} style={styles.btn}>
                <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#47bed8', '#ab5099']} style={{width: '100%'}}>
                  <Text style={{textAlign: 'center', paddingVertical: 15, color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold'}}>
                    Se connecter
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', paddingVertical: 15, fontSize: 16, fontFamily: 'Montserrat-Bold'}}>
                S'inscrire
              </Text>
            </View>
          </Animated.View>
        </ImageBackground>
      </KeyboardAvoidingView>
  );
}

export default AuthScreen;