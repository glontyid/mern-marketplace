import {MARKET_ACTIONS} from "./variables";
import axios from 'axios';

export const addToCart = (product) => ({type: MARKET_ACTIONS.ADD_TO_CART, payload: product})
export const removeFromCart = (id) => ({type: MARKET_ACTIONS.REMOVE_FROM_CART, payload: id})
export const checkCartItems = (id) => ({type: MARKET_ACTIONS.CHECK_CART_ITEMS, payload: id})
export const getCartItems = (ids) => ({type: MARKET_ACTIONS.GET_CART_ITEMS, payload: ids})
export const clearCartItems = () => ({type: MARKET_ACTIONS.CLEAR_CART_ITEMS})
export const viewProduct = (product) => ({type: MARKET_ACTIONS.VIEW_PRODUCT, payload: product})
export const addToDB = (product) => ({type: MARKET_ACTIONS.ADD_TO_DB, payload: product})
export const removeFromDB = (id) => ({type: MARKET_ACTIONS.REMOVE_FROM_DB, payload: id})
export const changeCatalogItem = (product) => ({type: MARKET_ACTIONS.CHANGE_CATALOG_ITEM, payload: product})
export const getCatalogItems = () => {
  return async dispatch => {
    try {
      dispatch(loaderOn());
      await axios('/api/catalog/get').then(response => {
        dispatch({
          type: MARKET_ACTIONS.GET_CATALOG_ITEMS,
          payload: response.data
        });
        dispatch(loaderOff());
      });
    } catch (err) {
      console.log(err)
    }
  }
}
export function loaderOn() {
  return {
    type: MARKET_ACTIONS.LOADER_ON
  }
}
export function loaderOff() {
  return {
    type: MARKET_ACTIONS.LOADER_OFF
  }
}