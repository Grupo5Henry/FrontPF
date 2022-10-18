import { BACK_URL } from "../constantes";
import { offlineToOnlineCart } from "../Controllers/Cart";
import { updateUserState } from "../redux/action";
const getUser = (setUsuario, usuario, dispatch) => {
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
      dispatch(
        updateUserState({
          userName: "google:" + resObject.user.id,
          defaultShippingAddress: resObject.shipping,
          role: resObject.role,
          billingAddress: resObject.billingAddress,
          verified: resObject.verified,
          mute: resObject.mute,
          logged: true,
        })
      );
      setUsuario({
        ...usuario,
        signedIn: true,
        userId: resObject.user.id,
        fullName: resObject.user.displayName,
      });
      offlineToOnlineCart("google:" + resObject.user.id);
    })
    .catch((err) => {
      // console.log(err);
    });
};

export default getUser;
