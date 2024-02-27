// Import React - Redux
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home/Home.jsx';
import Navigation from './components/Navigation.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
