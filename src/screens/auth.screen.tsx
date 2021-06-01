// React
import React, { FunctionComponent, useState, useRef } from 'react';
// Tools
import { View, Text, ImageBackground, Dimensions, Animated, KeyboardAvoidingView, Platform, Image, PanResponder, GestureResponderEvent, PanResponderGestureState} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
// Styles
import { styles } from '../style/auth.style';
import ButtonComponent from '../components/button.component';
import Theme from '../style/theme';


type Props = {
  isLogin?: boolean;
}

const AuthScreen: FunctionComponent<Props> = (props: Props) => {

  const translateY = useRef(new Animated.Value(600)).current;
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  
  function animateMovement(gesture: PanResponderGestureState): void {
    if (gesture.dy > 0) translateY.setValue(gesture.dy);
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
          <Image source={require('../../assets/Plannit-logo-blanc.png')} resizeMode='contain' style={styles.image}/>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}
            >
              <ButtonComponent
                onPress={openForm}
                gradient={Theme.PRIMARY_GRADIENT}
                text="Se connecter"
              />
            </View>
            <View style={styles.buttonContainer}
            >

              <ButtonComponent
                onPress={openForm}
                style={{ backgroundColor: 'white' }}
                text="S'inscrire"
                textStyle={{ color: 'black' }}
              />
            </View>
          </View>
          
          <Animated.View {...panResponder.panHandlers} style={[styles.formContainer, {transform: [{translateY}]}]}>
            <Text style={styles.formTitle}>Se connecter</Text>
            <View style={{marginBottom: 32}}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput placeholder='Email' style={styles.formInput}/>
            </View>
            <View style={{marginBottom: 32}}>
              <Text style={styles.formLabel}>Mot de passe</Text>
              <TextInput placeholder='Mot de passe' secureTextEntry={true} style={styles.formInput}/>
            </View>
            <View style={{marginBottom: 32}}>
              <Text style={styles.formLabel}>Date de naissance</Text>
              <TextInput placeholder='Date de naissance' style={styles.formInput}/>
            </View >
            <View style={{marginHorizontal: 50, marginBottom: 25}}>
              <ButtonComponent
                onPress={openForm}
                gradient={Theme.PRIMARY_GRADIENT}
                text="Se connecter"
              />
              <Text style={styles.changeFormText}>
                S'inscrire
              </Text>
            </View>
          </Animated.View>
        </ImageBackground>
      </KeyboardAvoidingView>
  );
}

export default AuthScreen;