import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import Home from './components/home';
import Treenilom from './components/Treenilom';
import Saa from './components/Saa';
import { Ionicons } from '@expo/vector-icons'; 
import tulos from './components/tulos';

import { deviceHeight, deviceWidth } from './components/koko';


const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
  
    <ImageBackground source={require("./assets/puro.jpg")} 
        style={{height: deviceHeight, width: deviceWidth}} 
        imageStyle={{opacity: 0.7, backgroundColor: 'black'}}>
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 22, padding: 20}}>WELCOME TO THE TRAINING APP</Text>
  <View>
    <View style={{marginBottom: 20}}>
      <Button style={{padding:20}} color="#F3A144"
        title="Search workouts"
        onPress={() => navigation.navigate('home')}
      />
      </View>
      <View style={{marginBottom: 20}}>
       <Button style={{padding:20}} color="#F3A144"
        title="Add new workout"
        onPress={() => navigation.navigate('Treenilom')}
      /></View>
       <Button style={{padding: 20}} color="#F3A144" 
        title="Check weather"
        onPress={() => navigation.navigate('Saa')}
      /> 
      </View>
    </View>
    </ImageBackground>
  
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Welcome'}}/>
        <Stack.Screen name="home" component={Home} options={{title: 'Search'}}/>
        <Stack.Screen name="Treenilom" component={Treenilom} options={{title: 'Add new'}}/>
        <Stack.Screen name='Saa' component={Saa} options={{title: 'Weather'}} />
        <Stack.Screen name='tulos' component={tulos} options={{title: 'Current weather'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center'

  },
});