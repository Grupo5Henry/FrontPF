import { updateUserState } from "../redux/action";
import { BACK_URL } from "../constantes";

import axios from "axios";
import { authHeader, authHeaderRefresh } from "./auth-header";

const tokenCheck = async (dispatch) => {
  try {
    const tokenStatus = await axios.get(`${BACK_URL}/token/tokenCheck`, {
      headers: authHeader(),
    });
    //console.log('log de tokenStatus', tokenStatus.data);

    tokenStatus &&
      dispatch(
        updateUserState({
          role: tokenStatus.data.role,
          defaultShippingAddress: tokenStatus.data.defaultShippingAddress,
          userName: tokenStatus.data.userName,
          logged: true,
        })
      );
  } catch (err) {
    /* dispatch(userState(false)) */
    tokenRefresh(dispatch);
  }
};

const tokenRefresh = async (dispatch) => {
  try {
    const tokenStatus = await axios
      .get(`${BACK_URL}/token/tokenRefresh`, { headers: authHeaderRefresh() })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          /* localStorage.setItem("refreshToken", response.data.refreshToken) */
        }
        //console.log('auth.service signin: ', response.data);
        return response.data;
      });

    tokenStatus &&
      dispatch(
        updateUserState({
          role: tokenStatus.data.role,
          defaultShippingAddress: tokenStatus.data.defaultShippingAddress,
          userName: tokenStatus.data.userName,
          logged: true,
        })
      );
  } catch (err) {
    dispatch(updateUserState(false));
    localStorage.removeItem("user");
  }
};

export default tokenCheck;
