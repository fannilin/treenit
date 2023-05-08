import { StyleSheet, Text, View , TextInput, Button, ImageBackground, FlatList, Alert} from 'react-native';
import React from 'react';
import {  useState, useEffect } from 'react';
import { deviceHeight, deviceWidth } from './koko';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('treenidb.db');

export default function Treenilom() {
  const [laji, setLaji] = useState('');
  const [pvm, setPvm] = useState('');
  const [analyysi, setAnalyysi] = useState('');
  const [treeni, setTreeni] = useState([]);
 
 

  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists treeni (id integer primary key not null, laji text, pvm text, analyysi text);');
    }, null, updateList);
    }, []);


  const saveItem = () => {
    db.transaction(tx => {
    tx.executeSql('insert into treeni (laji, pvm, analyysi) values (?, ?, ?);',
    [laji, pvm, analyysi]);
    }, null, updateList)
    }
    
    const updateList = () => {
      db.transaction(tx => {
      tx.executeSql('select * from treeni;', [], (_, { rows }) =>
      setTreeni(rows._array)
      );
      }, null, null), null;
      }
      
      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from treeni where id = ?;`, [id]);
          }, null, updateList
        )    
      }
        
        const listSeparator = () => {
          return (
            <View
              style={{
                height: 2,
                width: "100%",
                backgroundColor: "gray",
                marginTop: 10
              }}
            />
          );
        };
 
  return (
      <View>
        <ImageBackground source={require('../assets/vesi.jpg')} 
        style={{height: deviceHeight, width: deviceWidth}} 
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}></ImageBackground>
        <View style={styles.container}>
       <Text style={{fontSize: 20, marginBottom: 20, color: 'white'}}>Add new training</Text>
          <TextInput
            style={{width: 200, borderColor: 'white', borderWidth: 2, borderRadius: 50, padding: 10, marginBottom: 15, color: 'white'}}
              onChangeText={laji => setLaji(laji)}
                  value={laji}
                  title="laji"
                  placeholderTextColor={'white'}
                  placeholder='what sports..'
          />
          <TextInput
          style={{width: 200, borderColor: 'white', borderWidth: 2, borderRadius: 50, padding: 10, marginBottom: 15, color: 'white' }}
          placeholderTextColor={'white'}
         onChangeText={pvm => 
                  setPvm(pvm)}
                  value={pvm}
                  title="pvm"
                  placeholder='date..'
          /> 
           <TextInput
          style={{width: 200, height: 100, borderColor: 'white', borderWidth: 2, borderRadius: 30, padding: 10, marginBottom: 15, color: 'white'}}
         onChangeText={analyysi => 
                  setAnalyysi(analyysi)}
                  value={analyysi} 
                  title="analyysi"
                  placeholderTextColor={'white'}
                  placeholder="how was the training..."

          /> 
          
      
          <Button title="Save" onPress={saveItem} color="#68A864"/>
         
          <FlatList
          style={{}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
          <View style={styles.listcontainer}>
          <Text style={{color: 'white', paddingBottom: 10, paddingTop: 20}}>{item.laji} / {item.pvm} / {item.analyysi} </Text>
          <Button title='Delete' color= '#C70039' onPress={() => deleteItem(item.id)}></Button>
            </View>}
            data={treeni}
            ItemSeparatorComponent={listSeparator} />
            
          
          </View>
        
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25%',
  
  },
  listcontainer: {
    flexDirection: 'column',
 
    alignItems: 'center'
   }

});
