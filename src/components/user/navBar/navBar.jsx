/* eslint-disable jsx-a11y/anchor-is-valid */
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, userDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BACK_URL, FRONT_URL } from "../../../constantes";
import {
  clearCartStore,
  getCart,
  getFavorites,
  updateUserState,
} from "../../../redux/action";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import getUser from "../../../services/google-login";
import tokenCheck from "../../../services/token-check";

// import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";
import SearchBar from "../searchBar/searchBar.jsx";
import "./navBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    signedIn: false,
    userId: "",
    fullName: "",
    picture: "",
  }); //google
  const userState = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && tokenCheck(dispatch);

    //google login

    getUser(setUsuario, usuario);
    dispatch(getFavorites(userState.userName));
  }, [dispatch]);

  const handleLogOut = () => {
    AuthService.logout();
    dispatch(
      updateUserState({
        userName: null,
        defaultShippingAddress: null,
        role: null,
        logged: false,
      })
    );
    dispatch(clearCartStore());
    window.open(`${BACK_URL}/auth/logout`, "_self");
  };

  const handleLogIn = () => {
    navigate("/home/log-in");
  };

  const checkCookie = () => {
    window.open(`${BACK_URL}/auth/checkCookie`, "_self");
  };

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
  }, [userState]);

  return (
    <div className="box">
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <button
            className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
          <div
            className="collapse navbar-collapse flex-grow items-center"
            id="navbarSupportedContent1"
          >
            <Link
              to={"/"}
              className="text-xl text-white pr-2 font-semibold"
              href="#!"
            >
              Techno Trade
            </Link>
            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link to={"/home"} className="nav-link text-white" href="#!">
                  <IconButton>
                    <HomeIcon fontSize="medium" color="primary" />
                  </IconButton>
                </Link>
              </li>

              <li className="nav-item p-2">
                <Link
                  to={"/about"}
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                >
                  Equipo
                </Link>
              </li>

              <li className="nav-item p-2">
                <Link
                  to={"/history"}
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                >
                  Historial
                </Link>
              </li>

              <li className="nav-item p-2">
                {usuario.signedIn || userState.logged ? (
                  <Link
                    to={"/createProduct"}
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                    href="#!"
                  >
                    Crear Producto
                  </Link>
                ) : null}
              </li>

              <li className="nav-item p-2">
                {usuario.signedIn || userState.logged ? (
                  <Link
                    to={"/modifyProduct"}
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                    href="#!"
                  >
                    Modificar Producto
                  </Link>
                ) : null}
              </li>

              <li className="nav-item p-2">
                {usuario.signedIn || userState.logged ? (
                  <button
                    onClick={() => handleLogOut()}
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    onClick={() => handleLogIn()}
                    className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  >
                    Ingresar
                  </button>
                )}
              </li>

              {/* 
            <li className="nav-item p-2">
              
                <button onClick={()=>checkCookie()} className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"  >
                CheckCookie
              </button>
             
            </li>
 */}
            </ul>
          </div>
          <div className="flex items-center relative">
            <button
              className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
              onClick={async () => {
                dispatch(getCart(userState.userName));
                if (!cart.length) return alert("Carrito vacio");
                if (!userState.logged) {
                  window.location = `${FRONT_URL}/home/log-in`;
                  alert("Debes estar registrado para realizar una compra");
                  return;
                }
                try {
                  const url = await axios.post(
                    `${BACK_URL}/checkout`,
                    { cart: cart },
                    { headers: { "Content-Type": "application/json" } }
                  );
                  // console.log(url)
                  window.location = url.data.url;
                } catch (err) {
                  console.log({ error: err.message });
                }
              }}
            >
              Checkout
            </button>

            <Link
              to="/cart"
              className="flex items-center hover:text-gray-200 mr-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
            {(usuario.signedIn || userState.logged) && (
              <div className="flex items-center relative mr-5">
                <Link to={"/favorites"} className="hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {(usuario.signedIn || userState.logged) && (
              <div className="dropdown relative mr-5">
                <a
                  className="dropdown-toggle flex items-center hidden-arrow"
                  href="#"
                  id="dropdownMenuButton2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                    className="rounded-full h-8 w-8"
                    alt=""
                    loading="lazy"
                  />
                </a>

                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                      Close
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
