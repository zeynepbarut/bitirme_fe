/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
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
} from 'react-native';

import MultiSelect from 'react-native-multiple-select';

const items = [
  {id: 1, isim: 'user 1'},
  {id: 2, isim: 'user 2'},
  {id: 3, isim: 'user 3'},
  {id: 4, isim: 'user 4'},
  {id: 5, isim: 'user 5'},
  {id: 6, isim: 'user 6'},
  {id: 7, isim: 'user 7'},
  {id: 8, isim: 'user 8'},
  {id: 9, isim: 'user 9'},
  {id: 10, isim: 'user 10'},
];

      const Profile = () => {
      const [selectedItems, setSelectedItems] = useState([]);
    
      const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
      };
    
      return (
        <View>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Seçilen Kişiler"
              searchInputPlaceholderText="Kullanıcı Ara"
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="green"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="red"
              selectedItemIconColor="red"
              itemTextColor="black"
              displayKey="isim"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="black"
              submitButtonText="Onayla"
            />
          </View>
      );
    };
    
    export default Profile;
    
    const styles = StyleSheet.create({
  
    });






