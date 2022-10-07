import { Icon } from "@iconify/react";
import { AlternateEmail } from "@mui/icons-material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { offlineToOnlineCart } from "../../../Controllers/Cart";
import { userState } from "../../../redux/action";
import AuthService from "../../../services/auth.service";
import "./logIn.css";
import { BACK_URL } from "../../../constantes";

const LogIn = ({setIsOpen, setOpen}) => {
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
            dispatch(userState({ ...response, logged: true }));
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
    setOpen(true)
  }

    return (
        
            <form onSubmit={handleLogin} autocomplete="off" className="flex flex-col bg-white rounded shadow-lg p-6 mt-0" action="">
                <div className='flex w-full justify-center mb-4'>
                <h1 className="font-bold text-2xl">Iniciar Sesión</h1>
                </div>
                <label className="font-semibold text-xs" for="usernameField">Usuario</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" required="required" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <label className="font-semibold text-xs mt-3" for="passwordField">Constraseña</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" onClick={handleLogin} type="button" value="Ingresar" />
                <div className="flex mt-6 justify-center text-xs">
                    <p onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-blue-500 cursor-pointer">Vaolver al Inicio</p>
                    <span className="mx-2 text-gray-300">/</span>
                    <p onClick={onModal} className="text-blue-400 cursor-pointer hover:text-blue-500">Crear cuenta</p>
                </div>
            </form>
    );
}



export default LogIn;
