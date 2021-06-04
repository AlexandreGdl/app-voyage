import React, { FunctionComponent } from 'react';
import { TextInput, View, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';
import { formStyles } from '../../style/form.style';

type Props = {
  label: string;
  onChangeText?: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle;
  value: string | undefined;
  placeholder?: string;
}

const styles = StyleSheet.create({
  label: { 
    marginHorizontal: 0, 
    fontWeight: '500', 
    color: 'black' 
  },
});

const InputLabelComponent: FunctionComponent<Props> = (props: Props) => {

  return (
    <View style={[{ marginLeft: 20 }, props.containerStyle]}>
      <Text style={[formStyles.formLabel, props.labelStyle]}>{props.label}</Text>
      <TextInput autoCorrect={false} autoCompleteType="off" onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} style={[formStyles.formInput, props.inputStyle]}/>
    </View>
  )
}

export default InputLabelComponent;