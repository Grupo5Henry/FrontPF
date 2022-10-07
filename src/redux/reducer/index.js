import { act } from "react-dom/test-utils";

import {
  CLEAR_CATEGORIES,
  DETAIL_PRODUCT,
  FETCH_BRANDS_MODELS,
  FETCH_CATEGORIES,
  FETCH_FAVORITES,
  GET_PRODUCTS_FILTERED,
  GET_PRODUCTS_NAME,
  NEW_SHIPPING_ADDRESS,
  RESET_FILTER,
  SEARCH_PRODUCT,
  UPDATE_CART,
  UPDATE_FILTER,
} from "../action";

const initialState = {
  products: [],
  favorites: [],
  allProductsName: [],
  detail: {},
  categories: [],
  brand: [],
  cart: [],
  model: [],
  maxPages: 0,
  filter: {
    category: "",
    brand: "",
    model: "",
    search: "",
    minPrice: 0,
    maxPrice: 2147483647, // Max integer value
    order: "ASC",
    amount: 10,
    page: 0,
    stock: 0,
  },
  user: {
    userName: null,
    defaultShippingAddress: null,
    role: null,
    logged: false,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case MULTI_ACTION:
    //     const results = action.payload.actions.map(a => {
    //         return async (dispatch) => {
    //             dispatch(a)
    //         }
    //     })
    //     return results;

    //Filter
    case RESET_FILTER:
      return {
        ...state,
        filter: initialState.filter,
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };

    //Products
    case GET_PRODUCTS_FILTERED:
      return {
        ...state,
        products: action.payload.rows,
        maxPages: action.payload.count,
      };
    case GET_PRODUCTS_NAME:
      return {
        ...state,

        allProductsName: action.payload,
      };
    case DETAIL_PRODUCT:
      return {
        ...state,
        detail: action.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        categories: action.payload,
      };

    case FETCH_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    //Categories
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    //Brand / Model
    case FETCH_BRANDS_MODELS:
      return {
        ...state,
        brand: action.payload.brands,
        model: action.payload.models,
      };

    //User State
    case "USER_STATE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case NEW_SHIPPING_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          defaultShippingAddress: action.payload
        }
      }

    default:
      return state;
  }
};

export default rootReducer;
