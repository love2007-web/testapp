import logo from './logo.svg';
import React from 'react';
import './App.css';
import Signup from './Signup';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Edit from './Edit';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/edit/' element={<Edit/>}/>
     </Routes>
    </>
  );
}

export default App;
