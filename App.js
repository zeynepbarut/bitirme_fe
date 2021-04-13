/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet} from 'react-native';

import Router from './src/Router';

const App = ({navigation}) => {
  return <Router />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
