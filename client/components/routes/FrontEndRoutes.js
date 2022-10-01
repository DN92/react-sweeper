import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';

function FrontEndRoutes() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default FrontEndRoutes;
