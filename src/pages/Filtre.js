import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';
import NewActivity from './NewActivity';

const Filtre = () => {
  let objTakvim = '';
  const [liste, setListe] = useState('');
  const [markedDate, setMarkedDate] = useState({});

  useEffect(async () => {
    SetMarkedDateFunc(objTakvim);
  }, []);

  
  const getSlectedUserActivity = async () => {
    console.log('work');
    await AsyncStorage.getItem('@selectedFriend')
      .then(req => JSON.parse(req))
      .then(res => {
        console.log(res);
        const requestOptions2 = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            dizi: res,
          }),
        };
        fetch(
          'http://172.28.1.143:5000/api/auth/get-selected-activity',
          requestOptions2,
        )
          .then(response => response.json())
          .then(async json => {
            await Save(json)
          });
      });
  };

  const Save = async deger =>{
    console.log('work2')
    setListe(deger)
    console.log(liste)
  }

  const SetMarkedDateFunc = deger => {
    return setMarkedDate(deger);
  };

  const Str = () =>{
    let veri = [];
    let raw = '';
    let son = '';
    let renk = '#125689';
    for (let i = 0; i < liste.length; i++) {
      
      let startDate = liste[i]['activity_start_date'];
      startDate = startDate.substring(0, 10);
      let endDate = liste[i]['activity_end_date'];
      endDate = endDate.substring(0, 10);
      if (i + 1 == liste.length) {
        son =
          son +
          '"' +
          startDate +
          '": {"color": "' +
          renk +
          '", "textColor": "white"},"' +
          endDate +
          '":{"color":"' +
          renk +
          '", "textColor":"white"}';
      } else {
        son =
          son +
          '"' +
          startDate +
          '": {"color": "' +
          renk +
          '", "textColor": "white"},"' +
          endDate +
          '":{"color":"' +
          renk +
          '", "textColor":"white"},';
      }

      veri.push(
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 350,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: '#125689',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              EtkinlikDetay(
                liste[i]['activity_name'],
                liste[i]['activity_start_date'],
                liste[i]['activity_end_date'],
              );
              setModalVisible(true);
            }}>
            <View style={{width: 90, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>{liste[i]['name']}</Text>
            </View>
            <View style={{width: 125, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                {liste[i]['activity_name']}
              </Text>
            </View>
            <View style={{width: 130, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                {liste[i]['activity_start_date']}
              </Text>
              <Text style={{textAlign: 'center'}}>
                {liste[i]['activity_end_date']}
              </Text>
            </View>
          </TouchableOpacity>
        </View>,
      );
    };
    son = '{' + son + '}';
    objTakvim = JSON.parse(son);
    return veri;
  }

  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.takvimContainer}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            hideArrows={false}
            hideExtraDays={false}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableArrowLeft={false}
            disableArrowRight={false}
            disableAllTouchEventsForDisabledDays={false}
            enableSwipeMonths={true}
            markedDates={markedDate}
            markingType={'period'}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1, width: 300, marginRight: 10}}>
            <NewActivity />
          </View>

          <TouchableOpacity
            onPress={() => {
              getSlectedUserActivity();
            }}>
            <Text
              style={{
                height: 40,
                width: 40,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#efefef',
                borderRadius: 10,
                borderWidth: 1,
              }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
        <View><Str></Str></View>
      </ScrollView>
    </View>
  );
};
export default Filtre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  takvimContainer: {
    marginTop: 10,
    paddingTop: 10,
    width: 350,
    height: 390,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
  },
  poupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 400,
    height: 550,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    opacity: 1,
  },
  blackBackground: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000,
    height: 1000,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
