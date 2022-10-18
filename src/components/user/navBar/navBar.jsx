/* eslint-disable jsx-a11y/anchor-is-valid */
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, userDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BACK_URL, FRONT_URL } from "../../../constantes";
import {
  clearCartStore,
  getCart,
  getCategories,
  getFavorites,
  getSuggested,
  getUserOrders,
  resetFilter,
  updateFilter,
  updateUserState,
} from "../../../redux/action";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import getUser from "../../../services/google-login";
import tokenCheck from "../../../services/token-check";
import Alert from "../alert/alert";

// import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getValue } from "@mui/system";
import EmptyCart from "../alert/emptyCart";
import OutStock from "../alert/outStock";
import LogIn from "../logIn/logIn";
import SearchBar from "../searchBar/searchBar.jsx";
import SignIn from "../signIn/signIn";
import "./navBar.css";
import Verifi from "../alert/verifi";
import { offlineToOnlineCart } from "../../../Controllers/Cart";

Modal.setAppElement("#root");

const NavBar = () => {
  const navigate = useNavigate();
  const [refresher, setRefresher] = useState(true);

  const [usuario, setUsuario] = useState({
    signedIn: false,
    userId: "",
    fullName: "",
    picture: "",
  });

  const userState = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const categories = useSelector((state) => state.categories);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  ////////////////modales///////////////////////
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalOpen, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openStock, setOpenStock] = React.useState(false);
  const [openVerifi, setOpenVerifi] = React.useState(false);
  //////////////////////////////////////////////

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    user && tokenCheck(dispatch);
    var delayedTokenCheck = function (user) {
      var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          user && tokenCheck(dispatch);
          setRefresher(!refresher);
          //resolve();
        }, 3600000);
      });
      return promise;
    };
    user !== "undefined" && delayedTokenCheck(user);

    getUser(setUsuario, usuario, dispatch);
  }, [refresher, dispatch]);

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

  const checkCookie = () => {
    window.open(`${BACK_URL}/auth/checkCookie`, "_self");
  };

  const onComp = (e) => {
    dispatch(resetFilter());
    dispatch(updateFilter({ category: e }));
    navigate("/home");
  };

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
    dispatch(getCategories());
    dispatch(getUserOrders(userState.userName));
    dispatch(getSuggested());
    if (userState.useName != null)
      dispatch(offlineToOnlineCart(userState.userName));
  }, [userState]);

  return (
    <div className="box">
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-3">
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
            className="collapse navbar-collapse flex-grow justify-center items-center"
            id="navbarSupportedContent1"
          >
            <Link
              to={"/"}
              className="text-xl text-white pr-2 font-semibold"
              href="#!"
            >
              Techno Trade
            </Link>
            <ul className="navbar-nav justify-center items-center flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link
                  to={"/home"}
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                >
                  Inicio
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
              <li class="hoverable hover:bg-blue-800 hover:text-white">
                <a
                  href="#"
                  class="relative block py-2 px-4 lg:p-2 text-sm lg:text-base font-bold hover:bg-blue-800 hover:text-white"
                >
                  Categorias
                </a>
                <div class="z-10 p-6 mega-menu w-8/12 mb-16 sm:mb-0 shadow-xl bg-blue-800">
                  <div class="container mx-auto w-full flex z-20 flex-wrap justify-between">
                    <div class="w-full text-white mb-8">
                      <h2 class="font-bold text-2xl">Categorias</h2>
                      <p>Puedes filtrar los productos por tu preferincia</p>
                    </div>
                    {categories &&
                      categories.map((e, i) => {
                        if (i < 6) {
                          return (
                            <ul
                              key={i}
                              class="px-4 w-auto sm:w-1/2 lg:w-auto border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3"
                            >
                              <div class="flex items-center">
                                <h3 class="font-bold text-xl text-white text-bold mb-2">
                                  {e.name}
                                </h3>
                              </div>
                              <div class="flex items-center py-3">
                                <svg
                                  class="h-6 pr-3 fill-current text-blue-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                </svg>
                                <button
                                  value={e.name}
                                  onClick={(e) => onComp(e.target.value)}
                                  href="#"
                                  class="text-white bold border-b-2 border-blue-300 hover:text-blue-300"
                                >
                                  Ver...
                                </button>
                              </div>
                            </ul>
                          );
                        }
                      })}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex  items-center relative">
            <button
              className="nav-link text-white mr-2 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
              onClick={async () => {
                dispatch(getCart(userState.userName));
                if (!userState.logged) {
                  setOpenAlert(true);
                  return;
                }
                if (userState.verified === false) return setOpenVerifi(true);
                if (!cart.length) return setOpenCart(true);
                if (
                  cart.some(
                    (product) => product.product.stock - product.amount < 0
                  )
                ) {
                  setOpenStock(true);
                  return;
                }
                navigate("/direction");
              }}
            >
              Comprar
            </button>

            <Link
              to="/cart"
              className="flex items-center hover:text-gray-200 mr-2"
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
              <div className="flex items-center relative mr-2">
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
            {usuario.signedIn || userState.logged ? (
              <div className="dropdown relative mr-2">
                <a
                  className="dropdown-toggle flex items-center hidden-arrow"
                  href="#"
                  id="dropdownMenuButton2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
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
                    <a
                      onClick={() => handleLogOut()}
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <div className="flex md:hidden dropdown relative mr-2">
                  <a
                    className="dropdown-toggle flex items-center hidden-arrow"
                    href="#"
                    id="dropdownMenuButton2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </a>
                  <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li>
                      <a
                        onClick={() => setIsOpen(true)}
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        Ingresar
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setOpen(true)}
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        Crear Cuenta
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="md:flex hidden flex-grow space-x-1 justify-center">
                  <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Crear Cuenta
                  </button>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setIsOpen(false)}
                  overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                  }}
                  className={{
                    base: "content-base",
                    afterOpen: "content-after",
                    beforeClose: "content-before",
                  }}
                  closeTimeoutMS={500}
                >
                  <LogIn setIsOpen={setIsOpen} setOpen={setOpen} />
                </Modal>
                <Modal
                  isOpen={modalOpen}
                  onRequestClose={() => setOpen(false)}
                  overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                  }}
                  className={{
                    base: "content-base",
                    afterOpen: "content-box",
                    beforeClose: "content-before",
                  }}
                  closeTimeoutMS={500}
                >
                  <SignIn setIsOpen={setIsOpen} setOpen={setOpen} />
                </Modal>
              </div>
            )}

            <Modal
              isOpen={openAlert}
              onRequestClose={() => setOpenAlert(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <Alert
                setOpenAlert={setOpenAlert}
                setIsOpen={setIsOpen}
                openAlert={openAlert}
              />
            </Modal>
            <Modal
              isOpen={openCart}
              onRequestClose={() => setOpenCart(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <EmptyCart setOpenCart={setOpenCart} />
            </Modal>
            <Modal
              isOpen={openStock}
              onRequestClose={() => setOpenStock(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <OutStock setOpenStock={setOpenStock} />
            </Modal>
            <Modal
              isOpen={openVerifi}
              onRequestClose={() => setOpenVerifi(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <Verifi setOpenVerifi={setOpenVerifi} />
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
