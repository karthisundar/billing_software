import {View, Text, Touchable, TouchableOpacity, TextInput,ImageBackground,StyleSheet,ScrollView} from 'react-native';
import Btn from './Btn';

// import React from 'react'

const  Logout=({route,navigation})=> {
    const handlelogout =()=>{
        navigation.navigate('edit_product')
    }
  return (
    <View>
    {/* <Btn btnLabel='Logout' Press={handlelogout} bgColor='red'/>   */}
    <Btn btnLabel='Logout' Press={handlelogout} bgColor='white'/>

    </View>
  )
}

export default Logout