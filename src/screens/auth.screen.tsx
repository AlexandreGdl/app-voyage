// React
import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
// Tools
import { View, Text, ImageBackground, Animated, KeyboardAvoidingView, Platform, Image, PanResponder, GestureResponderEvent, PanResponderGestureState, Keyboard} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

// Styles
import { styles } from '../style/auth.style';
import { formStyles } from '../style/form.style';
import ButtonComponent from '../components/button.component';
import Theme from '../style/theme';
import { UserService } from '../user/service/user.service';
import { emailIsValid, isPhoneNumberValid } from '../common/utils';


type Props = {
  isLogin?: boolean;
}

const AuthScreen: FunctionComponent<Props> = (props: Props) => {

  const translateY = useRef(new Animated.Value(600)).current;
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [error, setError] = useState<{ email: string | undefined, phoneNumber: string | undefined }>({ email: undefined, phoneNumber: undefined});

  const maxHeight = useRef(new Animated.Value(480)).current;
  
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

  function openForm(toLogin = true): void {
    Animated.spring(translateY, {
      toValue: 40,
      useNativeDriver: true
    }).start();
  }
  
  function closeForm(): void {
    Keyboard.dismiss();
    Animated.spring(translateY, {
      toValue: 1000,
      useNativeDriver: true
    }).start();
  }

  async function handleLoginPressed(): Promise<void> {
    if (email && password) {
      const token = await UserService.getInstance().login({email, password});
      if (token && token.token) {
        await AsyncStorage.setItem('token', token.token.toString());
        closeForm();
      }
    }
  }

  async function handleSignUpPressed(): Promise<void> {
    if (email && password && phoneNumber && username && !error.email && !error.phoneNumber) {
      const token = await UserService.getInstance().signup({email, password, phoneNumber, username});
      if (token && token.token) {
        await AsyncStorage.setItem('token', token.token.toString());
        closeForm();
      }
    }
  }

  function toggleMode(): void {
    setIsSignIn(!isSignIn);
  }

  function checkEmail(): void {
    let isValid = false;
    if (email) isValid = emailIsValid(email);
    const { phoneNumber } = {...error};
    setError({ email: isValid ? undefined : 'Mauvais format', phoneNumber });
  }

  function checkPhoneNumber(): void {
    let isValid = false;
    if (phoneNumber) isValid = isPhoneNumberValid(phoneNumber);
    const { email } = {...error};
    setError({ email, phoneNumber: isValid ? undefined : 'Mauvais format' });
  }

  return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
      >
        <ImageBackground source={require('../../assets/Photo-1.jpg')} style={{ flex: 1 }}>
          <Image source={require('../../assets/Plannit-logo-blanc.png')} resizeMode='contain' style={styles.image}/>
          {
            props.isLogin ? 
            <View style={{ alignItems: 'center' }} >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>Connecté</Text>
            </View>:
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  onPress={() => {
                    openForm();
                    setIsSignIn(false);
                  }}
                  gradient={Theme.PRIMARY_GRADIENT}
                  text="Se connecter"
                />
              </View>
            <View style={styles.buttonContainer}>
              <ButtonComponent
                onPress={() => {
                  openForm();
                  setIsSignIn(true);
                }}
                style={{ backgroundColor: 'white' }}
                text="S'inscrire"
                textStyle={{ color: 'black' }}
              />
            </View>
          </View>
          }
          
          <Animated.View {...panResponder.panHandlers} style={[ formStyles.formContainer, {transform: [{translateY}]}]}>
            <Text style={ formStyles.formTitle}>{isSignIn ? "S'inscrire" : "Se connecter"}</Text>
            <View style={{marginBottom: 32}}>
              <Text style={[ formStyles.formLabel, { color: error.email ? 'red' : 'grey' }]}>Email</Text>
              <TextInput autoCorrect={false} autoCompleteType="off" keyboardType="email-address" onBlur={checkEmail} onChangeText={(t): void => setEmail(t)} value={email} placeholder='Email' style={[ formStyles.formInput, { borderColor: error.email ? 'red' : 'black' }]}/>
            </View>
            {isSignIn && <View style={{marginBottom: 32}}>
              <Text style={ formStyles.formLabel}>Nom d'utilisateur</Text>
              <TextInput autoCorrect={false} autoCompleteType="off" value={username} onChangeText={(t): void => setUsername(t)} placeholder='Username' style={ formStyles.formInput}/>
            </View>}
            <View style={{marginBottom: 32}}>
              <Text style={ formStyles.formLabel}>Mot de passe</Text>
              <TextInput autoCorrect={false} autoCompleteType="off" value={password} onChangeText={(t): void => setPassword(t)} placeholder='Mot de passe' secureTextEntry={true} style={ formStyles.formInput}/>
            </View>
            {isSignIn && <View style={{marginBottom: 32}}>
              <Text style={[ formStyles.formLabel, { color: error.phoneNumber ? 'red' : 'grey' }]}>Numéro de téléphone</Text>
              <TextInput autoCorrect={false} autoCompleteType="off" value={phoneNumber} onBlur={checkPhoneNumber} onChangeText={(t): void => setPhoneNumber(t)} placeholder='Numéro de téléphone' style={[ formStyles.formInput, { borderColor: error.phoneNumber ? 'red' : 'black' }]}/>
            </View>}
            <View style={{marginHorizontal: 50, marginBottom: 25}}>
              <ButtonComponent
                onPress={isSignIn ? handleSignUpPressed : handleLoginPressed}
                gradient={Theme.PRIMARY_GRADIENT}
                text={isSignIn ? "S'inscrire" : "Se connecter"}
              />
              <TouchableOpacity onPress={toggleMode}>
                <Text style={[styles.changeFormText, { fontSize: 14, fontWeight: '300' }]}>
                  {isSignIn ? "Se connecter" : "S'inscrire"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ImageBackground>
      </KeyboardAvoidingView>
  );
}

export default AuthScreen;