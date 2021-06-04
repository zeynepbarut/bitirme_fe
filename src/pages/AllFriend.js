import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllFriend = ()=>{


    useEffect(async () => {
        let token = await getToken();
        let friend = await getFriend(token);
      }, []);

      const getFriend = async savedToken => {
        let a = '';
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + savedToken,
          },
        };
        let response = await fetch(
          'http://172.28.1.143:5000/api/auth/user-profile',
          requestOptions,
        )
          .then(response => response.json())
          .then(json => {
            a = json.id;
            return a;
          })
          .then(async deger => {
            await getAllFriend(deger);
          });
      };
    
      const getAllFriend = async deger => {
        const requestOptions2 = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: deger,
          }),
        };
        await fetch('http://172.28.1.143:5000/api/auth/get-friend', requestOptions2)
          .then(res => res.json())
          .then(res2 => {
            saveFriend(res2);
          });
      };

      const getToken = async () => {
        const jsonValue = await AsyncStorage.getItem('@store_token');
        const newtoken = JSON.parse(jsonValue);
        return newtoken;
      };

      const saveFriend = async(Friend)=>{
        try {
        const stringifiedArray = JSON.stringify(Friend)
          await AsyncStorage.setItem('@friends', stringifiedArray)
        } catch (e) {
          console.log(e)
        }
      }

      return null

}
export default AllFriend