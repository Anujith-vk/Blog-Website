import React, { useState } from 'react'
import '../Pages/Createblog.css'
import { ToastContainer } from 'react-toastify'
import { handleerror, handlesuccess } from '../Toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Createblog = () => {
  
  const navigate=useNavigate()
   
  const[input,setinput]=useState({
    author:'',
    title:'',
    content:''
  })

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setinput((input)=>({...input,[name]:value}))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const{author,title,content}=input;
    if(!author||!title||!content)
    {
      return handleerror("All Feilds Are Required ! Please Enter All The Details")
    }
    try {
      const token=localStorage.getItem('token')
      if(!token)
      {
        navigate('/login')
      }
      const response = await axios.post("https://blog-website-hhnu.onrender.com/Create/blog",{ author, title, content },{ headers: { Authorization: `Bearer ${token}` } }
      );
      
      if(response)
      {
        handlesuccess(response.data.message)
        setTimeout(() => {
          navigate('/home')
        },1000);
      }
    } catch (error) {
      if(error.response)
      {
        return handleerror(error.response.data.message)
      }
    }
  }
 

  return (
    <div className='main'>
      <div className="second">
        <h4 className='ti'>Write your Blog</h4>
        <form onSubmit={handleSubmit}>
          <div className='secondform'>
            <label htmlFor="author">Author</label>
            <input
              autoFocus
              type="text"
              placeholder='Enter Author Name'
              name='author'
              value={input.author}
              onChange={handleChange}
            />
          </div>
          <div className='secondform'>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder='Enter Title'
              name='title'
              value={input.title}
              onChange={handleChange}
            />
          </div>
          <div className='secondform'>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              className='contentspace'
              placeholder='Enter Your Blog'
              value={input.content}
              onChange={handleChange}
            />
          </div>
          <div className='but'>
            <button type='submit'>Post</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
  
}

export default Createblog