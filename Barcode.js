import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import Billing from './Billing';
import Axios from 'axios'
import { View ,Text,StyleSheet,ToastAndroid,ImageBackground} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import Field from './Field';
import Btn from './Btn';
import {darkGreen,black, green,White} from './Constants';
import Background from './Background';
import wood2 from './wood2.png'
import {  DataTable ,Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// import {CameraScreen} from 'react-native-camera-kit';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { app_url } from './Ipaddress';
// import Filed_new from './Field_new';
// import RNFetchBlob from 'rn-fetch-blob';
// import { json } from 'express';






export default function Barcode() {
  const [product_code,setProductcode] = useState('')
  const [productcodeerror,setProducterror] = useState('')
  const [search_product,setSearch] = useState([])
  const [product_title,setproduct_title] = useState('')
  const [titleError,settitleerror] = useState('')
  const [amount_1,setAmount] = useState('')
  const [amount_error,setAmountError] = useState('')
  const {quantitys,setQuantity} = useState('')
  const [qtys,setqtyy] = useState('')
  const [quantityerror,setproductqtyerror] = useState('')
  // const [hasPermission, setHasPermission] = useState(null);
//   const [hasPermission, setHasPermission] = useState(null);
// const [scanned, setScanned] = useState(false);
// const [text, setText] = useState('Not yet scanned')
const [qraccess,setqraccess] = useState('')
const [search_complete,setsearch_complete] = useState(false)
const [total,setTotal] = useState('')
const [overall,setoverall] = useState(0)
const [printdata,setPrintdata] = useState([])
const [printtotal,setPrinttotal] = useState([])



const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Not yet scanned')

const askForCameraPermission = () => {
  (async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  })()
}

// Request Camera Permission
useEffect(() => {
  askForCameraPermission();
  // search_btn();
  // console.log('eeeeee',search_product)
 
},[]);

// useEffect(()=>{
//   console.log('enter useEffect')
// })

// What happens when we scan the bar code
const handleBarCodeScanned = ({ type, data }) => {
  // setScanned(true);
  setqraccess(true)
  setText(data)

  // let arrdata = data?.replace('\n')

  // const new_ddd = JSON?.parse(text).qr_data

//  console.log( "kkkkkkkkkkk",JSON?.parse(data).qr_data)
  // let arra = []
  // arra.push('\n ' + data)

  

  // const qr = (type,data)

  // const eee = qr.replace(/;/g, "\n")

  // console.log('qqqqqqqqqqqq',eee)

//  const qqq = Object.entries(qr)

  // for (const [key, value] of Object.entries(qr)) {
  //   console.log(`${value}`);
  // }
  // console.log('qqqqqqqqq',json.parse(arra[0]))
  // console.log('Type: ' + type + '\nData: ' + data)
  // console.log('arra',JSON?.parse(qr))
  // console.log('values',JSON?.parse(arra))
};

// Check permissions and return the screens
if (hasPermission === null) {
  return (
    <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
    </View>)
}
if (hasPermission === false) {
  return (
    <View style={styles.container}>
      <Text style={{ margin: 10 }}>No access to camera</Text>
      <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
    </View>)
}


  const handleproduct = (e)=>{
      // console.log('e',e)

      if(e!==''){
          setProductcode(e)
          setProducterror('')
         
      }else{
          setProducterror('plz enter product code')
      }
  }

  const handleTitle = (e)=>{
      console.log('e',e)

      if(e!==''){
          setproduct_title(e)
          settitleerror('')
      }else{
          settitleerror('plz enter product title')
      }

  }

  const amount = (e)=>{
      console.log('e',e)

  }

  const quantity = (e)=>{
      console.log('e',e)

  }

  const search_btn = async(e)=>{
      const url = 'http://192.168.0.104:7001/searchproduct'

      // e.preventDefault()

      const app_2 = `${app_url}`
      // console.log('appppppp',app_2)
      // console.log('urlrr',app_url)

      // console.log('post',app_url)
      Axios.post(`http://192.168.0.104:7001/searchproduct`,{
          product_code:product_code
      }).then((response)=>{
          // console.log('response',response?.data?.results)
          const seacr_product = response?.data?.results

          
          if(seacr_product.length>=1){
            let product_data=[]
            // product_data.concat(seacr_product)
            product_data.push(seacr_product)
          setSearch(search=>[...search,seacr_product])
          setsearch_complete(true)

          }else{
            ToastAndroid.showWithGravityAndOffset(
              "Product does not exit ",
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
            setsearch_complete(false)
            setProductcode('')
          }

          // console.log('formdata',fromdata?._parts[0])

        
          // console.log('prodddd',product_data)

          

          // const joined = product_data.concat(seacr_product)
          // console.log('product_data',joined)
          // setSearch(seacr_product => [seacr_product,...seacr_product] );
          // setSearch(seacr_product)
          // if(seacr_product.length>=1){
           
          // }else{
          //   setsearch_complete(false)
          // }
      }).catch(err=>console.log('errr',err))

  }

// console.log('====>',search_product)

const handleqtyfield =(text)=>{
console.log('enter',text)
// const field = e
// if(field!==''){
//   setQuantity(e)
//   console.log('enter')
// }

if(text!==''){
  setqtyy(text)
  setproductqtyerror('')

}else{
  // console.log('exit')
  setproductqtyerror('plz enter qty')

 

}

}
const handleclose =()=>{
  setqraccess(false)
  setScanned(false)
  setSearch([])
  setTotal('')
  
}
// console.log('qr_data',qr_data)
  // Return the View

  // console.log('qraccess',search_product.flat())

    const handleqty_change=(e,quantitys,data,amount)=>{
        console.log('eeeee',e)

        const product_codes = search_product.flat()

        // const check_qty = product_codes.filter(d=>d.product_code==e)

        //   const check_orfinal = check_qty.filter(d=>d.quantity==data)

        if(quantitys<=data){
          alert('plz enter low quantity')
        }else{
          // console.log('enter')
          const total  = amount*data
          console.log('total',total)

          const overall = total+0

          console.log('overrer',overall)

          setoverall(overall)

          // setTotal((state) => {
          //   const newObject = {...state.total};
          //   // newObject[`${index}`] = {value: total}
          //   return {objects: newObject }
          //  });
          let form_data = new FormData()

          // form_data.append(searchh=>[...searchh,total])

          // console.log('formdata',form_data)
          
          
          setTotal(total)

        }

        // console.log('dadada',quantitys<=data)



    }

    const handleprintdata =(row,total1)=>{

      // console.log('enter',row)
      let amount_1 = []
      amount_1.push({sum_amount:total1})
      // setPrintdata(dd=>[])
      setPrintdata(search=>[...search,row])
      // console.log('total',amount_1)
      setPrinttotal(search=>[...search,total1])

    
      

    }
// console.log('text',JSON?.parse(text))

  const orginal = search_product.flat()

  const new_data = printtotal?.reduce((a,b)=>a+b,0)

  console.log('scaaa',printdata)

 
  
  return (
    <ImageBackground source={wood2} style={{height:850}}>
      <ScrollView>
    <View style={styles.container}>

    <View  style={{marginLeft:100,width:230}}>
            

            <Field  placeholder='product code'    onChangeText={handleproduct}/>
            <View>
              <Text style={{color:'red'}}>{productcodeerror}</Text>
            </View>
            {/* <Field  placeholder='Quantity'  onChangeText={handleqtyfield}/>
            <View>
              <Text style={{color:'red'}}>{quantityerror}</Text>
            </View> */}

            <View >

            <Btn  textColor='white' disabled={(productcodeerror!=='')||(product_code=='')} Press={search_btn} bgColor={(productcodeerror!=='')||(product_code=='')?black:green} btnLabel="Search"    />

            <Btn textColor='white' Press={handleBarCodeScanned}  bgColor={black} btnLabel="scan qr"    />
            {/* <Btn textColor='white' Press={handleclose}  bgColor={black} btnLabel="Cancel"    /> */}


            </View>
            </View>
      <View >

      

            <View>

{
    

    search_complete?
    <View>
    <DataTable.Header style={{
flex: 2,
flexWrap: 'wrap',
borderColor: 'black',
borderWidth: 4,
width:390,
overflow: 'visible',
// marginLeft:10,
backgroundColor:'white',
// padding: 10

}}>
<DataTable.Title>product code</DataTable.Title>
<DataTable.Title>product title</DataTable.Title>
<DataTable.Title>amount</DataTable.Title>
<DataTable.Title>ava qty</DataTable.Title>
<DataTable.Title>qty</DataTable.Title>
<DataTable.Title>Total</DataTable.Title>


{/* <DataTable.Title>Qr genarate</DataTable.Title>
<DataTable.Title>Delete</DataTable.Title> */}



</DataTable.Header>

    {
        orginal?.map((data,index)=>{
            return(
<DataTable  style={{
// flex: 2,
// flexWrap: 'wrap',
borderColor: 'green',
borderWidth: 2,
width:390,
overflow: 'visible',
// marginLeft:-100,
backgroundColor:'white',
fontSize: 50, fontWeight: 'bold',
padding: 10
}}>
{/* <ScrollView > */}
<DataTable.Row key={data}>
<DataTable.Cell>{data.product_code}</DataTable.Cell>
<DataTable.Cell>{data.product_title}</DataTable.Cell>
<DataTable.Cell>{data.amount}</DataTable.Cell>
<DataTable.Cell>{data.quantity}</DataTable.Cell>
<DataTable.Cell  style={{flex: 1}}><TextInput style={{backgroundColor:'white',width:55}} onBlur={()=>handleprintdata(data,total)} onChangeText={(e)=>handleqty_change(data.product_code,data.quantity,e,data.amount)}/></DataTable.Cell>
     <DataTable.Cell>{total}</DataTable.Cell>

{/* <DataTable.Cell>{data.product_code==product_code?<Text  style={{width:100}} >{total}</Text>:''}</DataTable.Cell> */}

{/* <Button mode='contained' onPress={handleqr.bind(null,d.id)} >Genarate</Button>

// <Button mode='outlined'  style={{backgroundColor:'red'}} onPress={(d)=>handledelete(d.id)}>Delete</Button> */}



</DataTable.Row>
{/* </ScrollView> */}


</DataTable>
          )
        })
      }
      </View>             

      
:''

}


<View style={{alignItems:'center',padding:10}}>
        <Text style={{color:'green',backgroundColor:'white',width:100,height:30}}>Total:{new_data}</Text>
      </View>


<View style={{flex:1,flexDirection:'column',justifyContent:'center',padding:10}}>
  {/* <Btn btnLabel='print' bgColor={green}/> */}
  <Btn  btnLabel='cancel' Press={handleclose} bgColor='red' />
  {/* <Button style={{backgroundColor:'white',padding:10}} onPress={()=>handleclose}> Cancel</Button> */}
  {/* <Divider/> */}
  <Btn btnLabel='print' bgColor='white'  /> 
</View>


</View>



        {/* <Billing name = {qr_data} qr = {qraccess}/> */}
        <View > 
        {
          qraccess?
          <View>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 300, width: 400 }}
          
          /> 
      <Text style={styles.maintext}>{text}</Text>
          
             </View>:''
          
        }
        </View>
       
      </View>
      

      {/* {scanned && <Button title={'close'} onPress={() => setScanned(false)} color='tomato' />} */}
    </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 25,
    borderColor:'black',
    marginBottom:20,
    // borderWidth: 1,
    // marginTop:90
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    border:'1'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container_1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  
  },
  container_3: {
    padding: 5,
    borderColor:'black',
    marginBottom:10,
    borderWidth: 1,
    backgroundColor:'lightyellow'
  },
  container_4:{
    container: {
      padding: 5,
      borderColor:'black',
      marginBottom:10,
      borderWidth: 1,
    },
  
  },
  input: {
    height: 40,
    width:50,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
  },
});