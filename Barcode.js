import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import Billing from './Billing';
import Axios from 'axios'
import { View ,Text,StyleSheet,ToastAndroid,ImageBackground,Platform} from 'react-native';
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
import PrintPdf from './PrintPdf';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
// import Filed_new from './Field_new';
// import RNFetchBlob from 'rn-fetch-blob';
// import { json } from 'express';
// import Navbar from './Navbar'





export default function Barcode({navigation}) {
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
const [qrtext,setqrtext] = useState('')
const [qty_onchange,setQty]  =useState([])
const [mobile,setMobile] = useState('')
const [mobileerror,setmobileerror] = useState('')



const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Not yet scanned')
const [selectedPrinter, setSelectedPrinter] = useState();
const [Customer,setCustomername]  = useState('')
const [nameerror,setNameerror] = useState('')
const [updatestate,setUpdate] = useState([])

var new_table = '';
for (let i in printdata) {
  const item = printdata[i];
  new_table = new_table + `
  <tr>
    <td>${item.product_title}</td>
    <td>${item.quantity}</td>
    <td>${item.product_code}</td>
  </tr>
  `
}

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello World!
    </h1>
    <table>
    <tr>
      <th>product title</th>
      <th>quantity</th>
      <th>product code</th>
    </tr>
    ${new_table}
  </table>
  </body>
</html>
`;
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

  const product_codes = orginal?.map(d=>d.product_code)

  console.log('prrrrrr',product_codes)
 
},[orginal]);

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

  if(data==undefined){
    // console.log('enteeererok')
  }else{
    setScanned(true)
    setqrtext(data)
    Axios.post(`${app_url}/qrid`,{
      data:data
    }).then((response)=>{
      console.log('sssss',response?.data?.results)

      const qrsearch_data = response?.data?.results
      if(qrsearch_data.length>=1){
        // search_complete(true)
        // setSearch(search=>[...search,qrsearch_data])
        setSearch(search=>[...search,qrsearch_data])
        setsearch_complete(true)
        setqraccess(false)

        
      }
     })
    
  }

  // const qr = (type,data)

  // const eee = qr.replace(/;/g, "\n")

  // console.log('qqqqqqqqqqqq',eee)

//  const qqq = Object.entries(qr)

  // for (const [key, value] of Object.entries(qr)) {
  //   console.log(`${value}`);
  // }
  // console.log('qqqqqqqqq',json.parse(arra[0]))
 
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
      Axios.post(`${app_url}/searchproduct`,{
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
  setPrintdata([])
  setPrinttotal([])
  
}


    const handleqty_change=(e,quantitys,data,amount,index)=>{


      console.log('indes',e)

    //   let newArr = [...orginal,data];

    //   newArr[index] = data

    //   setQty(datas=>({
    //     ...datas,
    //     [index]: newArr
    //  }))


    // let newArr = [...orginal];
    // newArr[index] = data;
    // console.log('newewewe',newArr)

    // setQty(orginal?.map((product,i)=>(
      

    //   i === index?{...product,count_new:data}:{...product}
    // )))

   

   console.log('eeeeee0,e0',amount)

        // setQty(newArr)

      // console.log('newewewewew',newArr)

        if(quantitys<=data){
          alert('plz enter low quantity')
        }else{
          const total  = amount*data

          const overall = total+0

          setQty(datas=>({
            ...datas,
            // ['amount']: overall,
            [index]:overall
         }))

         setUpdate(dd=>({
          ...dd,
          [index]:overall
         }))


         const newArray = orginal.map((item, i) => {
          if (index === i) {
            return { ...item, ['count_new']: overall };
          } else {
            return item;
          }
        });
        console.log('newarray',newArray)

          setoverall(overall)

         
          setTotal(total)

        }

    }

    const handleprintdata =(row,total1,code,index)=>{
      let amount_1 = []
      amount_1.push({sum_amount:total1})

      setPrintdata(search=>[...search,row])      
      
      console.log('total1',total1)
      setPrinttotal(orginal.map((product,i)=>(
        i === index?{...product,count:total1}:printtotal
      )))
    }
    

    const print = async () => {

      const orginal_quantity = orginal?.map(d=>d.quantity)
      console.log('orginal',orginal_quantity)
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      await Print.printAsync({
        html: createDynamicTable(),
        printerUrl: selectedPrinter?.url, // iOS only
      });
        const url = `${app_url}/savebill`
      Axios.post(url,{

      }).then((response)=>{
        console.log('resonse',response)
      }).catch(err=>console.log('err',err))
    }
  
    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({
        html
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  
    const selectPrinter = async () => {
      const printer = await Print.selectPrinterAsync(); // iOS only
      setSelectedPrinter(printer);
    }
    const orginal = search_product.flat()

    const new_data = printtotal?.reduce((a,b)=>a+b,0)
  
   
    const createDynamicTable = () => {
      var table = '';
      for (let i in printdata) {
        const item = printdata[i];
        table = table + `
        <tr>
          <td>${item.product_title}</td>
          <td>${item.quantity}</td>
          <td>${item.product_code}</td>
        </tr>
        `
      }


      console.log(table);
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          
          tr:nth-child(even) {
            background-color: #dddddd;
          }
        </style>
        </head>
        <body>
        
        <h2>HTML Table</h2>
        
        <table>
          <tr>
            <th>product title</th>
            <th>quantity</th>
            <th>product code</th>
          </tr>
          ${table}
        </table>
        <h1>${new_data} </h1>
        
        </body>
      </html>
        `;
      return html;
    }

