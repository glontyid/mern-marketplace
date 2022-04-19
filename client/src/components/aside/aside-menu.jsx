import React from 'react';
import './aside-menu.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const AsideMenu = () => {
  const cartProductsCount = useSelector((state) => state.marketReducer.cartItems.length);

  return (
    <div className="aside-menu">
      <ul>
        <li className="aside-menu__item"><Link to="/">Каталог</Link></li>
        <li className="aside-menu__item">
          <Link to="/cart">
            Корзина {cartProductsCount > 0 ? <span>({cartProductsCount})</span> : false }
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AsideMenu;