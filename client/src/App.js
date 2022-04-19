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

function App() {
  const {login, logout, token, userId, isReady, admin} = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      axios.get('/api/catalog/get', {headers: {contentType: 'application/json'}}).then(resp => {
        dispatch(getCatalogItems(resp.data));
        setIsLoaded(true);
      })   
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin, admin}}>
      <div className="app">
        <BrowserRouter>
          {
          isLoaded ?
            <React.Fragment>
              <Navbar />
              <div className="app-content">
                {routes}    
              </div>
            </React.Fragment>
          : 'загрузка'
          }
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
