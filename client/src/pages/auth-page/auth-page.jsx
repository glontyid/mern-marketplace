import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth-context';
import './auth-page.scss';

const AuthPage = () => {
  const [form, setForm] = useState({email:'', password:'', admin: false});
  const {login, logout} = useContext(AuthContext);
  const [loginError, setLoginError] = useState(false);
  const hasLogin = form.email;
  const hasPassword = form.password;

  const inputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const checkboxHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.checked})
  }

  const registrationHandler = async () => {
    try {
      await axios.post('/api/auth/registration', {
        ...form,
        headers: {contentType: 'application/json'}
      }).then(resp => {
        window.location.href = '/login'
      })    
    } catch (error) {
      errorHandler();
      console.log(error)
    }
  }

  const loginHandler = async () => {
    try {
      await axios.post('/api/auth/login', {
        ...form,
        headers: {contentType: 'application/json'}
      }).then(resp => {
        login(resp.data.token, resp.data.userId, resp.data.isAdmin)
      })   
    } catch (error) {
      console.log(error)
      errorHandler()
    }
  }

  function errorHandler() {
    setLoginError(true)

    setTimeout(() => {
      setLoginError(false)
    }, 4000)
  }

  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          <div className='container'>
            <div className='auth-page'>
              <Route path='/login'>
                <h3>Авторизация</h3>
                <form className='auth-form' onSubmit={e => e.preventDefault()}>
                  <div className='auth-form__input-wrapper'>
                    <input type="text" name="email" onChange={inputHandler} />
                  </div>
                  <div className='auth-form__input-wrapper'>
                    <input type="password" name="password" onChange={inputHandler} />
                  </div>
                  <div className='auth-form__button-wrapper'>
                    <div className='auth-form__button-wrapper-inner'>
                      <button type="submit" className={hasLogin && hasPassword ? 'enabled' : 'disabled'} onClick={loginHandler}>Войти</button>
                      { loginError ? <span>Ошибка</span> : false }
                    </div>
                    <Link to='/registration'>Зарегистрироваться</Link>
                  </div>
                </form>
              </Route>
              <Route path='/registration'>
                <h3>Регистрация</h3>
                <form className='auth-form' onSubmit={e => e.preventDefault()}>
                  <div className='auth-form__input-wrapper'>
                    <input type="email" name="email" onChange={inputHandler} />
                  </div>
                  <div className='auth-form__input-wrapper'>
                    <input type="password" name="password" onChange={inputHandler} />
                  </div>
                  <div className='auth-form__input-wrapper'>
                    <input className="auth-form__input-wrapper-checkbox" type="checkbox" name="admin" id="admin" onChange={checkboxHandler}/>
                    <label htmlFor="admin">Администратор</label>
                  </div>
                  <div className='auth-form__button-wrapper'>
                    <div className='auth-form__button-wrapper-inner'>
                      <button type="submit" className={hasLogin && hasPassword ? 'enabled' : 'disabled'} onClick={registrationHandler}>Зарегистрироваться</button>
                      { loginError ? <span>Ошибка</span> : false }
                    </div>
                    <Link to='/login'>уже есть аккаунт?</Link>  
                  </div>
                </form>
              </Route>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default AuthPage;
