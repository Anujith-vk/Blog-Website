const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('./database/db')
const port=process.env.port;
const Route=require('./Routes/Route')
const cors=require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(
    {
        origin:'https://blog-website-1-4svg.onrender.com',
        allowedHeaders:['GET','PUT','POST','DELETE']
    }
))
app.use('/',Route)

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})


