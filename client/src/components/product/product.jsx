import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCartFn, cartProductCheck, removeFromCartFn } from '../../helpers/helpers';
import { addToCart, removeFromCart } from '../../redux/actions';
import Preloader from '../common/preloader/preloader';
import './product.scss';

const Product = ({data}) => {
  const [added, setAdded] = useState(cartProductCheck(data.id));
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  function addCartHandler() {
    dispatch(addToCart(data))
    addToCartFn(data.id)
    setAdded(true)
  }

  function removeCartHandler() {
    dispatch(removeFromCart(data.id))
    removeFromCartFn(data.id)
    setAdded(false)
  }

  return (
    <div className="product">
      <div className="product__image">
        { !isLoaded ? <Preloader/> : false }
        <img src={data.image} className={isLoaded ? 'product__image-loaded' : 'product__image-loading'} onLoad={() => setIsLoaded(true)} alt={data.title} />
      </div>
      <div className="product__detail">
        <div className="product__detail-title">{data.title}</div>
        <div className="product__detail-description">
          {data.description}
        </div>
        <div className="product__detail-price">${data.price}</div>
        <div className="product__detail-actions">
        { 
          !added ?
          <button className="product__detail-cart" onClick={() => addCartHandler()}>Добавить в корзину</button>
          :
          <button className="product__detail-cart" onClick={() => removeCartHandler()}>Удалить из корзины</button>
        }
        </div>
      </div>
    </div>
  )
}

export default Product;