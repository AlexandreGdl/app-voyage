import React from "react";
import { View, Text } from "react-native";
import moment from 'moment';
import { Slate } from "../../slate/interface/slate.interface";
import { styles } from "../../style/slates.style";
import { UserStore } from "../../user/store/user.store";
import { Voyage } from "../../voyage/interface/voyage.interface";
import Theme from "../../style/theme";

moment.locale('fr');

type Props = {
  voyage: Voyage | null;
  userStore: UserStore;
}

const TravellersTab: React.FunctionComponent<Props> = (props: Props) => {
  
  return (
    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL }}>
      <Text style={[styles.inputLabel, { color: 'white' }]}>VOICI LES PARTICIPANTS ...</Text>
    </View>
  )
}

export default TravellersTab;