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
import FriendTakvim from './FriendTakvim';

const Friends = ({navigation}) => {
  const [userId, setId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [requestVisiable, setRequestVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allWaitUsers, setAllWaitUsers] = useState([]);
  const [allFriend, setAllFriend] = useState([]);

  useEffect(async () => {
    let token = await getToken();
    let user = await getWaitUser(token);
    let friend = await getFriend(token);
    Alluser();
  }, []);

  const reflesh = async () => {
    let token = await getToken();
    let user = await getWaitUser(token);
  };

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
        setAllFriend(res2);
      });
  };

  const getWaitUser = async savedToken => {
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
        await getAllWaitUser(deger);
      });
  };

  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem('@store_token');
    const newtoken = JSON.parse(jsonValue);
    return newtoken;
  };

  const Alluser = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch('http://172.28.1.143:5000/api/auth/get-all-user', requestOptions)
      .then(res => res.json())
      .then(res => {
        setAllUsers(res);
      });
  };

  const getAllWaitUser = async deger => {
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
    await fetch(
      'http://172.28.1.143:5000/api/auth/get-all-wait-user',
      requestOptions2,
    )
      .then(res => res.json())
      .then(res2 => {
        setAllWaitUsers(res2);
      });
  };

  const addFriend = async (name, surname) => {
    let token = await getToken();
    let userID = '';
    let a = '';
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    let response = await fetch(
      'http://172.28.1.143:5000/api/auth/user-profile',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        userID = json.id;
        return userID;
      });

    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: userID,
        name: name,
        surname: surname,
      }),
    };
    await fetch(
      'http://172.28.1.143:5000/api/auth/add-friend',
      requestOptions2,
    ).then(res => console.log(res.status));
  };

  const acceptFriend = async (name, surname) => {
    let token = await getToken();
    let userID = '';
    let a = '';
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    let response = await fetch(
      'http://172.28.1.143:5000/api/auth/user-profile',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        userID = json.id;
        return userID;
      });

    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: userID,
        name: name,
        surname: surname,
      }),
    };
    await fetch(
      'http://172.28.1.143:5000/api/auth/accept',
      requestOptions2,
    ).then(res => console.log(res.status));
  };

  const deniedFriend = async (name, surname) => {
    let token = await getToken();
    let userID = '';
    let a = '';
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    let response = await fetch(
      'http://172.28.1.143:5000/api/auth/user-profile',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        userID = json.id;
        return userID;
      });

    const requestOptions2 = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        id: userID,
        name: name,
        surname: surname,
      }),
    };
    await fetch(
      'http://172.28.1.143:5000/api/auth/denied',
      requestOptions2,
    ).then(res => console.log(res.status));
  };

  const ModelIn = () => {
    const veri = [];
    let son = '';
    if (requestVisiable == false) {
      for (let index = 0; index < allUsers.length; index++) {
        let renk = Math.floor(Math.random() * (999 - 100) + 100);
        renk = '#' + renk;
        veri.push(
          <View
            style={{
              borderWidth: 1,
              width: 325,
              height: 50,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 8,
              justifyContent: 'space-between',
              alignItems: 'stretch',
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 40, height: 40, tintColor: renk}}
                source={require('../asset/images/user_icon.png')}
              />
              <Text
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  fontSize: 20,
                  height: 50,
                  textAlignVertical: 'center',
                }}>
                {allUsers[index]['name']}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  height: 50,
                  textAlignVertical: 'center',
                }}>
                {allUsers[index]['surname']}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  addFriend(
                    allUsers[index]['name'],
                    allUsers[index]['surname'],
                  );
                }}
                style={{
                  alignSelf: 'flex-end',
                  width: 80,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 0.1,
                  marginRight: 10,
                  backgroundColor: '#090',
                }}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    width: 80,
                    textAlign: 'center',
                  }}>
                  Arkadaş Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>,
        );
      }

      son = (
        <View
          style={{
            width: 375,
            height: 600,
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 29.5,
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24}}>Tüm Kullanıcılar</Text>
          <View
            style={{
              width: 350,
              borderWidth: 1,
              alignSelf: 'flex-start',
            }}></View>
          <ScrollView>{veri}</ScrollView>
        </View>
      );
    } else {
      for (let index = 0; index < allWaitUsers.length; index++) {
        let renk = Math.floor(Math.random() * (999 - 100) + 100);
        renk = '#' + renk;
        veri.push(
          <View
            style={{
              borderWidth: 1,
              width: 325,
              height: 50,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 8,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 40, height: 40, tintColor: renk}}
                source={require('../asset/images/user_icon.png')}
              />
              <Text
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  fontSize: 20,
                  height: 50,
                  textAlignVertical: 'center',
                }}>
                {allWaitUsers[index]['name']}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  height: 50,
                  textAlignVertical: 'center',
                }}>
                {allWaitUsers[index]['surname']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  acceptFriend(
                    allWaitUsers[index]['name'],
                    allWaitUsers[index]['surname'],
                  );
                  reflesh();
                }}
                style={{
                  alignSelf: 'flex-end',
                  width: 60,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 0.1,
                  marginRight: 10,
                  backgroundColor: '#090',
                }}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    width: 60,
                    height: 36,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Kabul Et
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deniedFriend(
                    allWaitUsers[index]['name'],
                    allWaitUsers[index]['surname'],
                  );
                  reflesh();
                }}
                style={{
                  alignSelf: 'flex-end',
                  width: 60,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 0.1,
                  marginRight: 10,
                  backgroundColor: '#900',
                }}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    width: 60,
                    height: 36,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Red Et
                </Text>
              </TouchableOpacity>
            </View>
          </View>,
        );
      }
      son = (
        <View
          style={{
            width: 375,
            height: 600,
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 29.5,
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24}}>Arkdaşlık İstekleri</Text>
          <View
            style={{
              width: 350,
              borderWidth: 1,
              alignSelf: 'flex-start',
            }}></View>
          <ScrollView>{veri}</ScrollView>
        </View>
      );
    }

    return son;
  };

  const goFriendTakvim = (name,surname) =>{
    AsyncStorage.setItem('@selectedFriendName', name)
    AsyncStorage.setItem('@selectedFriendSurname', surname)
    navigation.navigate(FriendTakvim)
  }

  const Friends = () => {
    const veri = [];
    let son = '';
    for (let index = 0; index < allFriend.length; index++) {
      let renk = Math.floor(Math.random() * (999 - 100) + 100);
      renk = '#' + renk;
      veri.push(
        <View
          style={{
            borderWidth: 1,
            width: 325,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 40, height: 40, tintColor: renk, marginTop: 4}}
              source={require('../asset/images/user_icon.png')}
            />
            <Text
              style={{
                marginRight: 5,
                marginLeft: 5,
                fontSize: 20,
                height: 50,
                textAlignVertical: 'center',
              }}>
              {allFriend[index]['name']}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                height: 50,
                textAlignVertical: 'center',
              }}>
              {allFriend[index]['surname']}
            </Text>
          </View>
          <TouchableOpacity onPress={()=>{goFriendTakvim(allFriend[index]['name'],allFriend[index]['surname'])}}>
            <View style={{justifyContent: 'flex-end'}}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../asset/images/takvim.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>,
      );
    }
    return veri;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setRequestVisible(false);
        }}>
        <ModelIn />
      </Modal>
      <View
        style={{
          borderWidth: 1,
          width: 375,
          height: 600,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              width: 120,
              height: 40,
              backgroundColor: '#cfcfcf',
              marginTop: 20,
              borderRadius: 20,
              borderWidth: 0.8,
              marginRight: 10,
            }}>
            <Text
              style={{
                width: 120,
                height: 40,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Arkadaş Ekle
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setRequestVisible(true);
            }}
            style={{
              width: 120,
              height: 40,
              backgroundColor: '#cfcfcf',
              marginTop: 20,
              borderRadius: 20,
              borderWidth: 0.8,
            }}>
            <Text
              style={{
                width: 120,
                height: 40,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Arkadaş İstekleri
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: 350, borderWidth: 0.8, marginTop: 10}}></View>
        <View>
          <Friends />
        </View>
      </View>
    </View>
  );
};

export default Friends;
