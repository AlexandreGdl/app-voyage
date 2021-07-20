// React
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// Tools
import { inject, observer } from 'mobx-react';
import { RootStackParamList } from '../root-stack-parameters-list';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, Feather} from '@expo/vector-icons';
// Styles
import { styles } from '../style/slates.style';
import { ScrollView, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { VoyageStore } from '../voyage/store/voyage.store';
import { Entypo } from '@expo/vector-icons';
import { Voyage } from '../voyage/interface/voyage.interface';
import { VoyageObject } from '../voyage/object/voyage.object';
import { RouteProp } from '@react-navigation/core';
import { UserStore } from '../user/store/user.store';
import Theme from '../style/theme';
import { TextInput } from 'react-native-gesture-handler';
import { User } from '../user/interface/user.interface';
import ButtonComponent from '../components/button.component';
import { CreateSlateDto } from '../slate/dto/create-slate.dto';
import SwitchComponent from '../components/switch.component';
import { SlateService } from '../slate/service/slate.service';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Slates'>;
  route: RouteProp<RootStackParamList, 'Slates'>;
  voyageStore: VoyageStore;
  userStore: UserStore;
}

const AddSlateScreen: FunctionComponent<Props> = inject((stores: Record<string, unknown>) => ({
  voyageStore: stores.voyageStore as VoyageStore,
  userStore: stores.userStore as UserStore,
}))(observer((props: Props) => {

  const [voyage, setVoyage] = useState<Voyage | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [userPicked, setUserPicked] = useState<string[]>([]);
  const [giving, setGiving] = useState<boolean>(true);

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

  function handleAmountChange(t: string): void {
    setAmount(parseFloat(t ? t : '0'));
  }

  function pickAll(): void {
    if (voyage && voyage.memberIds && props.userStore._id) {
      if (userPicked.length === voyage.memberIds.length) {
        setUserPicked([]);
      } else {
        const newUserPicked = [...voyage.memberIds, voyage.ownerId];
        const myIndex = newUserPicked.indexOf(props.userStore._id);
        newUserPicked.splice(myIndex, 1);
        setUserPicked(newUserPicked);
      }
    }
  }

  function pickUser(id: string): void {
    const oldUserPicked = [...userPicked];
    const userIndex = oldUserPicked.indexOf(id);
    if (userIndex === -1) {
      if (oldUserPicked.length === 1 && giving) {
        setUserPicked([id]);
      } else {
        const newUserPicked = [...userPicked, id];
        setUserPicked(newUserPicked);
      }
    } else {
      oldUserPicked.splice(userIndex, 1);
      setUserPicked(oldUserPicked);
    }
  }

  async function createSlate(): Promise<void> {
    console.log('toto');
    if (title && title.length > 3 && amount > 0 && userPicked.length > 0 && props.userStore._id) {
      const createSlateDto: CreateSlateDto = {
        title: title.toUpperCase(),
        amount,
        recipientId: giving ? userPicked[0] : props.userStore._id,
        voyageId: props.route.params.voyageId,
        multipleDonorIds: giving ? [props.userStore._id] : [...userPicked]
      };

      await SlateService.getInstance().createSlate(createSlateDto);
      await props.voyageStore.fetchAllVoyage();
      props.navigation.goBack();
    }
  }

  function handleSwitch(): void {
    setGiving(!giving);
    if (giving) {
      setUserPicked([]);
    }
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
        <View style={[styles.blueContainer, { backgroundColor: '#fff', paddingHorizontal: Theme.PAGE_PADDING_HORIZONTAL }]}>
          <View style={styles.containerTopGrey} />
          <Text style={styles.inputLabel}>MONTANT</Text>
          <TextInput style={styles.input} value={amount.toString()} onChangeText={(t: string) => handleAmountChange(t)} keyboardType="number-pad" />
          
          <Text style={styles.inputLabel}>INTITULÉ</Text>
          <TextInput style={styles.input} placeholder="Ex: Restaurant" value={title?.toUpperCase()} onChangeText={(t: string) => setTitle(t)} />

          <View style={{ flexDirection: 'row', width: '50%', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
            <Text style={[styles.inputLabel, { marginTop: 0, marginRight: 10 }]}>JE DONNE ?</Text>
            <SwitchComponent onPress={handleSwitch} on={giving} />
          </View>

          <Text style={styles.inputLabel}>{giving ? 'JE DOIS À' : 'ILS ME DOIVENT'}</Text>

          {voyage && voyage.memberIds && voyage.memberIds.length > 0 && !giving && <TouchableOpacity style={styles.selectAll} onPress={pickAll}>
            <View style={styles.selectAllContainer}>
              <Text style={[styles.inputLabel, styles.customLabel]}>Tout le monde</Text>
              <View style={[styles.iconContainer, { borderWidth: userPicked.length === (voyage.memberIds.length) ? 0 : 1, backgroundColor: userPicked.length === (voyage.memberIds.length) ? Theme.BLUE_BG : '#fff'}]}>
                <Ionicons name="checkmark" size={20} color={userPicked.length === (voyage.memberIds.length) ? '#fff' : '#333'} />
              </View>
            </View>
          </TouchableOpacity>}

          <View style={styles.limiter} />

          {voyage && voyage.memberIds && <View style={{ width: '90%', marginTop: 30 }}>
            {voyage.ownerId !== props.userStore._id && <View style={styles.itemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.icon}>
                  <Text>{voyage.owner.username.slice(0, 2).toUpperCase()}</Text>
                </View>
                <Text style={[styles.inputLabel, styles.customLabel, { marginLeft: 10}]}>{voyage.owner.username}</Text>
              </View>
              <TouchableOpacity onPress={(): void => pickUser(voyage.owner._id)}>
                <View style={[styles.iconContainer, { borderWidth: userPicked.indexOf(voyage.owner._id) !== -1 ? 0 : 1, backgroundColor: userPicked.indexOf(voyage.owner._id) !== -1 ? Theme.BLUE_BG : '#fff'}]}>
                  <Ionicons name="checkmark" size={20} color={userPicked.indexOf(voyage.owner._id) !== -1 ? '#fff' : '#333'} />
                </View>
              </TouchableOpacity>
            </View>}
            {voyage.members.map((member: User) => 
              member._id !== props.userStore._id && <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.icon}>
                    <Text>{member.username.slice(0, 2).toUpperCase()}</Text>
                  </View>
                  <Text style={[styles.inputLabel, styles.customLabel, { marginLeft: 10}]}>{member.username}</Text>
                </View>
                  <TouchableOpacity onPress={(): void => pickUser(member._id)}>
                    <View style={[styles.iconContainer, { borderWidth: userPicked.indexOf(member._id) !== -1 ? 0 : 1, backgroundColor: userPicked.indexOf(member._id) !== -1 ? Theme.BLUE_BG : '#fff'}]}>
                      <Ionicons name="checkmark" size={20} color={userPicked.indexOf(member._id) !== -1 ? '#fff' : '#333'} />
                    </View>
                  </TouchableOpacity>
              </View>
            )}
          </View>}

        </View>
      </ScrollView>
      {userPicked .length > 0 && <TouchableOpacity onPress={createSlate} style={{ position: 'absolute', width: 120, padding: 10, bottom: 30, left: (Dimensions.get('screen').width / 2) - 60 }}>
        <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={Theme.PRIMARY_GRADIENT} style={{ borderRadius: 20 }}>
          <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 15, color: 'white', paddingVertical: 10 }}>Valider</Text>
        </LinearGradient>
      </TouchableOpacity>}
    </View>
  );
}));

export default AddSlateScreen;