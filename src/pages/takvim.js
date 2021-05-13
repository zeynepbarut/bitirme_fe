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
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';

const Takvim = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.takvimContainer}>
        <Calendar
          onDayPress={day => {
            console.log('selected day', day);
          }}
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={false}
          renderHeader={date => {
            <Text>Ses</Text>;
          }}
          enableSwipeMonths={true}


          
          markedDates={{
            '2021-05-14': {
              periods: [
                {startingDay: true, endingDay: false, color: '#128952'},
              ],
            },
            '2021-05-15': {
              periods: [
                {startingDay: false, endingDay: false, color: '#128952'},
              ],
            },
            '2021-05-16': {
              periods: [
                {startingDay: false, endingDay: true, color: '#128952'},
              ],
            },
          }}
          markingType="multi-period"
        />
      </View>
    </View>
  );
};

export default Takvim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  takvimContainer: {
    marginTop: 20,
    width: 350,
    height: 380,
    borderWidth: 1.3,
    borderRadius: 10,
    borderColor: 'black',
  },
});
