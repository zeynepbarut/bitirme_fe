/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
  
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.image}
          resizeMode="contain"
          resizeMethod="resize"
          source={require('../asset/images/profil.png')}
        />
      </TouchableOpacity>

      <View style={styles.row}>
      <Icon.Button name="person" size={20}
      backgroundColor='gray'></Icon.Button>
      <TextInput style={styles.textInp}
       placeholder='Ad'></TextInput>
      </View>

      <View style={styles.row}>
      <Icon.Button name="person" size={20}
      backgroundColor='gray'></Icon.Button>
      <TextInput style={styles.textInp}
       placeholder='Soyad'></TextInput>
      </View>

      <View style={styles.row}>
      <Icon.Button name="key" size={20}
      backgroundColor='gray'></Icon.Button>
      <TextInput style={styles.textInp}
       placeholder='Şifre'></TextInput>
      </View>

      <View style={styles.row}>
      <Icon.Button name="call" size={20}
      backgroundColor='gray'></Icon.Button>
      <TextInput style={styles.textInp}
       placeholder='Telefon'></TextInput>
      </View>

      <View style={styles.row}>
      <Icon.Button name="mail" size={20}
      backgroundColor='gray'></Icon.Button>
      <TextInput style={styles.textInp}
       placeholder='E-Posta'></TextInput>
      </View>

      <View style={styles.row}>
      <TouchableOpacity
        style={styles.touchable}>
        <Text>Düzenle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}>
        <Text>Hesap Sil</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'white',
    width: 110,
    height: 110,
    borderColor: 'white',
    marginTop:20,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchable: {
    width: 130,
    height: 50,
    backgroundColor: 'white',
    marginBottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
  },
  
  textInp: {
    width: 210,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,

  },
});







