import axios from "axios"
import { getFavorites } from "../redux/action"
import store from "../redux/store/index"



export const setFavorite = async (userName, id) => {
    try {
      await axios.post("https://backpf-production.up.railway.app/favorite/add",
      { userName: userName, productId: id}
      )
      store.dispatch(getFavorites(localStorage.userName))
    } catch (err) {
      console.log({error: err.message})
    }
  }


export const unSetFavorite = async (userName, id) => {
  try {
    await axios.delete("https://backpf-production.up.railway.app/favorite/delete",
    {data: { userName: userName, productId: id } }
    )
    store.dispatch(getFavorites(localStorage.userName))
  } catch (err) {
    console.log({error: err.message})
  }
}


export const isFavorite = (id) => {
  const favorites = store.getState().favorites;
  if (favorites === "Missing Username") return false
  if (favorites.some(favorite => favorite.productId === id)) return true;
  return false
}