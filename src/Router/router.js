import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Views/_Login'
import _Dashboard from '../Views/Dashboard/_Dashboard';
import PostDetails from '../Views/PostDetails/PostDetails'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<_Dashboard />} />
                <Route path="/post" element={<PostDetails />}></Route>
            </Routes>
      </BrowserRouter>
    )
}

export default Router;