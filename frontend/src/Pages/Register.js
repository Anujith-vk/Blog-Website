import React, { useState } from 'react'
import '../App.css'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { handlesuccess,handleerror } from '../Toast'
import axios from 'axios'
const Register = () => {
    
    const navigate=useNavigate()

    const[input,setinput]=useState({
        name:'',
        phone:'',
        email:'',
        password:'',
    })

    const handlechange=(e)=>{
        const{name,value}=e.target;
        setinput((input)=>({...input,[name]:value}))
    }

    const handlesubmit=async (e)=>{
         e.preventDefault()
         const{name,phone,email,password}= input;
         if(!name||!phone||!email||!password)
         {
           return handleerror("All Feilds Are Required")
         }
         try {
            const response=await  axios.post('http://localhost:2000/Register',{name,phone,email,password})
            if(response)
            {
               handlesuccess(response.data.message)
              setTimeout(() => {
                navigate('/login')
              }, 1000);
            }
         } catch (error) {
            if(error.response)
            {
                handleerror(error.response.data.message)  
            }
            handleerror("unexpected error occured")
         }
    }

    return (
        <div className='container'>
            <div className='register-div'>
                <form className='formclass' onSubmit={handlesubmit}>
                    <h4>REGISTER</h4>
                    <div className='formdiv'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Enter Your Name' name='name' autoFocus value={input.name} onChange={handlechange} />
                    </div>
                    <div className='formdiv'>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" placeholder='Enter Your Phone' name='phone' value={input.phone} onChange={handlechange} />
                    </div>
                    <div className='formdiv'>
                        <label htmlFor="email">Email</label>
                        <input type='email' placeholder='Enter Your Email' name='email' value={input.email} onChange={handlechange} />
                    </div>
                    <div className='formdiv'>
                        <label htmlFor="password">Password</label>
                        <input type='password' placeholder='Enter Your Password' name='password' value={input.password} onChange={handlechange} />
                    </div>
                    <div className='formdiv'>
                        <button className='bu' type='submit'>Register</button>
                    </div>
                    <p>Already Have an Account? <Link to='/login'>Login</Link></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Register