import axios from "axios";
/* const { API_URL } = process.env */
const API_URL="http://localhost:3001/user";
console.log(API_URL)

//const API_URL = "/auth";

const signup = /* async */ (userName, password,role,email,defaultShippingAddress,billingAddress) => {
  return axios.post(API_URL + '/signup', {
    role,
    userName,
    email,
    password,
    defaultShippingAddress,
    billingAddress
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data)
      return response.data;
    });
};

const login = (userName, password) => {
  
  return axios
   /*  .post(API_URL + "/login", { */
   .post("http://localhost:3001/user/login", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
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
