import {View, Text, Touchable, TouchableOpacity, TextInput,ImageBackground,StyleSheet,ScrollView} from 'react-native';
import wood2 from './wood2.png'
import React, { useState } from 'react'
import Btn from './Btn';
import { darkGreen, green,black,red,blue } from './Constants';
import { Drawer } from 'react-native-paper';
import Navbar from './Navbar';



export default function SearchBill() {
        const [search,setSearch] = useState('')
        const [bill,setBill] = useState('')
        const [billerror,setBillerror] = useState('')

    

const styles  = StyleSheet.create({
    image:{
        height:870
    },
    container:{
        marginTop:120,
        justifyContent:'center'
    },
    input:{
        backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red'
    }
})


    const handlesearchBill=()=>{
        console.log('enter')

    }

    const handlebill=(e)=>{
        console.log('e',e)

        if(e==''){
            setBillerror('plz enter bill number')
        }else{
            setBillerror('')
            setBill(e)
        }
    }
  return (
    <ImageBackground style={styles.image} source={wood2}>
    <View style={{marginTop:200,marginLeft:50}}>
        
    <TextInput 
            onChangeText={handlebill}
            style={styles.input}
            placeholder="Enter Bill No"
            // value={product_qty}
            // tyoe="number"
            />
            <View>
                <Text style={{color:'red'}}>{billerror}</Text>
            </View>

            <Btn bgColor={(billerror!==''||bill=='')?green:blue} disabled={(billerror!==''||bill=='')} textColor='white' Press={handlesearchBill} btnLabel="Search Bill"  />
        {/* <Navbar/> */}
    </View>
    </ImageBackground>
  )
}