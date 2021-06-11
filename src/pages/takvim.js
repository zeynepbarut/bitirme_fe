/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';

const Takvim = ({navigation}) => {
  const [deger, setDeger] = useState('');
  const [strData, setStrData] = useState('');

  useEffect(async () => {
    console.log('1');
    let token = await getToken();
    console.log('3');
    let user = await saveUserId(token);
    console.log('6');
  }, []);

  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
    console.log('2');
    return newtoken;
  };

  const saveUserId = async savedToken => {
    let a = '';
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + savedToken,
      },
    };
    let response = await fetch(
      'http://172.28.1.143:5000/api/auth/user-profile',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        a = json.id;
        return a;
      })
      .then(async deger => {
        console.log('4');
        await getUserActivity(deger);
      });
  };

  const getUserActivity = async b => {
    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: b,
      }),
    };

    let response2 = await fetch(
      'http://172.28.1.143:5000/api/auth/get-user-activity',
      requestOptions2,
    );
    await response2.json().then(body2 => {
      setStrData(JSON.stringify(body2.Activities).split('"'));
      setDeger(body2);
    });
  };

  const Str = () => {
    let veri = [];
    for (let i = 1; i < strData.length; i = i + 12) {
      veri.push(
        <View style={{flexDirection: 'row', justifyContent: 'space-between',width:390}}>
          <View style={{margin:10,marginRight:20}}>
            <Text>{strData[i + 2]}</Text>
          </View>
          <View style={{margin:10}}>
            <Text>{strData[i + 6]}</Text>
          </View>
          <View style={{margin:10}}>
            <Text>{strData[i + 10]}</Text>
          </View>
        </View>
      );
    }

    return veri;
  };

  return (
    <View style={styles.container}>
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
          renderHeader={date => {
            <Text>Ses</Text>;
          }}
          enableSwipeMonths={true}
          markedDates={{
            '2021-05-14': {
              periods: [
                {startingDay: true, endingDay: false, color: '#128952'},
                {startingDay: true, endingDay: false, color: '#121152'},
              ],
            },
            '2021-05-15': {
              periods: [
                {startingDay: false, endingDay: false, color: '#128952'},
                {startingDay: false, endingDay: true, color: '#121152'},
              ],
            },
            '2021-05-16': {
              periods: [
                {startingDay: false, endingDay: true, color: '#128952'},
              ],
            },
          }}
          markingType="multi-period"
        />
      </View>

      <View style={{marginTop: 10, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center',width:390}}>
          <Text style={{marginRight: 20}}>Activity Name</Text>
          <Text style={{marginRight: 40}}>Activity Start Date</Text>
          <Text>Activity End Date</Text>
        </View>
        <View style={{borderBottomWidth: 1, width: 400}}></View>
      </View>
      <Str />
    </View>
  );
};

export default Takvim;

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
    borderWidth: 1.3,
    borderRadius: 10,
    borderColor: 'black',
  },
});