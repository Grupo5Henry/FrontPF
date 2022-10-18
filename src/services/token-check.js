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
          billingAddress: tokenStatus.data.billingAddress,
          logged: true,
          verified: tokenStatus.data.verified,
          mute: tokenStatus.data.mute
        })
      );
    // !tokenStatus &&  tokenRefresh(dispatch);
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
          userName: tokenStatus.userName,
          role: tokenStatus.role,
          defaultShippingAddress: tokenStatus.defaultShippingAddress,
          billingAddress: tokenStatus.billingAddress,
          logged: true,
          verified: tokenStatus.verified,
          mute: tokenStatus.mute
        })
      );
  } catch (err) {
    // console.log(err)
    dispatch(updateUserState(false));
    localStorage.removeItem("user");
  }
};

export default tokenCheck;
