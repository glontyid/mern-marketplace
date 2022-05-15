import React, {useEffect} from 'react';
import './aside-menu-admin.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getItemsFromStorage } from '../../helpers/helpers';
import { getCartItems } from '../../redux/actions';

const AsideMenuAdmin = () => {
  const cartProductsCount = useSelector((state) => state.marketReducer.cartItems.length);
  const dispatch = useDispatch();
  const cartItems = getItemsFromStorage() || [];

  useEffect(() => {
    dispatch(getCartItems(cartItems));
  }, [])

  return (
    <div className="aside-menu">
      <ul>
        <li className="aside-menu__item"><Link to="/catalog">Каталог</Link></li>
        <li className="aside-menu__item">
          <Link to="/cart">
            Корзина {cartProductsCount > 0 ? <span>({cartProductsCount})</span> : false }
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AsideMenuAdmin;