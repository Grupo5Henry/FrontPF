import { Icon } from '@iconify/react';
import { AlternateEmail } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { userState } from '../../../redux/action';
import AuthService from "../../../services/auth.service";
import './logIn.css';


const LogIn = () => {
const dispatch = useDispatch();

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    if(userName && password){ 
        e.preventDefault();
        try {
        await AuthService.login(userName, password).then(
            () => {
            navigate("/home");
            dispatch(userState(true))
            localStorage.setItem("userName", userName);
            },
            (error) => {
            alert('Usuario o contraseña incorrectos');
            }
        );
        } catch (err) {
        
        }
    }
};
    return (
        <div className="login_body">
            <form onSubmit={handleLogin} autocomplete="off" class="flex flex-col bg-white rounded shadow-lg p-6 mt-12" action="">
                <div class='flex w-full justify-center mb-4'>
                <h1 class="font-bold text-2xl">Iniciar Sesión</h1>
                </div>
                <label class="font-semibold text-xs" for="usernameField">Usuario</label>
                <input class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" required="required" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <label class="font-semibold text-xs mt-3" for="passwordField">Constraseña</label>
                <input class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" onClick={handleLogin} type="button" value="Ingresar" />
                <div class="flex mt-6 justify-center text-xs">
                    <Link to={'/home'} class="text-blue-400 hover:text-blue-500" href="#">Vaolver al Inicio</Link>
                    <span class="mx-2 text-gray-300">/</span>
                    <Link to={'/home/sign-in'} class="text-blue-400 hover:text-blue-500">Crear cuenta</Link>
                </div>
            </form>
            {/* <div className="center">
                <Link to={'/'} className='link_box'>
                    <button className="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Ingresar con mi cuenta</h1>
                <form onSubmit={handleLogin} autoComplete="off">
                    <div className="inputbox">

                        <input type="text" required="required" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <span>Usuario</span>
                    </div>
                    <div className="inputbox">
                        <input type="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span>Constraseña</span>
                    </div>
                    <div className='boton'>
                        <div className="inputbox">
                            <input onClick={handleLogin} type="button" value="Ingresar" />
                        </div>
                        <Link className='signin_box' to={'/home/sign-in'}>Crear una cuenta</Link>

                    </div>
                </form>
            </div> */}
        </div>
    );
}



export default LogIn;

