import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { offlineToOnlineCart } from "../../../Controllers/Cart";
import { updateUserState } from "../../../redux/action";
import AuthService from "../../../services/auth.service";
import "./signIn.css";

const role = "user";
const SignIn = () => {
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
    } else toast("Por favor, completa todos los campos del formulario");
  };

  return (
    <div className="login_body">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="center">
        <Link to={"/"} className="link_box">
          <button className="tooltip button_box">
            <Icon icon="akar-icons:arrow-back-thick-fill" />
          </button>
        </Link>
        <h1>Crear una cuenta</h1>
        <form autoComplete="off">
          <div className="inputbox">
            <input
              type="text"
              required="required"
              name="userName"
              value={input.userName}
              onChange={(e) => handleInputChange(e)}
            />
            <span>Usuario</span>
          </div>
          <div className="inputbox">
            <input
              type="password"
              required="required"
              name="password"
              value={input.password}
              onChange={(e) => handleInputChange(e)}
            />
            <span>Contraseña</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              required="required"
              name="email"
              value={input.email}
              onChange={(e) => handleInputChange(e)}
            />
            <span>Email</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              required="required"
              name="defaultShippingAddress"
              value={input.defaultShippingAddress}
              onChange={(e) => handleInputChange(e)}
            />
            <span>Direccion de entrega</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              required="required"
              name="billingAddress"
              value={input.billingAddress}
              onChange={(e) => handleInputChange(e)}
            />
            <span>Direccion de facturación</span>
          </div>

          <div className="boton">
            <div className="inputbox">
              <input onClick={handleSignIn} type="button" value="Crear" />
            </div>
            <Link className="login_box" to={"/home/log-in"}>
              Ya tengo una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
