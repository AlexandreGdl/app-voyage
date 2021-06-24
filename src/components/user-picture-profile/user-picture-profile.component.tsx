// React
import React, { FunctionComponent } from 'react';
// Tools
import { View, Text, StyleProp, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import 'moment/locale/fr';
import { styles } from './user-picture-profile.style';
import { User } from '../../user/interface/user.interface';

moment.locale('fr');

type Props = {
  isActive: boolean;
  user: User;
}

const UserPictureProfile: FunctionComponent<Props> = (props) => {
  if(props.isActive) {
    return(
      <LinearGradient
        colors={props.isActive ? ['#43BED8', '#A45FA1'] : ['transparent', 'transparent']}
        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
        style={styles.linearBorder}
      >
        <View key={props.user._id} style={styles.pictureProfile}>
            <Text style={styles.textPictureProfile}>{props.user.username.slice(0, 2).toUpperCase()}</Text>
        </View>
      </LinearGradient>
    )
  };
  return(
    <View key={props.user._id} style={styles.pictureProfile}>
      <Text style={styles.textPictureProfile}>{props.user.username.slice(0, 2).toUpperCase()}</Text>
    </View>
  )
};

export default UserPictureProfile;