import React, { FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Theme from "../style/theme";


type Props = {
  on: boolean;
  onPress(): void;
}

const SwitchComponent: FunctionComponent<Props> = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <LinearGradient colors={props.on ? Theme.PRIMARY_GRADIENT : ['transparent']} style={{ borderRadius: 15 }}>
        <View style={{ borderRadius: 50, width: 75, backgroundColor: props.on ? 'rgba(0, 0, 0, 0)' : '#DBDBDB', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: props.on ? 'flex-end' : 'flex-start' }}>
          <View style={{ borderRadius: 50, width: 25, height: 25, marginHorizontal: 5, backgroundColor: props.on ?  '#DBDBDB' : 'rgba(0, 0, 0, 0)' }}>
            <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={props.on ? ['transparent'] : Theme.PRIMARY_GRADIENT} style={{width: '100%', height: '100%', borderRadius: 12}} />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default SwitchComponent;