import React, { useState } from "react";
import AuthService from "../../../services/auth.service";
import { useDispatch } from 'react-redux';
import { userState } from '../../../redux/action';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './signIn.css'

const role = 'user';
const SignIn = () => {
  const dispatch = useDispatch();
 
  const [input,setInput] = useState({
    userName:'',
    password:'',
    email:'',
    defaultShippingAddress:'',
    billingAddress:''
  })


  






  const navigate = useNavigate(); 

  const handleInputChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }


  const handleSignIn = async (e) => {

    e.preventDefault();
    try {
      await AuthService.signup(input.userName, input.password, role, input.email,input.defaultShippingAddress,input.billingAddress).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/home");
          /* window.location.reload(); */
         
          dispatch(userState(true));
          localStorage.setItem("userName", input.userName);

        },
        (error) => {
          alert(error);
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
                <h1>Sign In</h1>
                <form autocomplete="off">
                    <div class="inputbox">
                        <input type="text" required="required" name='userName' value={input.userName} onChange={(e)=>handleInputChange(e)} />
                        <span>Username</span>
                    </div>
                    <div class="inputbox">
                        <input type="text" required="required" name='password' value={input.password} onChange={(e)=>handleInputChange(e)} />
                        <span>Password</span>
                    </div>
                    <div class="inputbox">
                        <input type="text" required="required" name='email' value={input.email} onChange={(e)=>handleInputChange(e)} />
                        <span>Email</span>
                    </div>
                    <div class="inputbox">
                        <input type="text" required="required" name='defaultShippingAddress' value={input.defaultShippingAddress} onChange={(e)=>handleInputChange(e)} />
                        <span>Shipping Address</span>
                    </div>
                    <div class="inputbox">
                        <input type="text" required="required" name='billingAddress' value={input.billingAddress} onChange={(e)=>handleInputChange(e)} />
                        <span>Billing Address</span>
                    </div>
                    <div class='boton'>
                        <div class="inputbox">
                            <input onClick={handleSignIn} type="button" value="Continue" />
                        </div>
                        <Link class='login_box' to={'home/log-in'}>Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;

