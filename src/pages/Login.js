/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

  const logOut = async() =>{
    const jsonValue = await AsyncStorage.getItem('@store_token')
    const newtoken = JSON.parse(jsonValue)
    console.log("Çıkış Yapılıyor "+newtoken)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Authorization': 'Bearer' + newtoken
      }
    }
    let response = await fetch('http://172.28.1.143:5000/api/auth/logout', requestOptions)
    let json = await response.json();
    console.log(json)
    navigation.navigate('Welcome')
  }


  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() =>logOut()}>
          <Image
            style={styles.logout}
            source={require('../asset/images/Logout.png')}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <Image
              style={styles.image}
              source={require('../asset/images/Etkinlik.png')}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Text style={styles.text}>Yeni Etkinlik</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('DatePicker')}>
            <Image
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
              source={require('../asset/images/onay.png')}
            />
            <Text style={styles.text}>Etkinlik Davetleri</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
              source={require('../asset/images/takvim.png')}
            />
            <Text style={styles.text}>Takvim</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
              source={require('../asset/images/ortak.png')}
            />
            <Text style={styles.text}>Ortak Takvim</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
              source={require('../asset/images/arkadaşlarım.png')}
            />
            <Text style={styles.text}>Arkadaşlarım</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
              source={require('../asset/images/profil.png')}
            />
            <Text style={styles.text}>Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  image: {
    width: 110,
    height: 110,
    borderColor: 'white',
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
  },
  logout: {
    width: 50,
    height: 50,
  },
  left: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop:20,
  },
  text:{
    alignSelf: 'center',
  }
});
