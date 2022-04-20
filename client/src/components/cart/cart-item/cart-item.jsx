import React, { useState } from 'react';
import '../cart.scss';
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../../redux/actions";
import {removeFromCartFn} from "../../../helpers/helpers";
import Preloader from '../../common/preloader/preloader';

const CartItem = ({data}) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  function removeCartItem(id) {
    dispatch(removeFromCart(id))
    removeFromCartFn(id)
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        { !isLoaded ? <Preloader/> : false }
        <img 
          src={data.image} 
          className={!isLoaded ? 'cart-item__image-loading' : 'cart-item__image-loaded'} 
          alt={data.title}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="cart-item__description">
        <div className="cart-item__category">{data.category}</div>
        <div className="cart-item__title">{data.title}</div>
      </div>
      <div className="cart-item__price">${data.price}</div>
      <div className="cart-item__remove">
        <button type="button" onClick={() => removeCartItem(data.id)}>х</button>
      </div>
    </div>
  )
}

export default CartItem