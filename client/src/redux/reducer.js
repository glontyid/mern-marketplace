import { getItemsFromStorage } from "../helpers/helpers";
import { MARKET_ACTIONS } from "./variables";

const initialState = {
  catalogProducts: [],
  cartItems: getItemsFromStorage() || [],
  selectedProduct: null,
  loading: false
}

export const marketReducer = (state = initialState, action) => {
  const {type} = action

  switch (type) {
    case (MARKET_ACTIONS.ADD_TO_CART):
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    case (MARKET_ACTIONS.REMOVE_FROM_CART):
      return {
        ...state,
        cartItems: state.cartItems.filter(item => {
          return item.id !== action.payload
        })
      }
    case (MARKET_ACTIONS.CHECK_CART_ITEMS):
      return {
        ...state,
        cartItems: state.catalogProducts.filter(item => {
          return item === action.payload
        })
      }
    case (MARKET_ACTIONS.GET_CART_ITEMS):
      return {
        ...state,
        cartItems: state.catalogProducts.filter(item => {
          return action.payload.indexOf(String(item.id)) > -1
        })
      }
    case (MARKET_ACTIONS.CLEAR_CART_ITEMS):
      return {
        ...state,
        cartItems: []
      }
    case (MARKET_ACTIONS.GET_CATALOG_ITEMS):
      return {
        ...state,
        catalogProducts: action.payload
      }
    case (MARKET_ACTIONS.VIEW_PRODUCT):
      return {
        ...state,
        selectedProduct: action.payload
      }
    case (MARKET_ACTIONS.ADD_TO_DB):
      return {
        ...state,
        catalogProducts: [...state.catalogProducts, action.payload]
      }
    case (MARKET_ACTIONS.REMOVE_FROM_DB):
      return {
        ...state,
        catalogProducts: state.catalogProducts.filter(item => {
          return item.id !== action.payload
        })
      }
    case (MARKET_ACTIONS.CHANGE_CATALOG_ITEM):
      return {
        ...state,
        catalogProducts: state.catalogProducts.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }

          return item
        })
      }
    case (MARKET_ACTIONS.LOADER_ON):
      return {
        ...state,
        loading: true
      }

    case (MARKET_ACTIONS.LOADER_OFF):
      return {
        ...state,
        loading: false
      }
    default: return state
  }
}

