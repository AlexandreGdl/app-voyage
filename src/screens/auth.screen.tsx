// React
import React, { FunctionComponent, useState, useRef } from 'react';
// Tools
import { View, Text, ImageBackground, Animated, KeyboardAvoidingView, Platform, Image, PanResponder, GestureResponderEvent, PanResponderGestureState, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

// Styles
import { styles } from '../style/auth.style';
import ButtonComponent from '../components/button.component';
import Theme from '../style/theme';
import { UserService } from '../user/service/user.service';


type Props = {
  isLogin?: boolean;
}

const AuthScreen: FunctionComponent<Props> = (props: Props) => {

  const translateY = useRef(new Animated.Value(600)).current;
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  
  function animateMovement(gesture: PanResponderGestureState): void {
    if (gesture.dy > 0) translateY.setValue(gesture.dy);
  };

  function animateRelease(gesture: PanResponderGestureState): void {
    if (gesture.vy >= 0.9) {
      closeForm();
    }
    else {
      openForm();
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
  
  function closeForm(): void {
    Animated.spring(translateY, {
      toValue: 600,
      useNativeDriver: true
    }).start();
    Keyboard.dismiss();
  }

  async function handleLoginPressed(): Promise<void> {
    if (email && password) {
      const token = await UserService.getInstance().login({email, password});
      if (token && token.token) {
        await AsyncStorage.setItem('token', token.token.toString());
        setIsSignedIn(true);
        closeForm();
      }
    }
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
              <TextInput value={email} placeholder='Email' style={styles.formInput}/>
            </View>
            <View style={{marginBottom: 32}}>
              <Text style={styles.formLabel}>Mot de passe</Text>
              <TextInput value={password} placeholder='Mot de passe' secureTextEntry={true} style={styles.formInput}/>
            </View>
            <View style={{marginHorizontal: 50, marginBottom: 25}}>
              <ButtonComponent
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