import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userState } from "../../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { offlineToOnlineCart } from "../../../Controllers/Cart";
import { updateUserState } from "../../../redux/action";
import AuthService from "../../../services/auth.service";
import "./signIn.css";

const role = "user";


const SignIn = ({setIsOpen, setOpen}) => {


  const dispatch = useDispatch();

  const [input, setInput] = useState({
    userName: "",
    password: "",
    email: "",
    defaultShippingAddress: "",
    billingAddress: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    if (
      input.userName &&
      input.password &&
      input.email &&
      input.defaultShippingAddress &&
      input.billingAddress
    ) {
      e.preventDefault();
      try {
        await AuthService.signup(
          input.userName,
          input.password,
          role,
          input.email,
          input.defaultShippingAddress,
          input.billingAddress
        ).then(
          (response) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate("/home");
            /* window.location.reload(); */
            dispatch(updateUserState({ ...response, logged: true }));
            offlineToOnlineCart(input.userName);
          },
          (error) => {
            alert(error);
          }
        );
      } catch (err) {}
    } else alert("Por favor, completa todos los campos del formulario");
  };

  const onModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setOpen(false)
  }

  return (
    
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full flex justify-center">
            <div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none mt-5 mb-5">
              <h3 className="pt-2 text-2xl text-center">¡Crea una cuenta!</h3>
              <form className="px-8 pt-6 pb-8 mb-2 bg-white rounded">
                <div className="mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Usuario
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Usuario"
                    required="required"
                    name="userName"
                    value={input.userName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mb-1">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    required="required"
                    name="email"
                    value={input.email}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="password"
                  >
                    Constraseña
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    required="required"
                    name="password"
                    value={input.password}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="******************"
                  />
                  {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                </div>
                {/* <div className="mb-1 md:flex md:justify-between">
                  
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                      Confirmar Contraseña
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div> */}
                <div className="mb-2 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Direccion de entrega
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      required="required"
                      name="defaultShippingAddress"
                      value={input.defaultShippingAddress}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" f>
                      Direccion de facturación
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      required="required"
                      name="billingAddress"
                      value={input.billingAddress}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-2 text-center">
                  <input
                    onClick={handleSignIn}
                    type="button"
                    value="Registrar Cuenta"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <p
                    onClick={() => setOpen(false)}
                    className="inline-block text-sm cursor-pointer text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Vaolver al Inicio
                  </p>
                </div>
                <div className="text-center">
                  <p onClick={onModal}
                    className="inline-block text-sm cursor-pointer text-blue-500 align-baseline hover:text-blue-800"
                  >
                    ¿Ya tienes una cuenta? ¡Inicia Sesión!
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
