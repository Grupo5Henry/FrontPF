import axios from "axios";
import { BACK_URL } from "../constantes";
import { getFavorites } from "../redux/action";
import store from "../redux/store/index";

const userState = store.getState().user;

export const setFavorite = async (userName, id) => {
  try {
    await axios.post(`${BACK_URL}/favorite/add`, {
      userName: userName,
      productId: id,
    });
    store.dispatch(getFavorites(userState.userName));
  } catch (err) {
    console.log({ error: err.message });
  }
};

export const unSetFavorite = async (userName, id) => {
  try {
    await axios.delete(`${BACK_URL}/favorite/delete`, {
      data: { userName: userName, productId: id },
    });
    store.dispatch(getFavorites(userState.userName));
  } catch (err) {
    console.log({ error: err.message });
  }
};

export const isFavorite = (id) => {
  const favorites = store.getState().favorites;
  if (favorites === "Missing Username") return false;
  if (favorites.some((favorite) => favorite.productId === id)) return true;
  return false;
};
