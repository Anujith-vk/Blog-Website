const mongoose=require('mongoose')
const data=mongoose.connect(process.env.db)
.then(()=>{
    console.log("database connected successfully"); 
})
.catch(()=>{
    console.log("failed to connect database");
    
})

module.exports=data;