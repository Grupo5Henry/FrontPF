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

    tokenStatus && dispatch(updateUserState(tokenStatus.data));
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
          localStorage.setItem("role", response.data.privileges);
        }
        //console.log('auth.service signin: ', response.data);
        return response.data;
      });

    tokenStatus && dispatch(updateUserState(tokenStatus.data));
  } catch (err) {
    dispatch(updateUserState(false));
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("defaultShippingAddress");
    localStorage.removeItem("role");
  }
};

export default tokenCheck;
