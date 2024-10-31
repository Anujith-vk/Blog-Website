import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Createblog from './Pages/Createblog'
import Myblogs from './Pages/Myblogs'
import Blogedit from './Pages/Blogedit'

const App = () => {

const ProtectedRoute=({element})=>{
  const token=localStorage.getItem('token')
  return token ? element : <Navigate to='/login'/>
}

  return (
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<ProtectedRoute element={<Home/>}/>}/>
        <Route path='/Blog/Create' element={<ProtectedRoute element={<Createblog/>}/>}/>
        <Route path='/My/Blogs' element={<ProtectedRoute element={<Myblogs/>}/>}/>
        <Route path='My/Blogs/Edit/:id' element={<ProtectedRoute element={<Blogedit/>}/>}/>
      </Routes>  
  )
}

export default App