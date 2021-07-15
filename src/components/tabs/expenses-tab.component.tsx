import React from "react";
import { View, Text } from "react-native";
import moment from 'moment';
import { Slate } from "../../slate/interface/slate.interface";
import { styles } from "../../style/slates.style";
import { UserStore } from "../../user/store/user.store";
import { Voyage } from "../../voyage/interface/voyage.interface";
import { VoyageObject } from "../../voyage/object/voyage.object";

moment.locale('fr');

type Props = {
  voyage: Voyage | null;
  userStore: UserStore;
}

const ExpensesTab: React.FunctionComponent<Props> = (props: Props) => {

  const today = new Date();

  function getTotalSlatesAmount(): number {
    let amount = 0;
    if (props.voyage) {
      props.voyage.slates.forEach((slate: Slate) => {
        amount += slate.amount;
      });
    }
    return amount;
  }

  function getUserAmount(): number {
    let amount = 0;
    if (props.voyage) {
      props.voyage.slates.forEach((salte: Slate) => {
        if (salte.donorId === props.userStore._id) amount += salte.amount;
      })
    }
    return amount;
  }
  
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.headerBox}>
        <Text style={styles.greyText}>Total</Text>
        <Text style={styles.priceTotal}>{getTotalSlatesAmount()}€</Text>
        <Text style={styles.greyText}>Mes dépenses: {getUserAmount()}€</Text>
      </View>

      <Text style={styles.date}>{moment(today).format('dddd Do MMMM YYYY').toUpperCase()}</Text>
      <View style={styles.slateBox}>
        {props.voyage && props.voyage.slates.map((slate: Slate, index: number) => (
          <View key={slate._id} style={[styles.slateContainer, { marginBottom: props.voyage && props.voyage.slates.length > index + 1 ? 15 : 0 }]}>
            <View>
              {/* Title.toUpperCase() */}
              <Text style={styles.slateTitle}>{slate.title.toUpperCase()}</Text>
              {/* Donor name */}
              <Text style={styles.slateBy}>Payé par {slate.donorUser.username} {slate.donorId === props.userStore._id && '(Moi)'}</Text>
            </View>
            {/* Slate Amount */}
            <Text style={styles.slatePrice}>{slate.amount}€</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ExpensesTab;