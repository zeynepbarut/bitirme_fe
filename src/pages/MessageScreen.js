import React, {useState, useEffect, useRef} from 'react';

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
  LogBox,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Arrow, CalendarList, Agenda} from 'react-native-calendars';
import Camera from './Camera';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const MessageScreen = (props) => {
  const [value, onChangeText] = React.useState('Notunuzu Buraya Giriniz');
  const [messageData, setMessageData] = useState('');
  const scrollViewRef = useRef();
  const navigation = useNavigation(); 
  useEffect(async () => {
    getMessage(props.etkinlikId);
  }, []);

  const getMessage = async etkinlik => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        activityId: etkinlik,
      }),
    };
    await fetch('http://172.28.1.143:5000/api/auth/get-message', requestOptions)
      .then(res => res.json())
      .then(body => setMessageData(body));
  };

  const sendMessage = async (user, etkinlik) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'text/plain'},
      body: JSON.stringify({
        userId: user,
        activityId: etkinlik,
        message: value,
      }),
    };
    await fetch(
      'http://172.28.1.143:5000/api/auth/send-message',
      requestOptions,
    )
      .then(res => res.json())
      .then(body => console.log(body));
  };

  const MessageView = activeUser => {
    let veri = [];
    for (let index = 0; index < messageData.length; index++) {
      if (messageData[index]['user_id'] == activeUser) {
        veri.push(
          <View
            style={{
              marginLeft: 35,
              borderWidth: 1,
              width: 250,
              height: 60,
              marginBottom: 10,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 3,
              }}>
              <Text>{messageData[index]['name']}</Text>
              <Text>{messageData[index]['dateTime']}</Text>
            </View>

            <Text style={{padding: 3}}>{messageData[index]['text']}</Text>
          </View>,
        );
      } else {
        veri.push(
          <View
            style={{
              marginRight: 35,
              borderWidth: 1,
              width: 250,
              height: 60,
              marginBottom: 10,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 3,
              }}>
              <Text>{messageData[index]['name']}</Text>
              <Text>{messageData[index]['dateTime']}</Text>
            </View>

            <Text style={{padding: 3}}>{messageData[index]['text']}</Text>
          </View>,
        );
      }
    }
    return veri;
  };

  return (
    <View style={styles.blackBackground}>
      <ScrollView>
        <View style={styles.poupContainer}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 635,
            }}>
            <View
              style={{
                width: 300,
                height: 500,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View
                style={{
                  width: 300,
                  height: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ScrollView
                  ref={scrollViewRef}
                  onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({animated: false})
                  }>
                  {MessageView(props.userId)}
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                width: 300,
                height: 100,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: 230,
                  height: 80,
                  backgroundColor: '#efefef',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
                editable
                multiline
                numberOfLines={5}
                maxLength={150}
                onChangeText={text => onChangeText(text)}
                value={value}></TextInput>
              <View>
                <View>
                  <TouchableOpacity
                    style={{marginRight: 2}}
                    onPress={()=>{ navigation.navigate('Camera')}}>
                    <Text
                      style={{
                        width: 50,
                        height: 40,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        backgroundColor: '#cfcfcf',
                        borderRadius: 10,
                        marginBottom:10
                      }}>
                      Kamera
                    </Text>
                  </TouchableOpacity>
                </View>
                <View><TouchableOpacity
                    style={{marginRight: 2}}
                    onPress={() => {
                      sendMessage(props.userId, props.etkinlikId);
                      getMessage(props.etkinlikId);
                      MessageView(props.userId);
                      onChangeText('');
                    }}>
                    <Text
                      style={{
                        width: 50,
                        height: 40,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        backgroundColor: '#cfcfcf',
                        borderRadius: 10,
                      }}>
                      Gönder
                    </Text>
                  </TouchableOpacity></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MessageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  takvimContainer: {
    marginTop: 10,
    paddingTop: 10,
    width: 350,
    height: 390,
    borderWidth: 1.3,
    borderRadius: 10,
    borderColor: 'black',
  },
  poupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 350,
    backgroundColor: 'white',
    borderWidth: 1.3,
    borderRadius: 10,
    opacity: 1,
  },
  blackBackground: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000,
    height: 1000,
  },
});
