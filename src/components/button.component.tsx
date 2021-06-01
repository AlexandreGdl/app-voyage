import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'

type Props = {
  gradient?: string[];
  onPress?: () => void;
  style?: ViewStyle;
  text?: string;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    marginTop: 15,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center', 
    paddingVertical: 15, 
    color: 'white', 
    fontSize: 16, 
    fontFamily: 'Montserrat-Bold'
  }
});

const ButtonComponent: FunctionComponent<Props> = (props: Props) => {

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.btn, props.style]}>
      <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={props.gradient ? props.gradient : ['transparent']} style={{width: '100%'}}>
        <Text style={[styles.text, props.textStyle]}>
          <Text>{props.text}</Text>
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonComponent;