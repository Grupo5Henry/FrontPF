import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { userState } from '../../../redux/action';

import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import './logIn.css';

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
        <div className="login_body">
            <div className="center">
                <Link to={'/'} className='link_box'>
                    <button className="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Log In</h1>
                <form onSubmit={handleLogin} autoComplete="off">
                    <div className="inputbox">
                        <input type="text" required="required" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <span>Email</span>
                    </div>
                    <div className="inputbox">
                        <input type="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span>Password</span>
                    </div>
                    <div className='boton'>
                        <div className="inputbox">
                            <input onClick={handleLogin} type="button" value="Continue" />
                        </div>
                        <Link className='signin_box' to={'/home/sign-in'}>Create Account</Link>
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