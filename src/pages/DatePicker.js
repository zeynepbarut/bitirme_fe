/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm1 = date => {
    console.warn('Seçilen Tarih: ', date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button title="Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
