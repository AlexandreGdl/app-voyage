import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native'
import MaskedView from '@react-native-community/masked-view';
import { Entypo } from '@expo/vector-icons';
import Theme from '../style/theme';

const size = 40

type Props = {
  name: keyof typeof Entypo.glyphMap,
  size: number,
  color: string
}

const styles = StyleSheet.create({
    shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
  })

const GradientIcon: FunctionComponent<Props> = (props: Props) => {

  return (
    <View style={{ width: size }}>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: size }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name={props.name} size={props.size} color={props.color} style={styles.shadow}/>
          </View>
        }>
        <LinearGradient
          colors={Theme.PRIMARY_GRADIENT}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
};

export default GradientIcon;