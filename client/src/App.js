import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.scss';
import useRouters from './routes';
import {AuthContext} from './context/auth-context';
import {useAuth} from './hooks/auth-hook';
import Navbar from './components/navbar/navbar';
import { useDispatch } from 'react-redux';
import { getCatalogItems } from './redux/actions';

function App() {
  const {login, logout, token, userId, isReady, admin} = useAuth();
  const isLogin = !!token;
  const routes = useRouters(isLogin, admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogItems())
  }, [])

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
