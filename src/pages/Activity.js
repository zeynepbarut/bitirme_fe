/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Activity = ({navigation}) => {
  const [userId, setId] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDes, setActivityDes] = useState('');
  const [activityInvitedUser, setActivityInvitedUser] = useState('');

  const [pickerValue, setPickerValue] = useState('');
  const [visibilty, setVisibilty] = useState('');
  const [control, setControl] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (control == 1) {
      const currentDate = selectedDate || startDate;
      setStartDate(currentDate);
    } else {
      const currentDate = selectedDate || endDate;
      setEndDate(currentDate);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formatDate = test => {
    let a = test.toISOString();
    a = a.slice(0, 10);
    return a;
  };

  const formatTime = test => {
    let a = test.toISOString();
    a = a.slice(11, 19);
    return a;
  };

  const mergeStr = date => {
    let a = formatDate(date);
    let b = formatTime(date);
    let c = a + ' ' + b;
    return c;
  };

  const saveActivity = async () => {
    console.log('funksiyon active');
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
    console.log(jsonValue);
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + newtoken,
      },
    };
    await fetch(
      'http://172.28.1.143:8000/api/auth/user-profile',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        setId(json.id);
      });

    console.log(userId);
    console.log(activityName);
    console.log(mergeStr(startDate));
    console.log(mergeStr(endDate));
    console.log(activityDes);
    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        user_id: userId,
        activity_name: activityName,
        activity_start_date: mergeStr(startDate),
        activity_end_date: mergeStr(endDate),
        activity_view: 1,
        activity_description: activityDes,
        activity_invited_user: {
          obj1: {user: 1},
          obj2: {user: 2},
        },
      }),
    };
    await fetch(
      'http://172.28.1.143:8000/api/auth/save-activity',
      requestOptions2,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>Etkinlik Adı</Text>
          <TextInput
            style={styles.textInputFirst}
            value={activityName}
            onChangeText={setActivityName}></TextInput>
        </View>
        <View style={styles.row}>
          <View style={styles.thirdrow}>
            <TouchableOpacity
              onPress={() => {
                setControl(1);
                showDatepicker();
              }}>
              <Text>Başlangıç Tarihi</Text>
              <TextInput
                style={styles.textInputSecond}
                value={formatDate(startDate)}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>

          <View style={styles.thirdrow}>
            <TouchableOpacity
              onPress={() => {
                setControl(2);
                showDatepicker();
              }}>
              <Text>Bitiş Tarihi</Text>
              <TextInput
                style={styles.textInputSecond}
                value={formatDate(endDate)}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.thirdrow}>
            <TouchableOpacity
              onPress={() => {
                setControl(1);
                showTimepicker();
              }}>
              <Text>Başlangıç Saati</Text>
              <TextInput
                style={styles.textInputSecond}
                value={formatTime(startDate)}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>

          <View style={styles.thirdrow}>
            <TouchableOpacity
              onPress={() => {
                setControl(2);
                showTimepicker();
              }}>
              <Text>Bitiş Saati</Text>
              <TextInput
                style={styles.textInputSecond}
                value={formatTime(endDate)}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>Davet Et</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={pickerValue}
              onValueChange={itemValue => setPickerValue(itemValue)}>
              <Picker.Item label="None" value="" />
              <Picker.Item label="User1" value="User1" />
              <Picker.Item label="User2" value="User2" />
              <Picker.Item label="User3" value="User3" />
              <Picker.Item label="User4" value="User4" />
              <Picker.Item label="User5" value="User5" />
            </Picker>
          </View>
        </View>
        <View>
          <Text>Ek Açıklamalar</Text>
          <TextInput
            style={styles.textInputThird}
            multiline
            value={activityDes}
            onChangeText={setActivityDes}></TextInput>
        </View>
        <View>
          <Text>Görünürlük Belirle</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={visibilty}
              onValueChange={itemValue => setVisibilty(itemValue)}>
              <Picker.Item label="Herkese Açık" value="Genel" />
              <Picker.Item label="Özel" value="Özel" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={saveActivity}>
          <Text style={styles.text}>Etkinlik Düzenle</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 140,
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
  },

  textInputFirst: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    marginBottom: 30,
  },

  textInputSecond: {
    width: 110,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginBottom: 30,
  },

  textInputThird: {
    width: 340,
    height: 90,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  thirdrow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  textStyle: {
    paddingLeft: 20,
    marginTop: 40,
  },

  picker: {
    width: 300,
    height: 45,
    borderColor: '#000',
    borderWidth: 2,
    paddingBottom: 52,
    borderRadius: 30,
    marginBottom: 10,
  },
});
