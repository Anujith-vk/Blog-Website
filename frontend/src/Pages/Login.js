import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleerror, handlesuccess } from '../Toast'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate()

    const [input, setinput] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setinput((input) => ({ ...input, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = input;
        if (!email || !password) {
            handleerror("All Feilds Are Required")
        }
        try {
            const response = await axios.post('https://blog-website-hhnu.onrender.com/Login', { email, password })
            if (response) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    handlesuccess(response.data.message)
                    setTimeout(() => {
                        navigate('/home') 
                    }, 500);
                    
                }
                else
                {
                    handleerror(response.data.messages)
                }
            }
        } catch (error) {
            if (error.response) {
                handleerror(error.response.data.message)
                if(error.response.data.message==='User Not Registered ! Please Register')
                {
                    setTimeout(() => {
                        navigate('/register')
                    }, 1000);
                }
            }

        }

    }

    return (
        <div className='container'>
            <div className='main-content'>
                <form onSubmit={handleSubmit} className='formclass'>
                    <h4>LOGIN</h4>
                    <div className='formdiv'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type='email' 
                            placeholder='Enter Your Email' 
                            name='email' 
                            autoFocus 
                            value={input.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='formdiv'>
                        <label htmlFor="password">Password</label>
                        <input 
                            type='password' 
                            placeholder='Enter Your Password' 
                            name='password' 
                            value={input.password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='formdiv'>
                        <button className='bu'>LOGIN</button>
                    </div>
                    <p>Don't Have an Account? <Link to='/register'>Register</Link></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login