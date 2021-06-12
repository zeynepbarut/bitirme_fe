import React, {Component, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import AllFriend from './AllFriend';
import AsyncStorage from '@react-native-async-storage/async-storage';

let items = [];

class NewActivity extends Component {
  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
    const stringifiedArray = JSON.stringify(selectedItems)
    AsyncStorage.setItem('@selectedFriend', stringifiedArray)
  };
  render() {
    const {selectedItems} = this.state;
    const GetAllFriend = () => {
      const friends = AsyncStorage.getItem('@friends')
        .then(req => JSON.parse(req))
        .then(json => items = json);

      return null;
    };
    return (
      <View>
        <View>
          <AllFriend />
          <GetAllFriend />
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Arkadaş Seçin"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#CCC"
            submitButtonText="Kaydet"
          />
        </View>
      </View>
    );
  }
}

export default NewActivity;
