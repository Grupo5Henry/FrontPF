import axios from "axios";

import { useSelector } from "react-redux";
import { BACK_URL } from "../../constantes";

// export const MULTI_ACTION = "MULTI_ACTION";

export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const DETAIL_PRODUCT = "DETAIL_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const GET_PRODUCTS_FILTERED = "GET_PRODUCTS_FILTERED";

export const FETCH_FAVORITES = "FETCH_FAVORITES";

export const UPDATE_CART = "UPDATE_CART";
export const GET_CART = "GET_CART";

export const RESET_FILTER = "RESET_FILTER";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const FETCH_FILTERED = "FETCH_FILTERED";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORIES = "ADD_CATEGORIES";
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";

export const FETCH_BRANDS_MODELS = "FETCH_BRANDS_MODELS";

// export const multiAction = (actions) => ({
//   type: MULTI_ACTION,
//   payload: { actions }
// });

export const getProductsName = () => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`${BACK_URL}/product/all`);
      dispatch({
        type: GET_PRODUCTS_NAME,

        payload: products.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductsFiltered = (filter) => {
  return async (dispatch) => {
    const {
      category,
      brand,
      model,
      search,
      minPrice,
      maxPrice,
      order,
      amount,
      page,
      stock,
    } = filter;
    // console.log(filter, "Actions")
    // console.log(category, brand, model, search, minPrice, maxPrice, order, amount, page, "Actions")
    const products = await axios.get(`${BACK_URL}/product/filterBy`, {
      params: {
        category,
        brand,
        model,
        search,
        minPrice,
        maxPrice,
        order,
        amount,
        page,
        stock,
      },
    });
    dispatch({
      type: GET_PRODUCTS_FILTERED,
      payload: products.data,
    });
  };
};

export const searchProduct = (name) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FILTER,
      payload: { search: name },
    });
  };
};

export const updateFilter = (filter) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filter,
    });
  };
};

export const resetFilter = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_FILTER,
      payload: null,
    });
  };
};

export const detailProduct = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios.get(`${BACK_URL}/product/ID/${id}`);
      dispatch({
        type: DETAIL_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserState = (payload) => {
  return {
    type: "USER_STATE",
    payload,
  };
};

export function clearCategories() {
  return {
    type: CLEAR_CATEGORIES,
    payload: [],
  };
}

export const getBrandAndModels = () => {
  return async (dispatch) => {
    const brandAndModels = await axios.get(
      `${BACK_URL}/product/allBrandAndModel`
    );
    dispatch({
      type: FETCH_BRANDS_MODELS,
      payload: brandAndModels.data,
    });
  };
};

export const getFavorites = (userName) => {
  return async (dispatch) => {
    try {
      const favorites = await axios.get(BACK_URL + "/favorite", {
        params: { userName },
      });
      dispatch({
        type: FETCH_FAVORITES,
        payload: favorites.data,
      });
    } catch (err) {
      console.log({ error: err.message });
    }
  };
};

export function getCategories() {
  return async function (dispatch) {
    fetch(BACK_URL + "/category")
      .then((response) => response.json())
      .then((categories) => {
        dispatch({
          type: FETCH_CATEGORIES,
          payload: categories,
        });
      });
  };
}

export const clearCartStore = () => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CART,
      payload: [],
    });
  };
};

export const getCart = (userName) => {
  if (!userName) {
    return async (dispatch) => {
      let cart = [];
      if (!localStorage.cart) {
        dispatch({
          type: UPDATE_CART,
          payload: [],
        });
        return;
      }
      for (const [id, amount] of Object.entries(
        JSON.parse(localStorage.cart)
      )) {
        try {
          const detail = await axios.get(`${BACK_URL}/product/ID/${id}`);
          const product = { amount, product: detail.data };
          cart.push(product);
        } catch (err) {
          console.log({ error: err.message });
        }
      }
      dispatch({
        type: UPDATE_CART,
        payload: cart,
      });
    };
  }

  return async (dispatch) => {
    try {
      const cart = await axios.get(`${BACK_URL}/cart`, {
        params: { userName },
      });
      dispatch({
        type: UPDATE_CART,
        payload: cart.data,
      });
    } catch (err) {
      console.log({ error: err.message });
    }
  };
};
