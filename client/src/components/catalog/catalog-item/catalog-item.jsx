import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../catalog.scss';
import { useDispatch } from 'react-redux';
import {addToCart, removeFromCart, viewProduct} from '../../../redux/actions';
import { removeFromCartFn, addToCartFn, cartProductCheck } from '../../../helpers/helpers';
import Preloader from '../../common/preloader/preloader';

const CatalogItem = ({data}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(cartProductCheck(data.id));
  const [isLoaded, setIsLoaded] = useState(false);

  function viewProductHandler() {
    dispatch(viewProduct(data))
  }

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
    <div className="catalog__product">
      <Link to={`/catalog/${data.id}`} className="catalog__product-link" onClick={() => viewProductHandler()}>
        <div className="catalog__product-image">
          { !isLoaded ? <Preloader/> : false }
          <img 
            src={data.image} 
            className={!isLoaded ? 'catalog__product-image__loading' : 'catalog__product-image__loaded'} 
            alt={data.title} 
            onLoad={() => setIsLoaded(true)} 
          />
        </div>
        <div className="catalog__product-detail">
          <div className="catalog__product-title">
            {data.title}
          </div>
          <div className="catalog__product-price">
            ${data.price} 
            { data.oldPrice ? <span className="catalog__product-price-old">${data.oldPrice}</span> : false }
          </div>
        </div>
      </Link>
      {!added ?
        <button
          type="button"
          className="catalog__product-cart"
          onClick={() => addCartHandler(data.id)}>
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
