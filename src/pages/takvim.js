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
  LogBox
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';
import MessageScreen from './MessageScreen';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Takvim = ({navigation}) => {
  const [strData, setStrData] = useState('');
  const [takvimData, setTakvimData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [messageVisiable, setMessageVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [etkinlikId, setEtkinlikId] = useState('');
  const [etkinlikAdı, setetkinlikAdı] = useState('');
  const [etkinlikstart, setetkinlikstart] = useState('');
  const [etkinlikend, setetkinlikend] = useState('');
  const [etkinlikdavet, setetkinlikdavet] = useState('');
  const [etkinlikaçıklama, setetkinlikaçıklama] = useState('');
  const [etkinlikgörünürlük, setetkinlikgörünürlük] = useState(false);
  const [value, onChangeText] = React.useState('Notunuzu Buraya Giriniz');
  const [markedDate, setMarkedDate] = useState({});

  useEffect(async () => {
    await DataBuild()
    let token = await getToken();
    await saveUserId(token);
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
        setUserId(a);
        return a;
      })
      .then(async deger => {
        
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
    });
  };
  let modelIn = [];
  let raw = '';
  let son = '';
  let lastraw = '';

  const DataBuild = async () => {
    lastraw = '';
    raw = '';
    son = '';
    for (let i = 1; i < strData.length; i = i + 12) {
      let parca1 = JSON.stringify(strData[i + 6]).split(' ');
      let parca2 = JSON.stringify(strData[i + 10]).split(' ');
      
      let startDate = parca1[0].substring(1);
      let endDate = parca2[0].substring(1);
      let raw3 = '"';
      let raw4 = '": {"color": "#125678", "textColor": "white"},';
      if ((i + 10) == (strData.length - 2)) {
        let raw5 = '": {"color": "#125678", "textColor": "white"}'
        son = son + raw3 + startDate + raw4 + raw3 + endDate + raw5;
      }else{
        son = son + raw3 + startDate + raw4 + raw3 + endDate + raw4;
      }
      
    }
    let raw1 = "{";
    let raw2 = "}";
    lastraw = raw1 + son + raw2;
    let a =JSON.parse(lastraw)
    console.log(a)
    setMarkedDate(a)
  };

  

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
      setEtkinlikId(body3[0]['activity_id']);
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

  const Str = () => {
    let veri = [];
    for (let i = 1; i < strData.length; i = i + 12) {
      veri.push(
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 390,
            marginBottom:10,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              EtkinlikDetay(strData[i + 2], strData[i + 6], strData[i + 10]);
              setModalVisible(true);
            }}>
            <View style={{width:100}}>
              <Text>{strData[i + 2]}</Text>
            </View>
            <View style={{width:145}}>
              <Text>{strData[i + 6]}</Text>
            </View>
            <View style={{width:145}}>
              <Text>{strData[i + 10]}</Text>
            </View>
          </TouchableOpacity>
        </View>,
      );
    }

    return veri;
  };
  const ModalInside = () => {
    if (messageVisiable == false) {
      return (
        <View style={styles.blackBackground}>
          <View style={styles.poupContainer}>
            <ScrollView>
              <View style={{margin: 10}}>
                <Text style={{marginLeft: 7}}>Etkinlik Adı</Text>
                <Text
                  style={{
                    borderWidth: 1,
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
                    borderWidth: 1,
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
                    borderWidth: 1,
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
                    borderWidth: 1,
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
                    borderWidth: 1,
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
                    borderWidth: 1,
                    width: 250,
                    height: 30,
                    borderRadius: 8,
                    textAlignVertical: 'center',
                    paddingLeft: 5,
                  }}>
                  {etkinlikgörünürlük}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setMessageVisible(true);
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    width: 100,
                    height: 40,
                    borderRadius: 20,
                    textAlign: 'center',
                    backgroundColor: '#cfcfcf',
                  }}>
                  Etkinlik Gönderileri
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    width: 100,
                    height: 40,
                    borderRadius: 20,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    backgroundColor: '#cfcfcf',
                    margin: 20,
                  }}>
                  Etkinlik Düzenle
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.blackBackground}>
          <MessageScreen userId = {userId} etkinlikId = {etkinlikId}/>
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setMessageVisible(false);
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
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 390}}>
            <Text style={{width:100}}>Activity Name</Text>
            <Text style={{width:145}}>Activity Start Date</Text>
            <Text style={{width:145}}>Activity End Date</Text>
          </View>
          <View style={{borderBottomWidth: 1, width: 400}}></View>
        </View>
        <Str />
      </View>
    </ScrollView>
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
  poupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 350,
    backgroundColor: 'white',
    borderWidth: 1.3,
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
