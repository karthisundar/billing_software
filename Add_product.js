import {View, Text, Touchable, TouchableOpacity, TextInput,ImageBackground,StyleSheet,ScrollView} from 'react-native';
// import{Button,Checkbox,Form,Input }  from 'antd';

import React, { useState } from 'react';
import Btn from './Btn';
import { darkGreen, green,black,red } from './Constants';
import Axios from 'axios';
import wood2 from './wood2.png'
import { app_url } from './Ipaddress';
import Logout from './Logout';
import { Checkbox,RadioButton } from 'react-native-paper';




const Add_product = ({route,navigation})=>{
    const {loginuser} = route.params


    const [product_code,setProductcode] = useState('')
    const [product_codeerror,setProducterror] = useState('')
    const [product_qty,setproductqty] = useState('')
    const [productqtyerror,setproductqtyerror] = useState('')
    const [product_title,setproduct_title] = useState('')
    const [titleError,settitleerror] = useState('')
    const [amount,setAmount] = useState('')
    const [amount_error,setAmountError] = useState('')
    const [search_product , setProduct] = useState('')
    const [editproduct,setEditproduct] = useState([])
    const [checked,setChecked] = useState('')
    

    const handleproductcode =(e)=>{
            const product = e
        // console.log('ee',e)
        if(product!==''){
            // console.log('enter')
            setProductcode(product)
            setProducterror('')
        }else{
            // console.log('else')
            setProducterror('plz enter code')

        }
    }

const handleqty = (e)=>{
  const  qty = e
    if(qty!==''){
        // console.log('enter')
        setproductqty(qty)
        setproductqtyerror('')
    }else{
        // console.log('else')
        setproductqtyerror('plz enter code')

    }
}

const handletitle =(e)=>{
    const title = e
    if(title!==''){
        // console.log('enter')
        setproduct_title(title)
        settitleerror('')
    }else{
        // console.log('else')
        settitleerror('plz enter code')

    }

}

const handleamount = (e)=>{
    const amount  = e

    if(amount !==''){
        setAmount(amount)
        setAmountError('')

    }else{
        setAmountError('plz enter amount')
    }

}


const handlesubmit=()=>{


    let product_type = checked == 0 ? 'kg':"qty"

    let formdata = []
    formdata.push({product_code:product_code,product_title:product_title,product_qty:product_qty,amount:amount,product_type:product_type})

    // console.log(formdata,'okokokoko')

    const url = `${app_url}/product`

    Axios.post(url,{
        formdata,
        loginuser:loginuser
    }).then((res)=>{
        // console.log('response',res?.data.results?.affectedRows)

       const affectedRows = res?.data.results?.affectedRows

       if(affectedRows == 1){
        alert('ok saved')
       }else{
        alert('did not saved ')
       }
    }).catch(error=>console.log('error',error))
    setAmount('')
    setProductcode('')
    setproduct_title('')
    setproductqty('')
    // localStorage.setItem('email','login')

}

const ViewProduct =()=>{

    navigation.navigate('view_product',{
        loginuser:loginuser
    })

}

const handlesearchBill =()=>{
    navigation.navigate('searchbill',{
        loginuser:loginuser
    })

}

// useEffect(() => {
//     let isAuth = localStorage.getItem("ecommerce")=="Email";
//     if(isAuth  !== null) {
//         navigation.navigate("/Add_product");
//     }
// }, []);
// console.log('title',titleError)

const styles = StyleSheet.create({

    input:{
        backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red',height:35
    }
})

const clear = ()=>{
    setAmount('')
    setProductcode('')
    setproduct_title('')
    setproductqty('')
    setAmount('')
}

        

        const handlesearch_product = ()=>{
            console.log('enter',search_product)
    navigation.navigate('edit_product',{
        loginuser:loginuser
    })


            
        }

          const handlelogout =()=>{
            navigation.navigate('Login')
        }

        const handlecheckbox =(e)=>{
                console.log('e0',e)
                if(e=='KG'){
                    console.log('enter')
                    setChecked(0)
                  }else{
                    setChecked(1)
            
                  }
        }

        // console.log('login',loginuser)

    return(
        <ScrollView>

        <ImageBackground style={{height:850}} source={wood2}>
        <View style={{marginTop:100,marginLeft:50}}>

            
            <TextInput 
            style={styles.input}
            
            
            value={product_code}
            placeholder="Product code"
            onChangeText={handleproductcode}
            />
            <Text style={{color:'red'}}>
                {product_codeerror}
            </Text>
             <TextInput 
            onChangeText={handleqty}
            style={styles.input}
            placeholder="product qutatity"
            value={product_qty}
            // tyoe="number"
            />
              <Text style={{color:'red'}}>
                {productqtyerror}
            </Text>

            <TextInput 
            onChangeText={handletitle}
            style={styles.input}
            value={product_title}
            placeholder="Product Title"/>
            <Text  style={{color:'red'}}>
                {titleError}
            </Text>
            
             <TextInput 
            style={styles.input}
            value={amount}
            placeholder="Product amount"
            multiline
            onChangeText={handleamount}
            
            />
             <Text  style={{color:'red'}}>
                {amount_error}
            </Text>


            <RadioButton.Group onValueChange={handlecheckbox} >
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>Kg</Text>
        <RadioButton status={checked==0?'checked':'unchecked'} value='KG' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>qty</Text>
        <RadioButton  status={checked==1?'checked':'unchecked'} value='QTY' />
      </View>
    </RadioButton.Group>

            {/* <button>Save</button> */}

            <Btn bgColor={(product_codeerror!==''||productqtyerror!==''||titleError!==''||amount_error!=='')||(product_code==''&&product_title==''&&product_qty==''&&amount=='')?green:black} textColor='white' disabled={(product_codeerror!==''||productqtyerror!==''||titleError!==''||amount_error!=='')||(product_code==''&&product_title==''&&product_qty==''&&amount=='')} btnLabel="Save" Press={handlesubmit} />

            <Btn bgColor={green} textColor='white' Press={handlesearchBill} btnLabel="Search Bill"  />

            <Btn bgColor={black} textColor='white' btnLabel="View Product" Press={ViewProduct} />          




            <Btn bgColor={black} textColor='white' Press={handlesearch_product} btnLabel="Edit Product"  />


           {/* <Logout/> */}
           <Btn bgColor='tomato' textColor='black' btnLabel="Clear" Press={clear} />

           <Btn btnLabel='Logout' bgColor='tomato' textColor='black' Press={handlelogout}/>
            
        </View>
        </ImageBackground>
        </ScrollView>

    )
}

export default Add_product