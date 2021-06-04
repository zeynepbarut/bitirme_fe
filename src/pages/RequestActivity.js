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

const RequestActivity = ({navigation}) => {
  const [waitActivity, setWaitActivity] = useState([]);

  useEffect(async () => {
    let token = await getToken();
    await getWait(token);
  }, []);

  const reflesh = async() =>{
    let token = await getToken();
    await getWait(token);
  }

  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
    return newtoken;
  };

  const getWait = async savedToken => {
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
      .then(async Id => {
        await getUserActivity(Id);
      });
  };

  const getUserActivity = async UserId => {
    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: UserId,
      }),
    };

    let response2 = await fetch(
      'http://172.28.1.143:5000/api/auth/get-wait-activity',
      requestOptions2,
    );
    await response2.json().then(body2 => {
      setWaitActivity(body2);
      console.log(waitActivity);
    });
  };

  const Accept = async (name, start, end) => {
    
    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        name: name,
        start: start,
        end: end,
      }),
    };
    console.log(requestOptions2.body)
    let response2 = await fetch(
      'http://172.28.1.143:5000/api/auth/accept-activity',
      requestOptions2,
    );
    await response2.json().then(body2 => {
      body2;
    });
  };

  const Wait = () => {
    let veri = [];
    for (let index = 0; index < waitActivity.length; index++) {
      veri.push(
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              width: 370,
              height: 50,
              borderRadius: 8,
            }}>
            <Text style={{marginRight: 5, marginLeft: 10, alignSelf: 'center'}}>
              {waitActivity[index]['activity_name']}
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Text style={{marginRight: 10, marginLeft: 10}}>
                {waitActivity[index]['activity_start_date']}
              </Text>
              <Text style={{marginLeft: 10}}>
                {waitActivity[index]['activity_end_date']}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{marginRight: 2}}
                onPress={() =>{Accept(
                    waitActivity[index]['activity_name'],
                    waitActivity[index]['activity_start_date'],
                    waitActivity[index]['activity_end_date'],
                  )
                  reflesh();
                  }
                  
                }>
                <Text
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#090',
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Kabul
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#900',
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Red
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{marginLeft: 2}}>
                <Text
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#990',
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Öner
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>,
      );
    }
    return veri;
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
      <View
        style={{
          borderWidth: 1,
          height: 640,
          width: 400,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            marginLeft: 16,
            marginTop: 10,
            textAlign: 'center',
          }}>
          Cevap Bekleyen Etkinlikler
        </Text>
        <View style={{borderWidth: 1, width: 380, marginBottom: 10}}></View>
        <View></View>
        <Wait />
      </View>
    </View>
  );
};

export default RequestActivity;