// console.log('text',JSON?.parse(text))

 


// let uniq_1 = printtotal => [...new Set(printtotal)];

// console.log('scaaa',printtotal)


// const Total_232 = ({ printtotal }) => (
//  <Text>
//     Price: 
//     {printtotal?.reduce((sum, i) => (
//       sum += i.count * i.price
//     ), 0)}
//   </Text>
// )\\


const handlemobile =(e)=>{
  // console.log('weeeeee',e)


  const mobile = e

  if(mobile.length==10){
    // console.log('enter')
    setmobileerror('')
    setMobile(mobile)
  }else{
    // console.log('exit')
    setmobileerror('plz enter 10 digit number')

    
  }
}

const handlelogout = ()=>{
  navigation.navigate('Login')

}

const flat_method = printtotal.flat()
//  console.log('Total_232',flat_method.reduce((sum, i) => (
//     // sum += parseInt(i.count * i.amount)

//     typeof(parseInt(i.amount))
    
//   // sum += parseInt(i.count * i.amount)
// ), 0))

// const sum = flat_method.reduce((accumulator, object) => {
//   // console.log('acccc',accumulator)
//   return  parseInt (accumulator+object.count + object.amount);
// }, 0);

let aa = []
aa.push(qty_onchange)


   const valuesset = Object.values(qty_onchange)
   const sum = valuesset?.reduce((partialSum, a) => partialSum + a, 0);
console.log('sum',sum);
var ttt = '';
const yyy = []

for (let i in qty_onchange) {
  const item = qty_onchange[i];
  yyy.push(item)
  ttt = item
  // console.log('ite,',item)
 
}

      const handlecustomername =(e)=>{
        // console.log('eeeee',e)

        if(e==''){
          setNameerror('plz enter name')
        }else{
          setCustomername(e)
          setNameerror('')
        }
      }

// const data_10 = orginal?.filter((e,i)=>{
//  console.log('e',e)
// })

// const rrremo = obj.Results.splice(-1);

