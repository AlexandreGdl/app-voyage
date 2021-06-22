import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';
import { CitiesService } from '../../city/cities.service';
import { City } from '../../city/interface/city.interface';
import Theme from '../../style/theme';
import { CreateVoyageDto } from '../../voyage/dto/create-voyage.dto';
import { VoyageService } from '../../voyage/service/voyage.service';
import ButtonComponent from '../button.component';
import InputLabelComponent from '../form/input-label.component';

type Props = {
  onVoyageCreated: () => void;
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
    color: 'black',
    marginBottom: 15
  },
  inputContainer: { 
    alignSelf: 'center', 
    paddingHorizontal: 15, 
    paddingTop: 20,
    marginLeft: 0
  },
  btnStyle: { 
    width: '50%', 
    alignSelf: 'center', 
    marginTop: 40 
  },
  country: {
    fontWeight: '400', 
    fontSize: 18, 
    marginBottom: 8, 
    marginLeft: 15 
  }
});

const AddTravellerComponent: FunctionComponent<Props> = (props: Props) => {

  const [identifiant, setIdentifiant] = useState<string | undefined>(undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Ajouter un voyageur</Text>
      <View style={{ maxWidth: '100%' }}>
        <InputLabelComponent 
          label='Par identifiant'
          placeholder='@identifiant'
          labelStyle={styles.label}
          inputStyle={[styles.reset, {maxWidth: '100%' }]}
          value={identifiant}
          containerStyle={styles.inputContainer}
        />
      </View>
      <ButtonComponent 
        text="Ajouter"
        gradient={Theme.PRIMARY_GRADIENT}
        style={styles.btnStyle}
      />
    </View>
  );  
}

export default AddTravellerComponent;