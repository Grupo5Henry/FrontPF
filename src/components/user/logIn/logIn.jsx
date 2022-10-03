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
            <div className="center">
                <Link to={'/'} className='link_box'>
                    <button className="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Ingresar con mi cuenta</h1>
                <form onSubmit={handleLogin} autocomplete="off">
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
            </div>
        </div>
    );
}



export default LogIn;

