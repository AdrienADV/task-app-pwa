// Import React - Redux
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Home from './pages/Home/Home.jsx';
import Navigation from './components/Navigation.jsx';
import Profil from './pages/Profil/Profil.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
