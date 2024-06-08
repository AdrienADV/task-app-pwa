import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Home from './pages/Home/Home.jsx';
import Navigation from './components/Navigation.jsx';
import Profil from './pages/Profil/Profil.jsx';
import { useSelector } from 'react-redux';

const Router = () => {
  const isLogged = useSelector((state) => state.user.isCompleted);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/profil' element={isLogged ? <Profil /> : <Navigate to='/home' />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
