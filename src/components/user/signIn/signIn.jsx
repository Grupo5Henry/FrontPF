import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userState } from "../../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { offlineToOnlineCart } from "../../../Controllers/Cart";
import { updateUserState } from "../../../redux/action";
import AuthService from "../../../services/auth.service";
import "./signIn.css";

const role = "user";

const SignIn = ({ setIsOpen, setOpen }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  function validator(value) {
    let error = {};

    if (!value.userName) error.userName = "No hay nombre";
    if (!value.password) error.password = "No hay contraseña";
    if (!value.email) {
      error.email = "No hay Email";
    } else if (
      !/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)
    ) {
      error.email = "No es un email valido";
    }
    return error;
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validator({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(error);
    // console.log(input);
  };

  const handleSignIn = async (e) => {
    if(!/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) return alert("Mail inavalido");
    if (
      input.userName &&
      input.password &&
      input.email
      
    ) {
      e.preventDefault();
      try {
        await AuthService.signup(
          input.userName,
          input.password,
          role,
          input.email,
        ).then(
          (response) => {
            // console.log(response);
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
    setOpen(false);
  };

  return (
          
            <form className="px-8 pt-6 pb-8  m-0 bg-white rounded" >
            <h3 className="pt-2 text-2xl text-center">¡Crea una cuenta!</h3>
              <div className="formControl">
                {error && error.userName ? (
                  <span style={{ color: "red" }}>{error.userName}</span>
                ) : null}
              </div>
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

              <div className="formControl">
                {error.email ? (
                  <span style={{ color: "red" }}>{error.email}</span>
                ) : null}
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

              <div className="formControl">
                {error && error.password ? (
                  <span style={{ color: "red" }}>{error.password}</span>
                ) : null}
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
              <div className="mb-2 text-center">
                <input
                  onClick={handleSignIn}
                  type="button"
                  value="Registrar Cuenta"
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center"></div>
              <div className="text-center">
                <p
                  onClick={onModal}
                  className="inline-block text-sm cursor-pointer text-blue-500 align-baseline hover:text-blue-800"
                >
                  ¿Ya tienes una cuenta? ¡Inicia Sesión!
                </p>
              </div>
            </form>

      
  );
};

export default SignIn;
