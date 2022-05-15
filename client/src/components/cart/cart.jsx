import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./cart-item/cart-item";
import CartDetail from "./cart-menu/cart-detail";
import {cartSum, getItemsFromStorage, getProductsId} from "../../helpers/helpers";
import { getCartItems } from '../../redux/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.marketReducer.cartItems) || [];
  const cartItems = getItemsFromStorage() || [];

  useEffect(() => {
    dispatch(getCartItems(cartItems));
  }, [])

  return (
    <div className="cart">
      <CartDetail ids={getProductsId(cartProducts)} sum={cartSum(cartProducts)}/>
      <div className="cart-items">
        {cartProducts.map((product, index) => <CartItem data={product} key={index}/>)}
      </div>
    </div>
  )
}

export default Cart;