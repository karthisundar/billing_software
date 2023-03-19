import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import Background from './Background';
// import Btn from './Btn';
// import { darkGreen, green } from './Constants';
import wood2 from './wood2.png'

const Home = (props) => {
  return (
    <Background source={wood2}>
      <View style={{ marginHorizontal: 40, marginVertical: 200 }}>
      <Text style={{ color: 'green', fontSize: 64 ,marginBottom:60}}>Welcome</Text>
      {/* <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Coding</Text> */}
      <View style={{marginRight:-10,marginBottom:10}}>
      <Button labelStyle={{ color: "white", fontSize: 23 }} style={{backgroundColor:'#2BB789',textColor :'white',marginBottom:40}} onPress={()=>props.navigation.navigate("Login")}>Login</Button>
      <Button labelStyle={{ color: "#2BB789", fontSize: 20 }} style={{backgroundColor:'white',textColor :'#2BB789'}} onPress={()=>props.navigation.navigate("Signup")}>Signup</Button>
      </View>
      
      
      {/* <Btn bgColor={green} sat textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} /> */}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;