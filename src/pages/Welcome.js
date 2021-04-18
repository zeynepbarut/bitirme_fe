/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const tokenSave = async(token)=>{
    try {
      await AsyncStorage.setItem('@store_token', token)
    } catch (e) {
      console.log(e)
    }
  }
  const tokenGet = async()=>{
    try {
      const token = await AsyncStorage.getItem('@store_token')
      if (token !== null) {
          Alert.alert("Bu kayıtta veri bulunmamaktadır")
      }
      return console.log(token)
    } catch (e) {
      console.log(e)
    }
  }

  const girisYap = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    fetch('http://172.28.1.143:8000/api/auth/login', requestOptions)
      .then(response => response.json())
      .then(json => {
        if(json.status == 200){
          console.log(json);
          tokenSave(json.access_token)
          tokenGet()
        }
        else if(json.status == 422){
          mesError = json.value
          console.log(mesError)
          Alert.alert("Giriş Yapılamadı", JSON.stringify(mesError))
        }else{
          mesError = json.error;
          console.log(mesError)
          Alert.alert("Giriş Yapılamadı", mesError)
        }
        
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          resizeMethod="resize"
          source={require('../asset/images/vector.jpg')}
        />

        <View style={styles.views}>
          <Text style={styles.fontSize}>Kullanıcı Adı</Text>
          <TextInput
            style={styles.textInp}
            onChangeText={setName}
            value={name}></TextInput>
        </View>

        <View style={styles.views}>
          <Text style={styles.fontSize}>Şifre</Text>
          <TextInput
            style={styles.textInp}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}></TextInput>
        </View>

        <View style={styles.views}>
          <Text style={styles.fontSize}>E-posta</Text>
          <TextInput
            style={styles.textInp}
            onChangeText={setEmail}
            value={email}></TextInput>
        </View>

        <View style={styles.touchable}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signin')}>
            <Text>Yeni Kayıt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => girisYap()}>
            <Text>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  subContainer: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  touchable: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    width: 130,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    margin: 10,
  },

  textInp: {
    width: 300,
    height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
  },

  views: {
    margin: 5,
    alignItems: 'center',
  },

  fontSize: {
    fontSize: 18,
  },

  image: {
    width: 130,
    height: 140,
    marginTop: 5,
  },
});
