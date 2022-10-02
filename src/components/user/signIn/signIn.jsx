import { Icon } from '@iconify/react';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { userState } from '../../../redux/action';
import AuthService from "../../../services/auth.service";
import './signIn.css';

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
                <h1>Crear una cuenta</h1>
                <form autocomplete="off">
                    <div class="inputbox">

                        <input type="text" required="required" name='userName' value={input.userName} onChange={(e)=>handleInputChange(e)} />
                        <span>Usuario</span>
                    </div>
                    <div className="inputbox">
                        <input type="password" required="required" name='password' value={input.password} onChange={(e)=>handleInputChange(e)} />
                        <span>Contraseña</span>
                    </div>
                    <div className="inputbox">
                        <input type="text" required="required" name='email' value={input.email} onChange={(e)=>handleInputChange(e)} />
                        <span>Email</span>
                    </div>
                    <div className="inputbox">
                        <input type="text" required="required" name='defaultShippingAddress' value={input.defaultShippingAddress} onChange={(e)=>handleInputChange(e)} />
                        <span>Direccion de entrega</span>
                    </div>
                    <div className="inputbox">
                        <input type="text" required="required" name='billingAddress' value={input.billingAddress} onChange={(e)=>handleInputChange(e)} />
                        <span>Direccion de facturación</span>
                    </div>

                    <div class='boton'>
                        <div class="inputbox">
                            <input onClick={handleSignIn} type="button" value="Crear" />
                        </div>
                        <Link class='login_box' to={'/home/log-in'}>Ya tengo una cuenta</Link>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;

