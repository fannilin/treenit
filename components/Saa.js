import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { deviceHeight, deviceWidth } from './koko';
import { Ionicons } from '@expo/vector-icons'; 

export default function Saa(props) {

  const [city, setCity] = useState('');
  

  return (
    <View>
        <ImageBackground source={require('../assets/vuoret.jpg')} 
        style={{height: deviceHeight, width: deviceWidth}} 
        imageStyle={{opacity: 0.7, backgroundColor: 'black'}}></ImageBackground>
      <View style={{position: 'absolute', alignItems: 'center', padding: 30}}>

        <Text style={{color: 'white', fontSize: 24, padding: 10, textAlign: 'center'}}>
        Check the weather and choose your gear accordingly</Text>

           <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
           Weather-appropriate equipment makes exercise more comfortable and prevents injuries</Text>

        <Text style={{color: 'white', fontSize: 30, paddingTop: 50}}>Search the City</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
        borderRadius: 20, borderWidth: 1, borderColor: 'white', marginTop: 20, paddingHorizontal: 10}}>
           <TouchableOpacity onPress={() => props.navigation.navigate('tulos',{ name: city })}> 
            <Ionicons name='md-search' color={'white'} size={22}/> 
            </TouchableOpacity>
            <TextInput value={city} onChangeText={city => setCity(city) } placeholder='city...' placeholderTextColor={'white'}
             style={{paddingHorizontal: 10, color: 'white', width: 200, height: 40, fontSize: 16}}></TextInput>
        </View>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
