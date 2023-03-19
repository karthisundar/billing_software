import React, { useState,useEffect } from 'react';
import {View, Text, Touchable, TouchableOpacity,Button} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
// import Field from './Field';
import {TextInput} from 'react-native';
import Axios from 'axios';
import {app_url} from './Ipaddress';
// import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({navigation}) => {

    const [name,setname] = useState('')
    const [emailError,setEmailerror] = useState('')
    const [Email,setEmail]= useState('')
    const [passworderror,setPassworderror] = useState('')
    const [password,setPassword] = useState('')


    const handlepassword =(e)=>{

      const password = e

      if(password!==''){
          // console.log('enter')
      setPassword(password)
      setPassworderror('')

      }else{
          // console.log('enterelse')
          setPassworderror('plz enter password')
      }


    }



    const handleEmail=(e)=>{
        // console.log('e',e.target.value)
        // console.log('text',e)

        const email_id = e

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


 if(reg.test(email_id) === false)
{
   
  setEmailerror('plz enter valid email')
  return false;

}
else
{
  // seterror[{email_error:"nvalid email address!"}]
  setEmail(email_id)
  setEmailerror('')

  console.log("error")
}
    }

    useEffect(()=>{
  handlesubmit()
},[])


    

    const handlesubmit = async()=>{
      // console.log('enter')
      // if(Email == ''|| password==''){
      //   alert('plzenter')
      // }else{
        

        
      // }
      const url = `${app_url}/login`

      const app_url_1 = 'http://192.168.0.104:7001/login'
      // console.log('apppp',url)

      // Axios.post(url,{
        
      // }).catch(error=>console.log('error',error))

     await Axios.post(url,{
      Email:Email,
      password:password
     }).then((response)=>{
      // console.log('response',response?.data?.results)
      const user_data = response?.data?.results
      // console.log('user',user_data[0].user_typeid)

      const userId = response?.data?.results[0].user_typeid
      

      if(user_data.length>=1){
        // console.log('enter')
        // navigation.replace('Home');
        // navigation.replace('Home')
        // navigation.navigate('Home')
        if(userId == 1){
          navigation.navigate('add_product')
          // AsyncStorage.setItem('user', 'Login')

        }else{
          navigation.navigate('barcode')
        }
        // localStorage.setItem('')
        

      }else{
        // console.log('enterelse')
      }
     }).catch(error=>console.log('e',error))

    //   Axios.post(`http://localhost:7001/login`,{
    //   Email:Email,
    //   password:password
      
    // })
    }
// console.log('name',password)

// console.log('app_url',app_url)

  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <TextInput
            placeholder="Email "
            keyboardType={'email-address'}
            // onChangeText={text => onChange({ name, type, text })}
            // onBlur={(text)=>handleEmail(text)}
            onChangeText={handleEmail}
            
          />
          <Text style={{color:'red'}}>
            {emailError}
          </Text>
          <TextInput placeholder="Password" onChangeText={handlepassword}  secureTextEntry={true} />
          <Text style={{color:'red'}}>
            {passworderror}
          </Text>
          {/* <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View> */}
          {/* <Button>Sigin in </Button> */}

          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login"   Press={handlesubmit} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;