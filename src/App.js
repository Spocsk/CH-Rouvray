import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


import Login from './Views/Login';
import Dashboard from './Views/Dashboard';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink to="/login">Login</NavLink><small>(Access without token only)</small>
            </div>
            <div className="content">
              <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;