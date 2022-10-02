import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { userState } from '../../../redux/action';

import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './logIn.css'

const LogIn = () => {
const dispatch = useDispatch();

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
    await AuthService.login(userName, password).then(
        () => {
        navigate("/home");
        //window.location.reload();
        dispatch(userState(true))
        localStorage.setItem("userName", userName);
        },
        (error) => {
        console.log(error);
        }
    );
    } catch (err) {
    console.log(err);
    }
};
    return (
        <div class="login_body">
            <div class="center">
                <Link to={'/'} class='link_box'>
                    <button class="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Log In</h1>
                <form onSubmit={handleLogin} autocomplete="off">
                    <div class="inputbox">
                        <input type="text" required="required" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <span>Email</span>
                    </div>
                    <div class="inputbox">
                        <input type="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span>Password</span>
                    </div>
                    <div class='boton'>
                        <div class="inputbox">
                            <input onClick={handleLogin} type="button" value="Continue" />
                        </div>
                        <Link class='signin_box' to={'/home/sign-in'}>Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


/* import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { userState } from '../../../redux/action';

import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";

const Login = () => {

const dispatch = useDispatch();

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
    await AuthService.login(userName, password).then(
        () => {
        navigate("/home");
        //window.location.reload();
        dispatch(userState(true))
        },
        (error) => {
        console.log(error);
        }
    );
    } catch (err) {
    console.log(err);
    }
};

return (
    <div>
    <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <input
        type="text"
        placeholder="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
    </form>
    </div>
);
}; */

export default LogIn;


//export default LogIn;