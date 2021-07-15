import { inject, observer } from 'mobx-react';
import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Emoji from 'react-native-emoji';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CitiesService } from '../../city/cities.service';
import { City } from '../../city/interface/city.interface';
import Theme from '../../style/theme';
import { CreateVoyageDto } from '../../voyage/dto/create-voyage.dto';
import { VoyageService } from '../../voyage/service/voyage.service';
import { VoyageStore } from '../../voyage/store/voyage.store';
import ButtonComponent from '../button.component';
import InputLabelComponent from '../form/input-label.component';

type Props = {
  onVoyageCreated: () => void;
  voyageStore: VoyageStore,  
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
  },
  country: {
    fontWeight: '400', 
    fontSize: 18, 
    marginBottom: 8, 
    marginLeft: 15 
  }
});

const CreateVoyageComponent: FunctionComponent<Props> = (props: Props) => {

  const [city, setCity] = useState<City | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [notFound, setNotFound] = useState<boolean>(false);
  const [displayPicker, setDisplayPicker] = useState<boolean>(false);
  const [startMode, setStartMode] = useState<boolean>(true);
  const [dateError, setDateError] = useState<boolean>(false);

  async function findGoodCity(): Promise<void> {
    if (destination) {
      const cityFromAPI = await CitiesService.getInstance().getCity(destination);
      if (cityFromAPI) {
        setDestination(cityFromAPI?.name);
        setCity(cityFromAPI);
        setNotFound(false);
      } else {
        setNotFound(true)
      }
    }
  }

  async function createVoyage(): Promise<void> {
    if (startDate > endDate) {
      setDateError(true);
      console.log('toto');
      return;
    }
    if (destination && city && !notFound) {
      const newVoyage: CreateVoyageDto = {
        name: `${destination}, ${city.country}`,
        defaultName: `${destination}, ${city.country}`,
        cityName: `${destination}, ${city.country}`,
        location: {
          long: city.position.longitude,
          lat: city.position.latitude,
        },
        startDate,
        endDate
      }

      const myVoyage = await VoyageService.getInstance().createVoyage(newVoyage);
      await props.voyageStore.fetchAllVoyage();
      
      if (myVoyage) {
        props.onVoyageCreated();
      }
    }
  }

  function handleDisplayDate(isStartingDay: boolean): void {
    setDisplayPicker(!displayPicker);
    setStartMode(isStartingDay);
  }

  function handleConfirm(date: Date): void {
    if (startMode) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDisplayPicker(false);
  }

  function getMinimumDate(): Date {
    if (!startMode) {
      return startDate; 
    }
    return new Date();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Créer un nouveau voyage</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', maxWidth: '100%' }}>
        <InputLabelComponent 
          label='Destination'
          placeholder='Nom de la ville'
          labelStyle={styles.label}
          inputStyle={[styles.reset, {maxWidth: '100%' }]}
          value={destination}
          containerStyle={styles.inputContainer}
          onChangeText={(text: string): void => setDestination(text)}
        />

        {city && !notFound && <Text style={styles.country}>
          Pays : {city.country} <Emoji name={`flag-${city.country.toLowerCase()}`} />
        </Text>}
        {notFound && <Text style={[styles.country, { color: 'red', maxWidth: 200 }]}>
          Ville non trouvé, vérifiez l'orthographe
        </Text>}
      </View>
      <View style={styles.doubleInputContainer}>
        <TouchableOpacity onPress={(): void => handleDisplayDate(true)}>
          <View style={{ paddingBottom: 7, borderBottomColor: '#333', borderBottomWidth: 1.5, paddingRight: 5 }}>
            <Text style={[styles.label, { marginBottom: 18 }]}>Date de départ</Text>
            <Text style={[styles.reset, {maxWidth: 150, fontSize: 16 }]}>{startDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={(): void => handleDisplayDate(false)}>
          <View style={{ paddingBottom: 7, borderBottomColor: '#333', borderBottomWidth: 1.5, paddingRight: 5 }}>
            <Text style={[styles.label, { marginBottom: 18 }, dateError && { color: 'red' }]}>Date de fin</Text>
            <Text style={[styles.reset, {maxWidth: 150, fontSize: 16 }, dateError && { color: 'red' }]}>{endDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={displayPicker}
        mode="date"
        minimumDate={getMinimumDate()}
        onConfirm={handleConfirm}
        onCancel={(): void => setDisplayPicker(false)}
      />
      <ButtonComponent 
        text={city && city.name === destination ? 'Créer le voyage' : 'Trouver la ville'}
        onPress={city && city.name === destination ? createVoyage : findGoodCity}
        gradient={Theme.PRIMARY_GRADIENT}
        style={styles.btnStyle}
      />
    </View>
  );  
};

export default CreateVoyageComponent;