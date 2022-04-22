import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './navbar.scss';

const Navbar = () => {
  const {logout, isLogin, admin} = useContext(AuthContext);
  
  return (
    <div className="navbar">
      <div className="logo">LOGO</div>
      { isLogin ? 
      <div className="navbar__menu">
      { admin ? <Link to="/admin/" className="btn btn-profile">Админ панель</Link> : false }
      <Link to="/" className="btn btn-profile">Главная</Link>
      <Link to="/profile" className="btn btn-profile">Профиль</Link>
      <button className="btn btn-logout" onClick={logout}>Выйти</button> 
      </div>
      : <Link to="/login" className="btn btn-login">Войти</Link>
      }
    </div>
  )
}

export default Navbar
