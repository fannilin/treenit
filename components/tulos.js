import { View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {API_KEY} from './hakeminen';
import { deviceHeight } from "./koko";
import { deviceWidth } from "./koko";

export default function Tulos(props) {
    const [data, setData] = useState();
    const {name} = props.route.params;

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
        )
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }, []);

    const Data = ({title, value}) => <View
    style={{flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'}} >
        <Text style={{color: 'lightblue', fontSize: 18}}>{title}</Text>
        <Text style={{color: 'white', fontSize: 18}}>{value}</Text>
    </View>
    
    return (
        <View>
        <ImageBackground source={require('../assets/vuoret.jpg')} 
        style={{height: deviceHeight, width: deviceWidth}} 
        imageStyle={{opacity: 0.7, backgroundColor: 'black'}}></ImageBackground>
        <View style={{ alignItems: 'center', position: 'absolute', paddingLeft: '30%', paddingRight: '30%'}}>
            { data ?  <View style= {{flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
             height: deviceHeight - 100}}>
                <View>
                <Text style={{color: 'white', fontSize: 42, paddingBottom:20, textAlign: 'center'}}> {name}</Text>
                <Text style={{color: 'white', fontSize: 22, textAlign: 'center'}}>{data['weather'][0]['main']}</Text>
                <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}> {(data['main']['temp'] - 273).toFixed(0)}&deg; C</Text>
                <Text style={{color: 'white', fontSize: 22, textAlign: 'center', paddingTop: 20 }}> Weather details</Text>
                <View>
               <Data value={data['wind']['speed']} title='Wind speed' />
               <Data value={data['main']['humidity']} title='Humidity %'/>
               <Data value={data['visibility']} title='Visibility m' />
                     </View>
       
                </View>
            </View>  : null }
        </View>
        </View>
    )
}