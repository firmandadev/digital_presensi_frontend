import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Laporan from './pages/Laporan'
import Error from './pages/Error';
import Success from './pages/Success.jsx'
import Loading from './container/Loading.jsx'
import Navbar from './container/Navbar.jsx';
import Presensi from './pages/Presensi';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Loading />
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route  path="/presensi/*" element={<Presensi />}/>
       <Route path="/laporan" element={<Laporan />}/>
       <Route path="/" element={<Home />}/>
       <Route path="*" element={<Error />}/>
      <Route path="/presensi/success/*" element={<Success />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
