/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useEffect,
  Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const Singin = ({navigation}) => {
  
  const [name , setName] = useState('');
  const [surname , setSurname] = useState('');
  const [password , setPassword] = useState('');
  const [passwordConfirmation , setPasswordConfirmation] = useState('');
  const [email , setEmail] = useState('');

  const kayıtOl = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept':'text/plain' },
        body: JSON.stringify({
          "name": name,
          "surname": surname,
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirmation
          
          })
    };
    fetch('http://172.28.1.143:5000/api/auth/register', requestOptions)// bu şekilde fetch olanalrı 5000 portuna çekeceğiz
      .then((response) =>response.json()).then((json) => {
        console.log(json.status);
        console.log(json.value);
        if(json.status == 201){
          navigation.navigate('Welcome')
        }
        else{
          mesError = json.value
          console.log(mesError)
          Alert.alert("Kullanıcı oluşturulamadı", JSON.stringify(mesError))
        }
      }).catch((error) => {
        console.error(error);
      });
  }


  return (
    <ScrollView  style={styles.container}>
    <View style={styles.subContainer}>
      <Text>Ad</Text>
      <TextInput
        style={styles.textInp}
        onChangeText={setName}
        value={name}></TextInput>

      <Text>Soyad</Text>
      <TextInput
        style={styles.textInp}
        onChangeText={setSurname}
        value = {surname}></TextInput>

      <Text>Şifre</Text>
      <TextInput
        style={styles.textInp}
        onChangeText={setPassword}
        value = {password}></TextInput>

      
      <Text>Şifre Tekrarı</Text>
      <TextInput
        style={styles.textInp}
        onChangeText={setPasswordConfirmation}
        value = {passwordConfirmation}></TextInput>

      <Text>E-Posta</Text>
      <TextInput
        style={styles.textInp}
        onChangeText={setEmail}
        value = {email}></TextInput>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => kayıtOl()}>
        <Text>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default Singin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  subContainer:{
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },

  touchable: {
    width: 130,
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
  },

  textInp: {
    width: 250,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 30,
  },
});
