import React, { useEffect, useState } from 'react';
import {View, Text, Touchable, TouchableOpacity, TextInput,StyleSheet} from 'react-native';
import Axios from 'axios';
// import { DataTable } from 'react-native-paper';
import {  DataTable ,Button,Modal,Portal,Provider} from 'react-native-paper';
// import { Button } from 'antd';
import QRCode from 'react-native-qrcode-svg';





const View_product =()=>{
    const [product,setProduct] = useState([])
    const [qr,setqr] = useState([])
    const [visible, setVisible] = useState(false);


    const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderColor:'black',
    marginBotto:10
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    border:'1'
  },
});


    const handleqr = (e,id)=>{
        console.log('enter',e)
        const filter = product.filter(d=>d.id ==1)
        console.log('id',filter)
        setqr(filter)
    }
    
    useEffect(()=>{

        const url = 'http://192.168.0.104:7001/view_product'

        Axios.post(url).then((response)=>{
            // console.log('response',response?.data?.results)
            const product = response?.data?.results
            setProduct(product)
            setVisible(true)

        })

    },[])

    

    // console.log('prod--------',product)
    return(

        <View style={{marginTop:100}}>
             <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>product code</DataTable.Title>
        <DataTable.Title>product title</DataTable.Title>
        <DataTable.Title>amount</DataTable.Title>
        <DataTable.Title>quantity</DataTable.Title>
        <DataTable.Title>Qr genarate</DataTable.Title>
        <DataTable.Title>Delete</DataTable.Title>



      </DataTable.Header>

            {
                product&&product?.map((d)=>{
                    return(
<DataTable style={styles.container}>
     
      <DataTable.Row>
        <DataTable.Cell>{d.product_code}</DataTable.Cell>
        <DataTable.Cell>{d.product_title}</DataTable.Cell>
        <DataTable.Cell>{d.amount}</DataTable.Cell>
        <DataTable.Cell>{d.quantity}</DataTable.Cell>
        <Button mode='contained' onPress={handleqr.bind(d,d.id)} >Genarate</Button>

        <Button mode='outlined'  style={{backgroundColor:'red'}} >Delete</Button>



      </DataTable.Row>
  
      
    </DataTable>
                    )

                })
            }
            {/* <View>
            <QRCode
      value="http://awesome.link.qr"
    />
            </View> */}
             {/* <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>Example Modal</Text>
        </Modal>
        <Button style={{marginTop: 30}} onPress={showModal}>
          Show
        </Button>
      </Portal>
    </Provider> */}


        </View>
    )


    
}

export default View_product