const express=require('express')
const { Register, Login, CreatePost, UpdatePost, DeletePost, ShowAllBlog, ShowBlogs, DisplayBlogs, getUserPostById } = require('../controller/controller')
const isauthenticated = require('../middleware/middleware')

const Route=express.Router()

Route.post('/Register',Register)
Route.post('/Login',Login)
Route.post('/Create/blog',isauthenticated,CreatePost)
Route.put('/Blog/Update/:id',isauthenticated,UpdatePost)
Route.delete('/Blog/Delete/:id',isauthenticated,DeletePost)
Route.get('/Blog/Display',isauthenticated,ShowAllBlog)
Route.get('/Blogs/user',isauthenticated,DisplayBlogs)
Route.get('/Get/post/:id',isauthenticated,getUserPostById)
module.exports=Route