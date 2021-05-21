/* eslint-disable no-undef */
/* eslint-disable no-spaced-func */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Logout from './pages/Logout';

const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const LogoutStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'gray',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profil',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="gray"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const FriendsStackScreen = ({navigation}) => (
  <FriendsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'gray',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }}>
    <FriendsStack.Screen
      name="Friends"
      component={Friends}
      options={{
        title: 'Arkadaşlarım',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="gray"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </FriendsStack.Navigator>
);

const LogoutStackScreen = ({navigation}) => (
  <LogoutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'gray',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }}>
    <LogoutStack.Screen
      name="Logout"
      component={Logout}
      options={{
        title: 'Çıkış Yap',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="gray"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </LogoutStack.Navigator>
);

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Profil" component={ProfileStackScreen} />
        <Drawer.Screen name="Arkadaşlarım" component={FriendsStackScreen} />
        <Drawer.Screen name="Çıkış Yap" component={LogoutStackScreen} />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
          headerShown: false,
          drawerLabel: () => null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false,
          drawerLabel: () => null,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false,
          drawerLabel: () => null,
          }}
        />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{headerShown: false,
          drawerLabel: () => null,
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false,
          drawerLabel: () => null,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Router;
