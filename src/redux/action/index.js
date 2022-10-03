import axios from "axios";


// export const MULTI_ACTION = "MULTI_ACTION";


export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const DETAIL_PRODUCT = "DETAIL_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const GET_PRODUCTS_FILTERED = "GET_PRODUCTS_FILTERED";


export const FETCH_FAVORITES = "FETCH_FAVORITES";





export const RESET_FILTER = "RESET_FILTER";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const FETCH_FILTERED = "FETCH_FILTERED"; 

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORIES = "ADD_CATEGORIES"
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";

export const FETCH_BRANDS_MODELS = "FETCH_BRANDS_MODELS";



// export const multiAction = (actions) => ({
//   type: MULTI_ACTION,
//   payload: { actions }
// });



export const getProductsName = () => {

  return async (dispatch) => {
    try {
      const products = await axios.get(
        "https://backpf-production.up.railway.app/product/all"
      );
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
    const { category, brand, model, search, minPrice, maxPrice, order, amount, page } = filter;
    // console.log(filter, "Actions")
    // console.log(category, brand, model, search, minPrice, maxPrice, order, amount, page, "Actions")
    const products = await axios.get(
      `https://backpf-production.up.railway.app/product/filterBy`,
      {params: { category, brand, model, search, minPrice, maxPrice, order, amount, page }}
      );
    dispatch({
      type: GET_PRODUCTS_FILTERED,
      payload: products.data
    })
  }
}


export const searchProduct = (name) => {
    return async (dispatch) => {
        dispatch({
          type: UPDATE_FILTER,
          payload: {search: name}
        });
    };
  };



export const updateFilter = (filter) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filter
    })
  }
}

export const resetFilter = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_FILTER,
      payload: null
    })
  }
}


 
export const detailProduct = (id) => {
    return async (dispatch) => {
      try {
        const product = await axios.get(
          `https://backpf-production.up.railway.app/product/ID/${id}`
        );
        dispatch({
          type: DETAIL_PRODUCT,
          payload: product.data,

        });
      } catch (error) {
        console.log(error);
      }
    };
  };





export const userState = (payload) => {
    return { 
        type: "USER_STATE",
        payload
    }
}






export function clearCategories() {
    return {
        type: CLEAR_CATEGORIES,
        payload: []
    }
};



export const getBrandAndModels = () => {
  return async (dispatch) => {
    const brandAndModels = await axios.get("https://backpf-production.up.railway.app/product/allBrandAndModel");
    dispatch({
      type: FETCH_BRANDS_MODELS,
      payload: brandAndModels.data
    })
  }
}





export const getFavorites = (userName) => {
  return async (dispatch) => {
    try {
      const favorites = await axios.get(
        "https://backpf-production.up.railway.app/favorite",
        {params: { userName }}
      )
      dispatch({
        type: FETCH_FAVORITES,
        payload: favorites.data
      })
    } catch (err) {
      console.log({error: err.message})
    }
  }
}


export function getCategories () {
    return async function (dispatch) {
        fetch("https://backpf-production.up.railway.app/category")
        .then(response => response.json())
        .then((categories) => {
            dispatch({
                type: FETCH_CATEGORIES,
                payload: categories,
            }) 
        })
    }
};


