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
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';

const Ortak = ({navigation}) => {
  let objTakvim = '';
  const [strData, setStrData] = useState('');
  const [takvimData, setTakvimData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [etkinlikAdı, setetkinlikAdı] = useState('');
  const [etkinlikstart, setetkinlikstart] = useState('');
  const [etkinlikend, setetkinlikend] = useState('');
  const [etkinlikdavet, setetkinlikdavet] = useState('');
  const [etkinlikaçıklama, setetkinlikaçıklama] = useState('');
  const [etkinlikgörünürlük, setetkinlikgörünürlük] = useState(false);
  const [markedDate, setMarkedDate] = useState({});

  useEffect(async () => {
    let token = await getToken();
    await saveUserId(token);
    SetMarkedDateFunc(objTakvim);
  }, []);

  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
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
        await getOrtakActivity(deger);
      });
  };

  const getOrtakActivity = async b => {
    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: b,
      }),
    };

    let response2 = await fetch(
      'http://172.28.1.143:5000/api/auth/get-ortak-activity',
      requestOptions2,
    );
    await response2.json().then(body2 => {
      setStrData(body2);
    });
  };
  let raw = '';
  let son = '';

  const EtkinlikDetay = async (name, start, end) => {
    const requestOptions3 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        name: name,
        start: start,
        end: end,
      }),
    };

    let res = await fetch(
      'http://172.28.1.143:5000/api/auth/get-one-activity',
      requestOptions3,
    );
    await res.json().then(body3 => {
      setetkinlikAdı(body3[0]['activity_name']);
      setetkinlikstart(body3[0]['activity_start_date']);
      setetkinlikend(body3[0]['activity_end_date']);
      setetkinlikdavet(body3[0]['activity_invited_user']);
      setetkinlikaçıklama(body3[0]['activity_description']);
      if (body3[0]['activity_view'] == true) {
        setetkinlikgörünürlük('Herkese Açık');
      } else {
        setetkinlikgörünürlük('Kişisel');
      }
    });
  };

  const SetMarkedDateFunc = deger => {
    return setMarkedDate(deger);
  };
  const Str = () => {
    let veri = [];
    let renk = '#467523';
    raw = '';
    son = '';
    for (let i = 0; i < strData.length; i++) {
      if (strData[i]['name'] == 'Ahmet') {
        renk = '#156369';
      }
      if (strData[i]['name'] == 'Cihad') {
        renk = '#966369';
      }

      let startDate = strData[i]['activity_start_date'];
      startDate = startDate.substring(0, 10);
      let endDate = strData[i]['activity_end_date'];
      endDate = endDate.substring(0, 10);
      if (i + 1 == strData.length) {
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
            width: 390,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: renk,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              EtkinlikDetay(
                strData[i]['activity_name'],
                strData[i]['activity_start_date'],
                strData[i]['activity_end_date'],
              );
              setModalVisible(true);
            }}>
            <View style={{width: 125, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>{strData[i]['name']}</Text>
            </View>
            <View style={{width: 125, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                {strData[i]['activity_name']}
              </Text>
            </View>
            <View style={{width: 130, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                {strData[i]['activity_start_date']}
              </Text>
              <Text style={{textAlign: 'center'}}>
                {strData[i]['activity_end_date']}
              </Text>
            </View>
          </TouchableOpacity>
        </View>,
      );

      // if (i + 1 == strData.length) {
      //   console.log("1");
      // }else if (strData[i]['name'] != strData[i + 1]['name']) {
      //   renk = Math.floor(Math.random() * (999 - 100) + 100);
      //   renk = '#' + renk;
      // }
    }
    son = '{' + son + '}';
    objTakvim = JSON.parse(son);
    return veri;
  };

  const ModalInside = () => {
    return (
      <View style={styles.blackBackground}>
        <View style={styles.poupContainer}>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Etkinlik Adı</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikAdı}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Etkinlik Başlangıç Tarihi</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikstart}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Etkinlik Bitiş Tarihi</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikend}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Davet Edilen Kullanıcılar</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikdavet}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Açıklamalar</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikaçıklama}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={{marginLeft: 7}}>Görünürlük</Text>
            <Text
              style={{
                borderWidth: 2,
                width: 250,
                height: 30,
                borderRadius: 8,
                textAlignVertical: 'center',
                paddingLeft: 5,
              }}>
              {etkinlikgörünürlük}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalInside />
      </Modal>
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
            enableSwipeMonths={true}
            markedDates={markedDate}
            markingType={'period'}
          />
        </View>

        <View>
          <TouchableOpacity onPress={()=>{navigation.navigate('Filtre')}}>
            <Text
              style={{
                width: 150,
                height: 25,
                borderWidth: 2,
                borderRadius: 10,
                marginTop: 10,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Filtre Uygula
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 390}}>
            <Text style={{textAlign: 'center', width: 130}}>Activity Name</Text>
            <Text style={{textAlign: 'center', width: 130}}>
              Activity Start Date
            </Text>
            <Text style={{textAlign: 'center', width: 130}}>
              Activity End Date
            </Text>
          </View>
          <View style={{borderBottomWidth: 1, width: 400}}></View>
        </View>
        <Str />
      </View>
    </ScrollView>
  );
};

export default Ortak;

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
