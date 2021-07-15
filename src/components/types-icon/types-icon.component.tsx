import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, Feather} from '@expo/vector-icons';
import { PlaceTypeEnum } from '../../place/place-type.enum';
import { styles } from './types-icon.style';

type Props = {
  name: PlaceTypeEnum;
}

const TypesIcon: FunctionComponent<Props> = (props: Props) => {
    switch(props.name) {
      case PlaceTypeEnum.RESTAURANT_BAR: 
        return (
          <View style={styles.iconsRestaurant}>
            <Ionicons color="white" size={12} name='restaurant' />
          </View>
        );
      case PlaceTypeEnum.MALL: 
        return (
          <View style={styles.iconsMall}>
            <FontAwesome color="white" size={12} name='shopping-bag' />
          </View>
        );
      case PlaceTypeEnum.MONUMENTS: 
        return (
          <View style={styles.iconsMonument}>
            <FontAwesome5 name="monument" size={12} color="white" />
          </View>
        );
      case PlaceTypeEnum.POINT_OF_VIEW: 
        return (
          <View style={styles.iconsPointOfView}>
            <AntDesign color="white" size={12} name='camera' />
          </View>
        );
      case PlaceTypeEnum.SUPERMARKET: 
        return (
          <View style={styles.iconsSupermarket}>
            <Feather color="white" size={12} name='shopping-cart' />
          </View>
        );
      default:
        break;
    }
    return null;
}

export default TypesIcon;