let updateee = []

        updateee.push(updatestate)



   console.log('vvvvvvvvvvvv',updateee)

  // console.log('printtotal',yyy.forEach(y=>console.log('oooooo',y)))
  // console.log(Object.values(qty_onchange))

  return (
    <ImageBackground source={wood2} style={{height:850}}>
      <ScrollView>
    <View style={styles.container}>

    <View  style={{marginLeft:50,width:230}}>
            
              <View style={{width:200,marginLeft:60}}>
              <Field  placeholder='product code'    onChangeText={handleproduct}/>

              
            <View>
              <Text style={{color:'red'}}>{productcodeerror}</Text>
            </View>

            <Field  keyboardType={'numeric'} maxLength={10} placeholder='Contact Number'    onChangeText={handlemobile}/>

            <Text style={{color:'red'}}>{mobileerror}</Text>

            <Field   placeholder='Customer Name'    onChangeText={handlecustomername}/>

            <Text style={{color:'red',backgroundColor:'white',fontSize:20,marginRight:30,textAlign:'center'}}>{nameerror}</Text>

            </View>
            {/* <TextInput placeholder="Contact Number"   placeholderTextColor="#60605e"
          numeric
          keyboardType={'numeric'} maxLength={10} onChangeText={handlemobile} style={{ backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red'}} /> */}

          {/* <View>
            <Text style={{color:'red'}}>{mobileerror}</Text>
          </View> */}
            {/* <Field  placeholder='Quantity'  onChangeText={handleqtyfield}/>
            <View>
              <Text style={{color:'red'}}>{quantityerror}</Text>
            </View> */}

            <View >

            <Btn  textColor='white' disabled={(productcodeerror!=='')||(product_code=='')} Press={search_btn} bgColor={(productcodeerror!=='')||(product_code=='')?black:green} btnLabel="Search"    />

            <Btn textColor='white' Press={handleBarCodeScanned}  bgColor={black} btnLabel="Scan QR"    />
            {/* <Btn textColor='white' Press={handleclose}  bgColor={black} btnLabel="Cancel"    /> */}


            </View>
            </View>
      <View >

      

            <View>

{
    

    search_complete?
    <View>
    <DataTable.Header  style={{
borderColor: 'green',
borderWidth: 2,
width:390,
overflow: 'visible',
backgroundColor:'white',
fontSize: 50, fontWeight: 'bold',
padding: 10}}>
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
borderColor: 'green',
borderWidth: 2,
width:390,
overflow: 'visible',
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
<DataTable.Cell  style={{flex: 1}}><TextInput style={{backgroundColor:'white',width:55}} onBlur={()=>handleprintdata(data,total,data.product_code,index)} onChangeText={(e)=>handleqty_change(data.product_code,data.quantity,e,data.amount,index)}/></DataTable.Cell>
     
{updateee.map(d=> <DataTable.Cell >{d}</DataTable.Cell>)}
     {/* <DataTable.Cell>{sum}</DataTable.Cell> */}

</DataTable.Row>
{/* </ScrollView> */}


</DataTable>
          )
        })
      }
      </View>             

      
:''

}


{search_complete?<View style={{alignItems:'center',padding:10,display:'flex'}}>

        <Text style={{color:'white',backgroundColor:'green',width:100,height:30,marginLeft:280}}>Total:{sum}</Text>
      </View>:''}


<View style={{flex:1,flexDirection:'column',justifyContent:'center',padding:10,marginLeft:40}}>
  {/* <Btn btnLabel='print' bgColor={green}/> */}
  {/* <Button style={{backgroundColor:'white',padding:10}} onPress={()=>handleclose}> Cancel</Button> */}
  {/* <Divider/> */}
  <Btn btnLabel='print' disabled={search_complete===false||product_code==''||productcodeerror!==''||nameerror!==''||Customer==''} Press={print} bgColor={search_complete==true?'white':'white'}  /> 
  <Btn btnLabel='Print to PDF file' disabled={search_complete===true} Press={printToFile} bgColor='white'/>
  <Btn  btnLabel='cancel' Press={handleclose} bgColor='red' />
  <Btn  btnLabel='Logout' Press={handlelogout} bgColor='red' />


</View>
      <View>
        {/* <PrintPdf/> */}
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