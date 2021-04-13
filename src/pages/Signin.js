/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Singin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Ad</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="default"></TextInput>

      <TouchableOpacity>
        <Text>Soyad</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="default"></TextInput>

      <TouchableOpacity>
        <Text>Kullanıcı Adı</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="default"></TextInput>

      <TouchableOpacity>
        <Text>Şifre</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        secureTextEntry={true}
        keyboardType="numeric"></TextInput>

      <TouchableOpacity>
        <Text>Şifre Tekrarı</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        secureTextEntry={true}
        keyboardType="numeric"></TextInput>

      <TouchableOpacity>
        <Text>E-Posta</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="email-address"></TextInput>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Welcome')}>
        <Text>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Singin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    width: 300,
    height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    marginBottom: 30,
  },
});
