import React, { useEffect, useState } from 'react';
import {View, Text, Touchable, TouchableOpacity,TextInput,CheckBox} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Axios from 'axios'
// import { render } from 'react-dom';  
// import { CheckBox } from 'react-native-paper';
// import Field from './Field';

const Signup = props => {

    const[firstname,setfirstname] = useState('')
    const [fistnameerror,setfirstnameerror] = useState('')
    const[lastname,setlastname] = useState('')
    const [lastnameError,setlastnameerror] = useState('')
    const [Email,setEmail] = useState('')
    const[Emailerror,setEmailerror] = useState('')
    const [mobilenumber,setmobilenumber] = useState('')
    const [mobileerror,setmobileerror] = useState('')
    const [password,setPassword] = useState('')
    const [passworderror,setpassworderror] = useState('')
    const [formdata,setFormdata] = useState([])

    const handlefirstname=(e)=>{
      console.log('e',e)
      if(e!==''){
        setfirstname(e)
        setfirstnameerror('')

      }else{
        setfirstnameerror('plz enter firstname')
      }

    }

    const hanldelastname = (e)=>{
      console.log('e',e)

      if(e!==''){
        // console.log('ok')
        setlastname(e)
        setlastnameerror('')
      }else{
        // console.log('illa')
        setlastnameerror('plz enter last name ')
      }

    }
    // useEffect((e)=>{
    //   handleEmail() 
    //  })

    const handleEmail = async (e)=>{

      const email_id = e

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const url = 'http://192.168.0.104:7001/checkemail'

      

    // await  Axios.post(url,{
    //     email:email_id
    //   }).then((response)=>{
    //     // console.log('response',response?.data?.results)
    //   })

     

     if(reg.test(email_id) === false)
      {
        console.log("enterere")
 
      setEmailerror('plz enter valid email')
    // return false;

    } 
    else
      {
       
  
// seterror[{email_error:"nvalid email address!"}]
    setEmail(email_id)
    setEmailerror('')

    console.log("error")
    await Axios.post('http://192.168.0.104:7001/checkemail',{
      email_id
      }).then((response)=>{
        console.log('console',response?.data?.results.length)
        const result = response?.data?.results.length
        if(result == 1){
          setEmailerror('email allready exit')
        }else{
          setEmailerror('')
        }
      })
      }

    }

   

    const handlemobile = (e)=>{
      console.log('e',e.length)

      if(e.length<=10){
        setmobileerror('')
        setmobilenumber(e)
      }else{
        setmobileerror('plz enter correct mobile number')
      }

    }

    const handlepassword = (e)=>{

      const password_reg=   new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if (password_reg.test(e)===false) {
      console.log("enterif")
      setpassworderror('error in password plz fill strong password ')
      return false;
    } else {
      setPassword(e)
      console.log("enterelse")

      setpassworderror('')
      // setPaswword(password)
    }

    }

    const handlesubmit = ()=>{
      console.log('enter')
     let from_data = []
     from_data.push({firstname:firstname,lastname:lastname,Email:Email,mobilenumber:mobilenumber,password:password})

     const url = 'http://192.168.0.104:7001/signup'

     Axios.post(url,{
      formdata:from_data
     }).catch(error=>console.log('error',error))
    }
    
    // console.log('eeee',Emailerror)
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <TextInput placeholder="First Name" onChangeText={handlefirstname}/>
          <Text style={{color:'red'}}>{fistnameerror}</Text>
          <TextInput placeholder="Last Name" onChangeText={hanldelastname} />
          <Text style={{color:'red'}}>{lastnameError}</Text>

          <TextInput
            placeholder="Email "
            keyboardType={'email-address'}
            onChangeText={handleEmail}
          />
          <Text style={{color:'red'}}>{Emailerror}</Text>

          <TextInput placeholder="Contact Number" keyboardType={'number'}  onChangeText={handlemobile}/>
          <Text style={{color:'red'}}>{mobileerror}</Text>

          <TextInput placeholder="Password" secureTextEntry={true} onChangeText={handlepassword} />
          <Text style={{color:'red'}}>{passworderror}</Text>

          {/* <TextInput placeholder="Confirm Password" secureTextEntry={true} /> */}
          

         
                {/* <input type='checkbox' name='admin'/> */}
                {/* <CheckBox
                  // value={'item.isChecked'}
                 
                /> */}

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={
              handlesubmit
              // alert('Accoutn created');
              // props.navigation.navigate('Login');
            }
            disabled={(Emailerror!==''||lastnameError!==''||fistnameerror!==''||mobileerror!==''||passworderror!=='')
          ||(Email ==''||password==''||mobilenumber==''||firstname==''||lastname=='')
          }
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;