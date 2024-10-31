const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('./database/db')
const port=process.env.port||4000;
const Route=require('./Routes/Route')
const cors=require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(
    {
        origin: 'https://blog-website-frontend-p34u.onrender.com'
    }
))
app.use('/',Route)

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})


