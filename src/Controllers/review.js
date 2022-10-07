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

  export const updateReview = async (userName, id, eDescription, eStars) => {
    try {
        console.log()
      const datos = await axios.put(`https://backpf-production.up.railway.app/review/modify`,
      { userName: userName, productId: id, description: eDescription, stars: eStars } 
      )
      store.dispatch(getReview(id))
    } catch (err) {
      console.log({error: err.message})
    }
  }