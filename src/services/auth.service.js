import axios from "axios";
/* const { API_URL } = process.env */
/* const API_URL="https://backpf-production.up.railway.app/user"; */
import { BACK_URL } from "../constantes";


//const API_URL = "/auth";

const signup = /* async */ (
  userName,
  password,
  role,
  email,
  defaultShippingAddress,
  billingAddress
) => {
  return axios
    .post(`${BACK_URL}/user/signup`, {
      role,
      userName,
      email,
      password,
      defaultShippingAddress,
      billingAddress,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("defaultShippingAddress", defaultShippingAddress);
        localStorage.setItem("role", "user");
      }

      return response.data;
    });
};

const login = (userName, password) => {
  return axios
    .post(`${BACK_URL}/user/login`, {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        /* localStorage.setItem("refreshToken", response.data.refreshToken) */
      }
     // console.log('auth.service signin: ', response.data.billingAddress);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
  localStorage.removeItem("defaultShippingAddress");
  localStorage.removeItem("role");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
