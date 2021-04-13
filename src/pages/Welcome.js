/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          resizeMode="contain"
          resizeMethod="resize"
          source={require('../asset/images/vector.jpg')}
        />
      </TouchableOpacity>

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
        <Text>E-posta</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInp}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="email-address"></TextInput>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Login')}>
        <Text>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Signin')}>
        <Text>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },

  touchable: {
    width: 130,
    height: 50,
    backgroundColor: 'white',
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
  },

  image: {
    width: 130,
    height: 140,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 5,
  },
});
