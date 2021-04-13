/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstrow}>
        <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
          <Image
            style={styles.image}
            source={require('../asset/images/etkinlikolustur.jpg')}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../asset/images/onaybekleyenetkinlikler.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondrow}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../asset/images/takvim.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../asset/images/ortaktakvim.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.thirdrow}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../asset/images/arkadaslarim.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../asset/images/profil.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  firstrow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondrow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  thirdrow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  image: {
    width: 130,
    height: 130,
    borderColor: 'white',
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
  },
});
