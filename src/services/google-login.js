import { BACK_URL } from "../constantes";

const getUser = (setUsuario, usuario) => {
  fetch(`${BACK_URL}/auth/login/success`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    })
    .then((resObject) => {
      localStorage.setItem("userName", "google:" + resObject.user.id);
      localStorage.setItem("defaultShippingAddress", resObject.shipping);
      localStorage.setItem("role", resObject.role);
      setUsuario({
        ...usuario,
        signedIn: true,
        userId: resObject.user.id,
        fullName: resObject.user.displayName,
      });
    })
    .catch((err) => {
      // console.log(err);
    });
};

export default getUser;
