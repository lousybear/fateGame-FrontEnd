import { useState } from 'react';
import { StyleSheet, TouchableOpacity,TextInput  } from 'react-native';
const webSocketServer = require("websocket").server;
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';
const baseUrl ='https://fategamev1.herokuapp.com';

export default function TabTwoScreen() {


const client = new WebSocket('ws://13.126.249.51:8000');
// Invoking get method to perform a GET request
//const client = new webSocketServer('ws://fategamev1.herokuapp.com:8000');
 const [count, setCount] = useState<string>("16");
 const [side,setSide]=useState<string>("");

client.onopen = () => {
  console.log("WebSocket Client Connected");
};

client.onmessage = (message:any) => {
  console.log(message);
};
client.onmessage = (message:any) => {
    const dataFromServer = JSON.parse(message.data);
    setCount(dataFromServer.winner);
    console.log("data============"+dataFromServer);
  };
   const onPress = () =>{ 
     try {
      const response =  axios.post(`${baseUrl}/api/v1/coin`, {
       "amt": count ,
        "side": "T" ,
        "userId" : "usr1233"
      });
     response.then((result)=>{
      console.log(result.status)
     })
    } catch (error) {
      alert("An error has occurred");
    
    } 
    console.log("Api2 called")};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      
      <TextInput  style={styles.input}
        value={count}
         placeholder="useless placeholder"
      />
       <TextInput  style={styles.input} value={side}  placeholder="useless side" />
       
      <TouchableOpacity onPress={onPress} style={styles.button} > 
       
       <Text>Bet</Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }, input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
