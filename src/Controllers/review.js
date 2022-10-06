import axios from "axios";
import { getReview } from "../redux/action";
import store from "../redux/store/index";


export const addReview = async (userName, id, description,stars) => {
    try {
      await axios.post(`https://backpf-production.up.railway.app/review/add`,
      { userName: userName, productId: id, description: description, stars:stars }
      )
      store.dispatch(getReview(id))
    } catch (err) {
      console.log(err)
    }
  }