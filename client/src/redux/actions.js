import {MARKET_ACTIONS} from "./variables";

export const addToCart = (product) => ({type: MARKET_ACTIONS.ADD_TO_CART, payload: product})
export const removeFromCart = (id) => ({type: MARKET_ACTIONS.REMOVE_FROM_CART, payload: id})
export const checkCartItems = (id) => ({type: MARKET_ACTIONS.CHECK_CART_ITEMS, payload: id})
export const getCartItems = (ids) => ({type: MARKET_ACTIONS.GET_CART_ITEMS, payload: ids})
export const clearCartItems = () => ({type: MARKET_ACTIONS.CLEAR_CART_ITEMS})
export const getCatalogItems = (products) => ({type: MARKET_ACTIONS.GET_CATALOG_ITEMS, payload: products})
export const viewProduct = (product) => ({type: MARKET_ACTIONS.VIEW_PRODUCT, payload: product})
export const addToDB = (product) => ({type: MARKET_ACTIONS.ADD_TO_DB, payload: product})