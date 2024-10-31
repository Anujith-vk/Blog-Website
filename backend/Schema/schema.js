const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const PostSchema=mongoose.Schema({
    userid:{
        type:String
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date
    }
})

const Users=mongoose.model('Users',UserSchema)
const posts=mongoose.model('posts',PostSchema)
module.exports={
    Users,
    posts
}