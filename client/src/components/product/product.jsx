import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addToCartFn, cartProductCheck, removeFromCartFn } from '../../helpers/helpers';
import { addToCart, removeFromCart } from '../../redux/actions';
import Preloader from '../common/preloader/preloader';
import './product.scss';

const Product = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(cartProductCheck(id));
  const history = useHistory();

  useEffect(() => {
    try {
      axios.get(`/api/catalog/${id}`, 
      {id}, 
      {headers: {'Content-Type': 'application/json'}})
      .then(resp => {
        setProduct(resp.data)
      })
    } catch (error) {
      console.log('error:', error)
    }
  }, [id])

  function addCartHandler() {
    dispatch(addToCart(id))
    addToCartFn(id)
    setAdded(true)
  }

  function removeCartHandler() {
    dispatch(removeFromCart(id))
    removeFromCartFn(id)
    setAdded(false)
  }

  return (
    <div className="product-wrapper">
      <button onClick={() => history.goBack()} className="cart__back">Назад</button>
      <div className="product">
        { product ?
        <React.Fragment>
        <div className="product__image">
          { !isLoaded ? <Preloader/> : false }
          <img src={product.image} className={isLoaded ? 'product__image-loaded' : 'product__image-loading'} onLoad={() => setIsLoaded(true)} alt={product.title} />
        </div>
        <div className="product__detail">
          <div className="product__detail-title">{product.title}</div>
          <div className="product__detail-description">
            {product.description}
          </div>
          <div className="product__detail-price">${product.price}</div>
          <div className="product__detail-actions">
          { 
            !added ?
            <button className="product__detail-cart" onClick={() => addCartHandler()}>Добавить в корзину</button>
            :
            <button className="product__detail-cart" onClick={() => removeCartHandler()}>Удалить из корзины</button>
          }
          </div>
        </div>
        </React.Fragment>
        : <Preloader/>}
      </div>
    </div>
  )
}

export default Product;