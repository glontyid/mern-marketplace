import axios from 'axios';
import React, {useState} from 'react';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { AuthContext } from '../../../context/auth-context';
import { clearCartFn } from '../../../helpers/helpers';
import { clearCartItems } from '../../../redux/actions';
import Alert from '../../common/alert/alert';

const CartDetail = ({sum, ids}) => {
  const {userId} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [activePopup, setActivePopup] = useState(false);
  const addCartHandler = useCallback(async (user, ids) => {
    try {
      await axios.put(`api/cart/order/${user}`, {user, ids},
      {
        headers: {'Content-Type': 'application/json'}
      })
      .then(() => {
        dispatch(clearCartItems());
        popupHandler();
        clearCartFn();
      })
    } catch (error) {
      console.log(error);
    }
  },[])

  function popupHandler() {
    setActivePopup(true);

    setTimeout(() => {
      setActivePopup(false);
    }, 3000)
  }

  return (
    <div className="cart-detail">
      <Alert text='Спасибо за покупку :)' activePopup={activePopup} />
      <Link to="/" className="cart__back">Вернуться к выбору товаров</Link>
      <div className="cart-detail__wrapper">
        <div className="cart-detail__cart-sum">Общая сумма товаров: ${sum.toFixed(2)}</div>
        <div className="cart-detail__payment">
          <button onClick={() => addCartHandler(userId, ids)}>Оплатить</button>
        </div>
      </div>
    </div>
  )
}

export default CartDetail