/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const Activity = ({navigation}) => {
  const [pickerValue, setPickerValue] = useState('Javascript');

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.textStyle}>Etkinlik Adı</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInputFirst}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="default"></TextInput>

      <View style={styles.firstrow}>
        <View style={styles.thirdrow}>
          <TouchableOpacity>
            <Text>Başlangıç Tarihi</Text>
            <TextInput
              style={styles.textInputSecond}
              editable={false}
              placeholder=""
              placeholderTextColor="black"></TextInput>
          </TouchableOpacity>
        </View>

        <View style={styles.thirdrow}>
          <TouchableOpacity>
            <Text>Bitiş Tarihi</Text>
            <TextInput
              style={styles.textInputSecond}
              editable={false}
              placeholder=""
              placeholderTextColor="black"></TextInput>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondrow}>
        <View style={styles.thirdrow}>
          <TouchableOpacity>
            <Text>Başlangıç Saati</Text>
            <TextInput
              style={styles.textInputSecond}
              editable={false}
              placeholder=""
              placeholderTextColor="black"></TextInput>
          </TouchableOpacity>
        </View>

        <View style={styles.thirdrow}>
          <TouchableOpacity>
            <Text>Bitiş Saati</Text>
            <TextInput
              style={styles.textInputSecond}
              editable={false}
              placeholder=""
              placeholderTextColor="black"></TextInput>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity>
        <Text>Davet Et</Text>
      </TouchableOpacity>

      <Picker
        style={styles.picker}
        selectedValue={pickerValue}
        onValueChange={itemValue => setPickerValue(itemValue)}>
        <Picker.Item label="User1" value="User1" />
        <Picker.Item label="User2" value="User2" />
        <Picker.Item label="User3" value="User3" />
        <Picker.Item label="User4" value="User4" />
        <Picker.Item label="User5" value="User5" />
      </Picker>

      <TouchableOpacity>
        <Text>Ek Açıklamalar</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInputThird}
        placeholder=""
        placeholderTextColor="black"
        keyboardType="default"></TextInput>

      <TouchableOpacity>
        <Text>Görünürlük Belirle</Text>
      </TouchableOpacity>

      <Picker
        style={styles.picker}
        selectedValue={pickerValue}
        onValueChange={itemValue => setPickerValue(itemValue)}>
        <Picker.Item label="Herkese Açık" value="Genel" />
        <Picker.Item label="Özel" value="Özel" />
      </Picker>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.text}>Etkinlik Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchable: {
    width: 140,
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
  },

  textInputFirst: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginBottom: 60,
  },

  textInputSecond: {
    width: 110,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginBottom: 30,
  },

  textInputThird: {
    width: 340,
    height: 90,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginBottom: 30,
  },

  firstrow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },

  secondrow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },

  thirdrow: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    marginTop: 40,
  },

  picker: {
    width: 300,
    height: 45,
    borderColor: 'blue',
    borderWidth: 1,
  },
});
