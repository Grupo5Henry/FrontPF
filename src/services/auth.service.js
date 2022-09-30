import axios from "axios";
const { API_URL } = process.env
console.log(API_URL)

//const API_URL = "/auth";

const signup = async (userName, password) => {
    axios.post('http://localhost:3001' + "/signup", {
      userName,
      password,
      role :'role', 
      email : 'email@email.com', 
      defaultShippingAddress : 'defaultShippingAddress',
      billingAddress :'billingAddress'
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
    .post(API_URL + "/login", {
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
