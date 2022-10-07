import { updateUserState } from "../redux/action";
import { BACK_URL } from "../constantes";
import axios from "axios";
import authHeader from "./auth-header";

const tokenCheck = async (dispatch) => {
  try {
    const tokenStatus = await axios.get(`${BACK_URL}/token/tokenCheck`, {
      headers: authHeader(),
    });
    //console.log('log de tokenStatus', tokenStatus.data);
    tokenStatus &&
      dispatch(updateUserState({ ...tokenStatus.data, logged: true }));
  } catch (err) {
    dispatch(
      updateUserState({
        userName: null,
        defaultShippingAddress: null,
        role: null,
        logged: false,
      })
    );
  }
};
export default tokenCheck;
