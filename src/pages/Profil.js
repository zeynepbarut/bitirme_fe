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

const Profil = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mail, setMail] = useState('');

  useEffect(async () => {
    let token = await getToken();
    let user = await getUser(token);
  }, []);

  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
    return newtoken;
  };

  const getUser = async savedToken => {
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
        setName(json['name']);
        setSurname(json['surname']);
        setMail(json['email']);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
      }}>
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            width: 375,
            height: 600,
            borderRadius: 8,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 150
            }}>
            <Text style={{marginTop: 80}}>İsim</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.border}></TextInput>

            <Text>Soyisim</Text>
            <TextInput
              value={surname}
              onChangeText={setSurname}
              style={styles.border}></TextInput>

            <Text>Email</Text>
            <TextInput
              value={mail}
              onChangeText={setMail}
              style={styles.border}></TextInput>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                marginRight: 10,
                width: 165,
                height: 35,
                borderRadius: 12,
                backgroundColor: '#cfcfcf',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: 165,
                  height: 35,
                }}>
                Düzenle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                width: 165,
                height: 35,
                borderRadius: 12,
                backgroundColor: '#cfcfcf',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: 165,
                  height: 35,
                }}>
                Şifre Değiştir
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: 350,
              height: 35,
              borderRadius: 12,
              backgroundColor: '#f02020',
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                width: 350,
                height: 35,
              }}>
              Hesabı Sil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    width: 250,
    height: 36,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
