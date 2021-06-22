import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, ViewStyle, TextStyle, View, Dimensions } from 'react-native'

type Props = {
  gradient?: string[];
  onPress?: () => void;
  style?: ViewStyle;
  text?: string;
  textStyle?: TextStyle;
  children?: ReactNode;
  childrenStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginTop: 15,
    overflow: 'hidden',
    width: (Dimensions.get('screen').width/2) - 36,
    height: (Dimensions.get('screen').width/2) - 36,
  },
  text: {
    textAlign: 'center', 
    paddingVertical: 10, 
    fontSize: 16, 
    fontFamily: 'Montserrat-Bold'
  },
  linearGradient : {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const FeatureCard: FunctionComponent<Props> = (props: Props) => {

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.card, props.style]} >
      <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={props.gradient ? props.gradient : ['transparent']} style={styles.linearGradient}>
        {props.children && <View style={props.childrenStyle}>{props.children}</View>}
        {props.text && <Text style={[styles.text, props.textStyle]}>{props.text}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FeatureCard;