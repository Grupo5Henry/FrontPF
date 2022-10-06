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
    if(input.userName && input.password && input.email && input.defaultShippingAddress && input.billingAddress){
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
  } else alert ( 'Por favor, completa todos los campos del formulario');
  };


    return (
        <div className="login_body">
          <div class="container mx-auto">
        <div class="flex justify-center px-6 my-12">
          <div class="w-full flex justify-center">
            <div class="w-6/12 bg-white p-5 rounded-lg lg:rounded-l-none mt-5 mb-5">
              <h3 class="pt-2 text-2xl text-center">¡Crea una cuenta!</h3>
              <form class="px-8 pt-6 pb-8 mb-2 bg-white rounded">
                <div class="mb-0">
                  <label class="block mb-2 text-sm font-bold text-gray-700">
                    Usuario
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Usuario" required="required" name='userName' value={input.userName} onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div class="mb-1">
                  <label class="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text" required="required" name='email' value={input.email} onChange={(e) => handleInputChange(e)}
                    placeholder="Email"
                  />
                </div>
                <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                      Constraseña
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password" required="required" name='password' value={input.password} onChange={(e) => handleInputChange(e)}
                      placeholder="******************"
                    />
                    {/* <p class="text-xs italic text-red-500">Please choose a password.</p> */}
                  </div>
                {/* <div class="mb-1 md:flex md:justify-between">
                  
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                      Confirmar Contraseña
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div> */}
                  <div class="mb-2 md:flex md:justify-between">
                    <div class="mb-4 md:mr-2 md:mb-0">
                      <label class="block mb-2 text-sm font-bold text-gray-700">
                        Direccion de entrega
                      </label>
                      <input
                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text" required="required" name='defaultShippingAddress' value={input.defaultShippingAddress} onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div class="md:ml-2">
                      <label class="block mb-2 text-sm font-bold text-gray-700" f>
                        Direccion de facturación
                      </label>
                      <input
                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text" required="required" name='billingAddress' value={input.billingAddress} onChange={(e) => handleInputChange(e)}

                      />
                    </div>
                  </div>
                <div class="mb-2 text-center">
                <input onClick={handleSignIn} type="button" value="Registrar Cuenta" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"/>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <Link to={'/home'}
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                    Vaolver al Inicio
                  </Link>
                </div>
                <div class="text-center">
                  <Link to={'/home/log-in'}
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    ¿Ya tienes una cuenta? ¡Inicia Sesión!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
            {/* <div className="center">
                <Link to={'/'} className='link_box'>
                    <button className="tooltip button_box">
                        <Icon icon="akar-icons:arrow-back-thick-fill" />
                    </button>
                </Link>
                <h1>Crear una cuenta</h1>
                <form autoComplete="off">
                    <div className="inputbox">

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

                    <div className='boton'>
                        <div className="inputbox">
                            <input onClick={handleSignIn} type="button" value="Crear" />
                        </div>
                        <Link className='login_box' to={'/home/log-in'}>Ya tengo una cuenta</Link>

                    </div>
                </form>
            </div> */}
        </div>
    );
}

export default SignIn;

