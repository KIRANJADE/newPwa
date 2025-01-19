import React from 'react';
import Home from '../pages/home';
import Service from '../pages/service';
import { Route, Routes } from 'react-router-dom';

const CommonRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
        </Routes>
    );
};

export default CommonRoutes;