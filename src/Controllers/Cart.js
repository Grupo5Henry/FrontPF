import axios from "axios"
import { getCart } from "../redux/action"
import store from "../redux/store/index"




export const addToCart = async (userName, id) => {
    try {
      await axios.post("https://backpf-production.up.railway.app/cart/add",
      { userName: userName, productId: id, amount: 1}
      )
      store.dispatch(getCart(localStorage.userName))
    } catch (err) {
      console.log({error: err.message})
    }
  }


export const updateCart = async (userName, id, amount) => {
    try {
        console.log()
      const datos = await axios.put("https://backpf-production.up.railway.app/cart/modify",
      { userName: userName, productId: id, amount: amount } 
      )
      store.dispatch(getCart(localStorage.userName))
    } catch (err) {
      console.log({error: err.message})
    }
  }


export const updateOfflineCart = async (id, amount) => {
    // console.log("cart")
    let cart = JSON.parse(localStorage.getItem("cart"))
    cart = {...cart, [id]: amount}  
    if (amount == 0) delete cart[id];
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)
    store.dispatch(getCart())
}

export const offlineToOnlineCart = async (userName) => {
    for (const [id, amount] of Object.entries(JSON.parse(localStorage.cart))) {
        try {
            await axios.post("https://backpf-production.up.railway.app/cart/add",
            { userName: userName, productId: id, amount: amount})
        } catch (err) {
            console.log({error: err.message})
        }
    }
    localStorage.removeItem("cart")
}

export const inCart = ( id ) => {
    const cart = store.getState().cart
    if (cart.some(favorite => favorite.product.id === id)) return true;
    return false
}