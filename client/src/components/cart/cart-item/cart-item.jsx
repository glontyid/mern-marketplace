import React from 'react';
import '../cart.scss';
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../../redux/actions";
import {removeFromCartFn} from "../../../helpers/helpers";

const CartItem = ({data}) => {
  const dispatch = useDispatch();

  function removeCartItem(id) {
    dispatch(removeFromCart(id))
    removeFromCartFn(data.id)
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={data.image} alt={data.title}/>
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