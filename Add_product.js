import {View, Text, Touchable, TouchableOpacity, TextInput} from 'react-native';
// import{Button,Checkbox,Form,Input }  from 'antd';

import React, { useState } from 'react';
import Btn from './Btn';
import { darkGreen, green,black } from './Constants';
import Axios from 'axios';



const Add_product = ({navigation})=>{

    const [product_code,setProductcode] = useState('')
    const [product_codeerror,setProducterror] = useState('')
    const [product_qty,setproductqty] = useState('')
    const [productqtyerror,setproductqtyerror] = useState('')
    const [product_title,setproduct_title] = useState('')
    const [titleError,settitleerror] = useState('')
    const [amount,setAmount] = useState('')
    const [amount_error,setAmountError] = useState('')
    

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
    let formdata = []
    formdata.push({product_code:product_code,product_title:product_title,product_qty:product_qty,amount:amount})

    console.log(formdata,'okokokoko')

    const url = 'http://192.168.0.104:7001/product'

    Axios.post(url,{
        formdata
    }).then((res)=>{
        console.log('response',res?.data.results?.affectedRows)

       const affectedRows = res?.data.results?.affectedRows

       if(affectedRows == 1){
        alert('ok')
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

    navigation.navigate('view_product')

}

// useEffect(() => {
//     let isAuth = localStorage.getItem("ecommerce")=="Email";
//     if(isAuth  !== null) {
//         navigation.navigate("/Add_product");
//     }
// }, []);
// console.log('title',titleError)

    return(

        <View style={{marginTop:100,marginLeft:20}}>

            
            <TextInput 
            
            
            placeholder="Product code"
            onChangeText={handleproductcode}
            />
            <Text style={{color:'red'}}>
                {product_codeerror}
            </Text>
             <TextInput 
            onChangeText={handleqty}
            
            placeholder="peoduct qutatity"
            // tyoe="number"
            />
              <Text style={{color:'red'}}>
                {productqtyerror}
            </Text>

            <TextInput 
            onChangeText={handletitle}
            
            placeholder="Product Title"/>
            <Text  style={{color:'red'}}>
                {titleError}
            </Text>
            
             <TextInput 
            
            placeholder="Product amount"
            multiline
            onChangeText={handleamount}
            
            />
             <Text  style={{color:'red'}}>
                {amount_error}
            </Text>

            {/* <button>Save</button> */}
            <Btn bgColor={green} textColor='white' btnLabel="Save" Press={handlesubmit} />


            <Btn bgColor={black} textColor='white' btnLabel="View Product" Press={ViewProduct} />



            
        </View>
    )
}

export default Add_product