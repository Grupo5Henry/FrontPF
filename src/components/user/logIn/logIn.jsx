import { Icon } from "@iconify/react";
import { AlternateEmail } from "@mui/icons-material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { offlineToOnlineCart } from "../../../Controllers/Cart";
import { updateUserState } from "../../../redux/action";
import AuthService from "../../../services/auth.service";
import "./logIn.css";
import { BACK_URL } from "../../../constantes";

const LogIn = ({ setIsOpen, setOpen }) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.open(`${BACK_URL}/auth/google`, "_self");
  };

  const handleLogin = async (e) => {
    if (userName && password) {
      e.preventDefault();
      try {
        await AuthService.login(userName, password).then(
          (response) => {
            navigate("/home");
            // console.log(response);
            dispatch(
              updateUserState({
                userName: response.userName,
                role: response.role,
                defaultShippingAddress: response.defaultShippingAddress,
                logged: true,
              })
            );
            offlineToOnlineCart(userName);
          },
          (error) => {
            toast("Usuario o contraseña incorrectos");
          }
        );
      } catch (err) {}
    }
  };

  const onModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setOpen(true);
  };

  return (
    //       <div className="inputbox">
    //         <input
    //           type="text"
    //           required="required"
    //           value={userName}
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //         <span>Usuario</span>
    //       </div>
    //       <div className="inputbox">
    //         <input
    //           type="password"
    //           required="required"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <span>Constraseña</span>
    //       </div>
    //       <div className="boton">
    //         <div className="inputbox">
    //           <input onClick={handleLogin} type="button" value="Ingresar" />
    //         </div>
    //         <Link className="signin_box" to={"/home/sign-in"}>
    //           Crear una cuenta
    //         </Link>
    //       </div>
    //       <div className="boton">
    //         <div className="inputbox">
    //           <input onClick={handleGoogleLogin} type="button" value="Google" />
    //         </div>
    //       </div>
    //     </form>
    <form
      onSubmit={handleLogin}
      autocomplete="off"
      className="flex flex-col bg-white rounded shadow-lg p-6 mt-0"
      // action=""
    >
      <div className="flex w-full justify-center mb-4">
        <h1 className="font-bold text-2xl">Iniciar Sesión</h1>
      </div>
      <label className="font-semibold text-xs" for="usernameField">
        Usuario
      </label>
      <input
        className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
        type="text"
        required="required"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label className="font-semibold text-xs mt-3" for="passwordField">
        Constraseña
      </label>
      <input
        className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
        type="password"
        required="required"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        type="button"
        onClick={handleLogin}
        value="Ingresar"
      />
      <input
        className="w-full max-w-xs font-bold shadow-sm mt-2 rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        type="button"
        onClick={handleGoogleLogin}
        value="Ingresar con Google"
      />
      <div className="flex mt-6 justify-center text-xs">
        <p
          onClick={onModal}
          className="text-blue-400 cursor-pointer hover:text-blue-500"
        >
          Crear cuenta
        </p>
      </div>
    </form>
  );
};

export default LogIn;
