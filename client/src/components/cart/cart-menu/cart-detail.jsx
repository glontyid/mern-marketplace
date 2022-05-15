import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../context/auth-context';
import { clearCartFn } from '../../../helpers/helpers';
import { clearCartItems } from '../../../redux/actions';
import Alert from '../../common/alert/alert';

const CartDetail = ({ids, sum}) => {
  const {userId} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [activePopup, setActivePopup] = useState(false);
  const history = useHistory();

  const addCartHandler = async (user, ids) => {
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
  }

  function popupHandler() {
    setActivePopup(true);

    setTimeout(() => {
      setActivePopup(false);
    }, 3000)
  }

  return (
    <div className="cart-detail">
      <Alert text='Спасибо за покупку :)' activePopup={activePopup} />
      <button onClick={() => history.goBack()} className="cart__back">Назад</button>
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