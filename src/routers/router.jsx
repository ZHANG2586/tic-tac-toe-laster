import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home'

function routers(){
    return (
     <>
       <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/extend' element={<h1>项目功能扩展页</h1>} />
         </Routes>
       </BrowserRouter>
     </>
    )
}

export default routers;