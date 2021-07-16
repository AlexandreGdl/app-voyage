import React from "react";
import { View, Text } from "react-native";
import moment from 'moment';
import { Slate } from "../../slate/interface/slate.interface";
import { styles } from "../../style/slates.style";
import { UserStore } from "../../user/store/user.store";
import { Voyage } from "../../voyage/interface/voyage.interface";

moment.locale('fr');

type Props = {
  voyage: Voyage | null;
  userStore: UserStore;
}

const BalanceTab: React.FunctionComponent<Props> = (props: Props) => {
  
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Text style={styles.inputLabel}>FAISONS LES COMPTES ...</Text>
    </View>
  )
}

export default BalanceTab;