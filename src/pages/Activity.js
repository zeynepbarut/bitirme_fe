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
  ScrollView,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const Activity = ({navigation}) => {
  const [pickerValue, setPickerValue] = useState('');
  const [visibilty, setVisibilty] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>Etkinlik Adı</Text>
          <TextInput style={styles.textInputFirst}></TextInput>
        </View>

        <View style={styles.row}>
          <View style={styles.thirdrow}>
            <TouchableOpacity>
              <Text>Başlangıç Tarihi</Text>
              <TextInput
                style={styles.textInputSecond}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>

          <View style={styles.thirdrow}>
            <TouchableOpacity>
              <Text>Bitiş Tarihi</Text>
              <TextInput
                style={styles.textInputSecond}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.thirdrow}>
            <TouchableOpacity>
              <Text>Başlangıç Saati</Text>
              <TextInput
                style={styles.textInputSecond}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>

          <View style={styles.thirdrow}>
            <TouchableOpacity>
              <Text>Bitiş Saati</Text>
              <TextInput
                style={styles.textInputSecond}
                editable={false}></TextInput>
            </TouchableOpacity>
          </View>
        </View>
        <View>
        <Text>Davet Et</Text>
        <View style={styles.picker}>
        <Picker 
          selectedValue={pickerValue}
          onValueChange={itemValue => setPickerValue(itemValue)}>
          <Picker.Item label="None" value="" />
          <Picker.Item label="User1" value="User1" />
          <Picker.Item label="User2" value="User2" />
          <Picker.Item label="User3" value="User3" />
          <Picker.Item label="User4" value="User4" />
          <Picker.Item label="User5" value="User5" />
        </Picker>
        </View>
        </View>
        <View>
        <Text>Ek Açıklamalar</Text>
        <TextInput
          style={styles.textInputThird}
          multiline></TextInput>
        </View>
        <View>
        <Text>Görünürlük Belirle</Text>
        <View style={styles.picker}>
        <Picker
          selectedValue={visibilty}
          onValueChange={itemValue => setVisibilty(itemValue)}>
          <Picker.Item label="Herkese Açık" value="Genel" />
          <Picker.Item label="Özel" value="Özel" />
        </Picker>
        </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.text}>Etkinlik Düzenle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
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
    borderRadius: 30,
    marginBottom: 30,
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

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  thirdrow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  textStyle: {
    paddingLeft: 20,
    marginTop: 40,
  },

  picker: {
    width: 300,
    height: 45,
    borderColor: '#000',
    borderWidth: 2,
    paddingBottom:52,
    borderRadius: 30,
    marginBottom: 10,
  },
});
