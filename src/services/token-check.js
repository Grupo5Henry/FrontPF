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
    console.log(tokenStatus);
    tokenStatus &&
      dispatch(updateUserState({ ...tokenStatus.data, logged: true }));
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
          localStorage.setItem(
            "defaultShippingAddress",
            response.data.shippingAddress
          );
          localStorage.setItem("role", response.data.role);
        }
        //console.log('auth.service signin: ', response.data);
        return response.data;
      });

    tokenStatus &&
      dispatch(
        updateUserState({
          username: tokenStatus.data.username,
          role: tokenStatus.data.role,
          defaultShippingAddress: tokenStatus.data.defaultShippingAddress,
          logged: true,
        })
      );
  } catch (err) {
    dispatch(updateUserState(false));
    localStorage.removeItem("user");
  }
};

export default tokenCheck;
