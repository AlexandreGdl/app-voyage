import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export enum IconTypeEnum {
  RESTAURANT = 'Restaurant'
}

type Props = {
  name: IconTypeEnum;
}

const TypesIcon: FunctionComponent<Props> = (props: Props) => {
    switch(props.name) {
      case IconTypeEnum.RESTAURANT: 
        return (
          <View style={{ borderRadius: 50, borderWidth: 1, borderColor: 'red', padding: 10 }}>
            <Ionicons color="red" size={25} name="cart-outline" />
          </View>
        );
      default:
        break;
    }
    return null;
}

export default TypesIcon;