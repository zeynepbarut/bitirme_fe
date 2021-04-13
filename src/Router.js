/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Activity from './pages/Activity';
import DatePicker from './pages/DatePicker';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DatePicker"
          component={DatePicker}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
