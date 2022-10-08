import axios from "axios";
import { BACK_URL } from "../../constantes";

//PRODUCTS
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const DETAIL_PRODUCT = "DETAIL_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const GET_PRODUCTS_FILTERED = "GET_PRODUCTS_FILTERED";

//USERS
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";

//ORDERS

export const FETCH_ALL_ORDERS = "FETCH_ALL_ORDERS";

export const FETCH_FAVORITES = "FETCH_FAVORITES";

export const GET_REVIEW = "GET_REVIEW";
export const RESET_DETAIL = "RESET_DETAIL";
export const UPDATE_CART = "UPDATE_CART";
export const GET_CART = "GET_CART";

export const RESET_FILTER = "RESET_FILTER";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const FETCH_FILTERED = "FETCH_FILTERED";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORIES = "ADD_CATEGORIES";
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";

export const NEW_SHIPPING_ADDRESS = "NEW_SHIPPING_ADDRESS";

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
      //console.log(error);
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

export const userState = (payload) => {
  return {
    type: "USER_STATE",
    payload,
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};

export const detailProduct = (id) => {
  if (!id) {
    return async (dispatch) => {
      dispatch({
        type: DETAIL_PRODUCT,
        payload: {},
      });
    };
  }
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
      //console.log({error: err.message})
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
// review

export const getReview = (id) => {
  return async (dispatch) => {
    try {
      const review = await axios.get(
        `https://backpf-production.up.railway.app/review/ID/${id}`
      );
      dispatch({
        type: GET_REVIEW,
        payload: review.data,
      });
    } catch (err) {
      console.log({ error: err.message });
    }
  };
};

export function getAllUsers() {
  return async function (dispatch) {
    fetch(`${BACK_URL}/user`)
      .then((response) => response.json())
      .then((users) => {
        dispatch({
          type: FETCH_ALL_USERS,
          payload: users,
        });
      });
  };
}

export function getAllOrders() {
  return async function (dispatch) {
    fetch(`${BACK_URL}/order`)
      .then((response) => response.json())
      .then((orders) => {
        const ordersGrouped = [];
        orders.map((orderInstance) => {
          let orderNumber = orderInstance.orderNumber;
          let date = orderInstance.createdAt.split("-");
          date[0] = date[0].substring(2);
          date[2] = date[2].substring(0, 2);
          date = date.reverse().join("/");
          ordersGrouped[orderNumber] = ordersGrouped[orderNumber]
            ? [
                ...ordersGrouped[orderNumber],
                {
                  amount: orderInstance.amount,
                  productId: orderInstance.productId,
                  price: orderInstance.product.price,
                },
              ]
            : [
                orderNumber,
                orderInstance.shippingAddress,
                orderInstance.status,
                date,
                {
                  amount: orderInstance.amount,
                  productId: orderInstance.productId,
                  price: orderInstance.product.price,
                },
              ];
        });
        dispatch({
          type: FETCH_ALL_ORDERS,
          payload: ordersGrouped,
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
          // console.log({error: err.message})
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
      // console.log({error: err.message})
    }
  };
};

export function CreateOrder(obj) {
  return function (dispatch) {
    axios
      .post(`${BACK_URL}/order`, obj)
      .then(() => console.log("Se hizo la orden de compra"))
      .catch((err) => console.log(err));
  };
}

export function UpdateUserDefaultAddress(obj) {
  return function (dispatch) {
    axios
      .put(`${BACK_URL}/user/newShippingAddress`, obj)
      .then(() =>
        dispatch({
          type: NEW_SHIPPING_ADDRESS,
          payload: obj.defaultShippingAddress,
        })
      )
      .catch((err) => console.log(err));
  };
}
