import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './logIn.css'

const LogIn = () => {
    return (
        <div class="login_body">
            <div class="center">
                <Link to={'/'} class='link_box'>
                    <button class="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Log In</h1>
                <form>
                    <div class="inputbox">
                        <input type="text" required="required" />
                        <span>Email</span>
                    </div>
                    <div class="inputbox">
                        <input type="text" required="required" />
                        <span>Password</span>
                    </div>
                    <div class='boton'>
                        <div class="inputbox">
                            <input type="button" value="Continue" />
                        </div>
                        <Link class='signin_box' to={'/sign-in'}>Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;