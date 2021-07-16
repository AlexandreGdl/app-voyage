// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
// Tools
import { inject, observer } from 'mobx-react';
import { RootStackParamList } from '../root-stack-parameters-list';
// Styles
import { styles } from '../style/slates.style';
import { PlaceStore } from '../place/store/place.store';
import { ScrollView, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Entypo } from '@expo/vector-icons';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { RouteProp } from '@react-navigation/core';
import { Slate } from '../slate/interface/slate.interface';
import Theme from '../style/theme';
import { UserStore } from '../user/store/user.store';
import ExpensesTab from '../components/tabs/expenses-tab.component';
import ButtonComponent from '../components/button.component';
import BottomNavBarComponent from '../components/bottom-navbar/bottom-navbar.component';
import BalanceTab from '../components/tabs/balance-tab.component';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Slates'>;
  route: RouteProp<RootStackParamList, 'Slates'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}

enum Tab {
  EXPENSES = 'expenses',
  BALANCE = 'balance',
  TRAVELLERS = 'travellers'
}

const SlatesScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => {

  const [voyage, setVoyage] = useState<Voyage | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.EXPENSES);

  function goBack(): void {
    props.navigation.goBack();
  }

  function getVoyageFromStore(): void {
    const newVoyage = props.voyageStore.usersVoyage.find((toFind: VoyageObject) => toFind._id === props.route.params.voyageId);
    if (newVoyage) {
      setVoyage(newVoyage.toJS());
    } else {
      props.navigation.goBack();
    }
  }

  function addSlate(): void {
    props.navigation.navigate('AddSlate', { voyageId: props.route.params.voyageId });
  }

  useEffect(() => {
    getVoyageFromStore();
  }, [props.voyageStore.usersVoyage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
            <Image source={require('../../assets/plannit-1.png')} resizeMode='contain' style={styles.logo}/>
        </View>
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
          <Entypo name="chevron-left" size={36} color="grey" />
          <Text style={styles.goBackText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.widgetTitle}>Ardoise</Text>
        <View style={styles.blueContainer}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={(): void => setActiveTab(Tab.EXPENSES)}>
              <View style={[styles.headerBtnItem, activeTab === Tab.EXPENSES && { backgroundColor: Theme.SLATE_BTN_BG }]}>
                <Text style={styles.headerBtn}>Dépenses</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={(): void => setActiveTab(Tab.BALANCE)}>
              <View style={[styles.headerBtnItem, activeTab === Tab.BALANCE && { backgroundColor: Theme.SLATE_BTN_BG }]}>
                <Text style={styles.headerBtn}>Équilibre</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={(): void => setActiveTab(Tab.TRAVELLERS)}>
              <View style={[styles.headerBtnItem, activeTab === Tab.TRAVELLERS && { backgroundColor: Theme.SLATE_BTN_BG }]}>
                <Text style={styles.headerBtn}>Voyageurs</Text>
              </View>
            </TouchableOpacity>
          </View>
          {activeTab === Tab.EXPENSES && <ExpensesTab voyage={voyage} userStore={props.userStore} />}
          {activeTab === Tab.BALANCE && <BalanceTab voyage={voyage} userStore={props.userStore} />}
          {activeTab === Tab.TRAVELLERS && <ExpensesTab voyage={voyage} userStore={props.userStore} />}
        </View>
      </ScrollView>
      {activeTab === Tab.EXPENSES && 
      <View style={styles.btnAddExpenses}>
        <ButtonComponent onPress={addSlate} gradient={Theme.PRIMARY_GRADIENT} childrenStyle={{padding: 15 }}>
          <Entypo name="plus" size={36} color="white" />
        </ButtonComponent>
      </View>}
      <BottomNavBarComponent hideBtn={true} navigation={props.navigation} />
    </View>
  );
}));

export default SlatesScreen;