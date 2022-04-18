import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import CartItem from "./cart-item/cart-item";
import CartDetail from "./cart-menu/cart-detail";
import {cartSum, getItemsFromStorage, getProductsId} from "../../helpers/helpers";
import { getCartItems } from '../../redux/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = getItemsFromStorage() || [];

  useEffect(() => {
    dispatch(getCartItems(cartItems))
  }, [dispatch])

  const cartProducts = useSelector(state => state.marketReducer.cartItems) || [];

  return (
    <div className="cart">
      <CartDetail ids={getProductsId(cartProducts)} sum={cartSum(cartProducts)}/>
      <div className="cart-items">
        {cartProducts.map((product, index) => <CartItem data={product} key={index}/>)}
      </div>
    </div>
  )
}

export default Cart