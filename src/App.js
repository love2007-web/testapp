import logo from './logo.svg';
import React from 'react';
import './App.css';
import Signup from './Signup';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
    </>
  );
}

export default App;
