import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import {handleerror } from '../Toast'
import '../Pages/Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Home = () => {

const navigate=useNavigate()  

const[blogs,setblogs]=useState([])



useEffect(() => {
  
const fetchdata=async function (req,res) {
  const token=localStorage.getItem('token')
  if(!token)
  {
    handleerror("Not Authenticate")
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
  try {
    const response=await axios.get('https://blog-website-hhnu.onrender.com/Blog/Display',{headers:{Authorization:`Bearer ${token}`}})
  if(response)
  {
    setblogs(response.data.blogs)
  }
  } catch (error) {
    handleerror(error.response.data.message)
  }
  
}
  fetchdata()
})



const handleCreate=()=>{
  navigate('/Blog/Create')
}

const HandleLogout=()=>{
  localStorage.removeItem('token')
  navigate('/login')
}

const myBlogs=()=>{
  navigate('/My/Blogs')
}
  
  return (
<div className='one'>
<nav>
                <div className="navbar">
                    <img src={require('../logo.jpg')} alt="Logo" className="logo" />
                    <div className="nav-links">
                        <li  onClick={handleCreate}>Create Blog</li>
                        <li  onClick={myBlogs}>My Blogs</li>
                        <li onClick={HandleLogout}>Logout</li>
                    </div>
                </div>
            </nav>
        <div className="two">
            { blogs.map((blog) => (
                    <div className="mycont" key={blog._id}>
                        <div className="mytitle">
                            {blog.title}
                        </div>
                        <div className="details">
                            <div className="author">
                                Author: {blog.author}
                            </div>
                            <div className="datetime">
                                <li>Created On: {blog.createdAt}</li>
                                <li>Updated On: {blog.updatedAt}</li>
                            </div>
                        </div>
                        <div className="bcontent">
                            {blog.content}
                        </div>
                    </div>
                ))}
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Home