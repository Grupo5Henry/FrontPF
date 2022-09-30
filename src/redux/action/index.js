import axios from 'axios';


export const getProducts = () => {
    return async (dispatch) => {
        const products = await axios.get('http://localhost:3001/products');
        dispatch({
            type: "GET_PRODUCTS",
            payload: products.data
        });
    }
};

export const createProducts = (payload) => {
    return async () => {
        const products = await axios.post('http://localhost:3001/products', payload);
        return products;
    }
}
