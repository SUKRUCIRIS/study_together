import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css'
import './index.css';

import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Signup from './pages/Signup.js';
import Chat from './pages/Chat.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/chat' element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
