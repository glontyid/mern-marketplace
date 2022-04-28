import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../catalog.scss';
import { useDispatch } from 'react-redux';
import {addToCart, removeFromCart, viewProduct} from '../../../redux/actions';
import { removeFromCartFn, addToCartFn, cartProductCheck } from '../../../helpers/helpers';
import Preloader from '../../common/preloader/preloader';

const CatalogItem = ({data}) => {
  const {title, image, price, oldPrice, id} = data;
  const dispatch = useDispatch();
  const [added, setAdded] = useState(cartProductCheck(id));
  const [isLoaded, setIsLoaded] = useState(false);

  function viewProductHandler() {
    dispatch(viewProduct(data))
  }

  function addCartHandler() {
    dispatch(addToCart(data))
    addToCartFn(id)
    setAdded(true)
  }

  function removeCartHandler() {
    dispatch(removeFromCart(id))
    removeFromCartFn(id)
    setAdded(false)
  }

  return (
    <div className="catalog__product">
      <Link to={`/catalog/${id}`} className="catalog__product-link" onClick={() => viewProductHandler()}>
        <div className="catalog__product-image">
          { !isLoaded ? <Preloader/> : false }
          <img 
            src={image} 
            className={!isLoaded ? 'catalog__product-image__loading' : 'catalog__product-image__loaded'} 
            alt={title} 
            onLoad={() => setIsLoaded(true)} 
          />
        </div>
        <div className="catalog__product-detail">
          <div className="catalog__product-title">
            {data.title}
          </div>
          <div className="catalog__product-price">
            ${price} 
            { oldPrice > price ? <span className="catalog__product-price-old">${oldPrice}</span> : false }
          </div>
        </div>
      </Link>
      {!added ?
        <button
          type="button"
          className="catalog__product-cart"
          onClick={() => addCartHandler(id)}>
          Добавить в корзину
        </button>
        :
        <button
          type="button"
          className="catalog__product-cart"
          onClick={removeCartHandler}>
          Удалить из корзины
        </button>
      }
    </div>
  )
}

export default CatalogItem
