import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { deviceHeight, deviceWidth } from './koko';
import { Ionicons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('treenidb.db');

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM treeni WHERE laji LIKE '%${searchText}%' OR pvm LIKE '%${searchText}%' OR analyysi LIKE '%${searchText}%'`,
        [],
        (_, {rows: {_array}}) => {
          setSearchResults(_array);
        },
      );
    });
  };

  return (
    
     <ImageBackground source={require('../assets/hike.jpg')} 
        style={{height: deviceHeight, width: deviceWidth}} 
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}>
          <View style={{padding: 45}}>
      <TextInput
        style={{height: 40, borderColor: 'white', borderWidth: 2, borderRadius: 50, paddingLeft: 10, color: 'white',marginTop: '50%'}}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholderTextColor={'white'} 
        placeholder="Search..."
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={({id}) => id.toString()}
        renderItem={({item}) => (
          <Text  style={{color: 'white', padding: 15}}>
            {item.laji} - {item.pvm} - {item.analyysi}
          </Text>
        )}
      /></View>
  </ImageBackground>
  );
};


export default SearchInput;


   