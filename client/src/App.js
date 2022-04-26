import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios'
import './App.scss';
import useRoutes from './routes';
import {AuthContext} from './context/auth-context';
import {useAuth} from './hooks/auth-hook';
import Navbar from './components/navbar/navbar';
import { useDispatch } from 'react-redux';
import { getCatalogItems } from './redux/actions';
import Preloader from './components/common/preloader/preloader';

function App() {
  const {login, logout, token, userId, isReady, admin} = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin, admin);

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin, admin}}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="app-content">
            {routes}    
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
