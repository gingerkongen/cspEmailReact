import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './utils/ProtectedRoute';

import {AuthProvider} from './context/AuthContext';

function App() {


  return (
<BrowserRouter>
      <AuthProvider>
        
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomePage />} />
          </Route>

          <Route path='' element={<LoginPage />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
