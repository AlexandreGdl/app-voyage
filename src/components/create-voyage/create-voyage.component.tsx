import React, { FunctionComponent, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native';
import { formStyles } from '../../style/form.style';
import Theme from '../../style/theme';
import ButtonComponent from '../button.component';
import InputLabelComponent from '../form/input-label.component';

type Props = {

}

const styles = StyleSheet.create({
  container: { 
    width: Dimensions.get('screen').width, 
    paddingBottom: 30, 
    paddingHorizontal: 24 
  },
  cardTitle: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 18, 
    paddingTop: 20 
  },
  reset: { 
    marginHorizontal: 0, 
    paddingLeft: 0
  },
  label: { 
    marginHorizontal: 0, 
    fontWeight: '500', 
    color: 'black' 
  },
  doubleInputContainer: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 15, 
    paddingTop: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  inputContainer: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 15, 
    paddingTop: 20,
    marginLeft: 0
  },
  btnStyle: { 
    width: '50%', 
    alignSelf: 'center', 
    marginTop: 40 
  }
});

const CreateVoyageComponent: FunctionComponent<Props> = (props: Props) => {

  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [dateDeFin, setDateDeFin] = useState<Date>(new Date());
  const [dateDeDepart, setDateDeDepart] = useState<Date>(new Date());

  function createVoyage(): void {
    // creation voyage
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Créer un nouveau voyage</Text>
      <InputLabelComponent 
          label='Destination'
          placeholder='Nom de la ville'
          labelStyle={styles.label}
          inputStyle={[styles.reset, {maxWidth: '100%' }]}
          value={destination}
          containerStyle={styles.inputContainer}
          onChangeText={(text: string): void => setDestination(text)}
        />
      <View style={styles.doubleInputContainer}>
        <InputLabelComponent 
          label='Date de départ'
          placeholder='date de départ'
          labelStyle={styles.label}
          inputStyle={[styles.reset, {maxWidth: 100 }]}
          value={dateDeFin.toDateString()}
          containerStyle={{ marginLeft: 0 }}
        />

        <InputLabelComponent 
          label='Date de fin'
          placeholder='date de fin'
          labelStyle={styles.label}
          inputStyle={[styles.reset, {maxWidth: 100 }]}
          value={dateDeFin.toDateString()}
        />
      </View>
      <ButtonComponent 
        text="Créer le voyage"
        onPress={createVoyage}
        gradient={Theme.PRIMARY_GRADIENT}
        style={styles.btnStyle}
      />
    </View>
  );  
}

export default CreateVoyageComponent;