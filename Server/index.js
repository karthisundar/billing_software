const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors')

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Karthi@123",
    database:"Kayal_akka"
})

app.post(`/login`,(req,res)=>{
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    const {Email,password}= req.body   
    console.log('email',Email)                                                                                                                                                                                                                                                     

    db.query(`SELECT * FROM usermaster ul where  ul.email_address  = '${Email}'  and ul.password_new  = '${password}'`,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post(`/checkemail`,(req,res)=>{

    console.log('req.body',req.body)

    const {email_id} = req.body

    console.log('email',email_id)

    db.query(`select ul.email_address from usermaster ul where ul.email_address ='${email_id}' `,(err,result)=>{
        if(err){
            // res.send(500).send({message:'error',error:err})
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log("result",result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })
})

app.post(`/view_product`,function(req,res){
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    // const {Email,password}= req.body                                                                                                                                                                                                                                                        

    db.query(`select * from product `,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post(`/product`,(req,res)=>{

    // const Email=req.body.email;

    const  {formdata} = req.body

    // const product_code_1 = formdata.map(d=>d.product_code)

    const product_code_1 = formdata.map(d=>d.product_code)
    const product = formdata.map(e=>e.product)
    const amount = formdata.map(f=>f.amount)
    // const quantity = formdata.map(j.quantity)
    const qty = formdata.map(s=>s.qty)

    // console.log("formdata",formdata)

    // const query_data = `insert into product (product_code,product_title,amount,quantity) values(?,?,?,?)`,[product_code_1,product,amount,quantity],(err,result)

    db.query(`insert into product (product_code,product_title,amount,quantity) values(?,?,?,?)`,[product_code_1,product,amount,qty],(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            // console.log("result",result)
        }
    })
   
 
})

// app.post(`/view_product`,(req,res)=>{
    
//     // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

//     // const {Email,password}= req.body                                                                                                                                                                                                                                                        

//     db.query(`select * from product   limit 2`,(err,result)=>{
//         if(err){
//             // console.log("hhhh",err)
        
//             res.status(500).send({message:"error",errors:err})

//         }else{
//             res.send({message:"sucess",results:result,errors:err})
//             // console.log("result",result)
//         }
//     })
// })

app.post('/signup',(req,res)=>{


    const {formdata} = req.body
    console.log('reqqqqq',formdata[0].Email)
    const first_name = formdata[0].firstname
    const lastname = formdata[0].lastname
    const email = formdata[0].Email
    const password = formdata[0].password
    const usertype = formdata[0].userType

    
    db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid) values(?,?,?,?,?)`,[first_name,lastname,email,password,usertype],(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
    
    // db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid) values[?,?,?,?,?]`,[formdata[0].firstname,formdata[0].lastname,formdata[0].email_id,formdata[0].password,formdata[0].userType],(err,result)=>{
    //     if(err){
    //         console.log('err',err)
    //     }else{
    //         console.log('result',result)
    //     }
    // })
})


///////search product

app.post('/searchproduct',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})

app.post('/qrsearch',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body
    console.log(product_code)


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            // res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            // res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})


db.connect((err)=>{
    err? console.log(err): console.log("connected")
})


app.listen(7001,()=>{
    console.log("server running port 7001")
})