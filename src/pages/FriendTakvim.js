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

const FriendTakvim = () => {
  let objTakvim = '';
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [strData, setStrData] = useState('');

  useEffect(async () => {
    setName(await AsyncStorage.getItem('@selectedFriendName'));
    setSurname(await AsyncStorage.getItem('@selectedFriendSurname'));
    await SaveVeri();
  }, []);

  const SaveVeri = async () => {
    const requestOptions2 = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    };
    await fetch(
      'http://172.28.1.143:5000/api/auth/get-friend-activity',
      requestOptions2,
    )
      .then(res => res.json())
      .then(response => setStrData(response));
  };

  const Ekran = () => {
    let veri = [];
    let son = '';
    let renk = '#cfcfcf';
    for (let index = 0; index < strData.length; index++) {
      let startDate = strData[index]['activity_start_date'];
      startDate = startDate.substring(0, 10);
      let endDate = strData[index]['activity_end_date'];
      endDate = endDate.substring(0, 10);
      if (index + 1 == strData.length) {
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
    }
    son = '{' + son + '}';
    objTakvim = JSON.parse(son);

    veri.push(
        <View>
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
            markedDates={objTakvim}
            markingType={'period'}
          />
        </View>
        </View>
    )

    veri.push(
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: 100, textAlign: 'center'}}>Aktivite Adı</Text>
          <Text style={{width: 150}}>Aktivite Başlıngıç Saati</Text>
          <Text style={{width: 150}}>Aktivite Bitiş Saati</Text>
        </View>
        <View style={{borderWidth: 1.5, width: 400, height: 0.5}}></View>
      </View>,
    );
    for (let index = 0; index < strData.length; index++) {
      veri.push(
        <View style={{flexDirection: 'row', justifyContent: 'center',borderWidth:2,margin:5,height:40,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{width: 100, textAlign: 'center'}}>
            {strData[index]['activity_name']}
          </Text>
          <Text style={{width: 150}}>
            {strData[index]['activity_start_date']}
          </Text>
          <Text style={{width: 150}}>
            {strData[index]['activity_end_date']}
          </Text>
        </View>,
      );
    }

    return veri;
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}>
      <Ekran />
    </View>
  );
};

export default FriendTakvim;

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
      width: 350,
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
