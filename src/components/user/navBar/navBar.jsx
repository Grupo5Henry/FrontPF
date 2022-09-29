/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";
import SearchBar from "../searchBar/searchBar";
import "./navBar.css";

const NavBar = () => {
  return (
    <div className="box">
      {/* <nav className='nav_body'>
                <Link to="/" className='link_nav'>
                   <h2>Techno Trade</h2>
                </Link>
                <Link to="/home" className='link_nav'>
                    <Icon icon="ant-design:home-filled" width='40px' height='40px' />
                    <h4>Home</h4>
                </Link>
                <div className='prfile'>

                    <Link to="/" className='link_nav'>
                        <Icon icon="carbon:favorite-filled" width='40px' height='40px' />
                        <h4>Favorites</h4>
                    </Link>
                    <Link to="/" className='link_nav'>
                        <Icon icon="eva:shopping-cart-fill" width='40px' height='40px' />
                        <h4>My Shopping</h4>
                    </Link>
                </div>
                <div className='prfile'>
                    <Link to="/sign-in" className='link_nav'>
                        <h4>Sign In</h4>
                    </Link>
                    <h4 color='link_nav'>/</h4>
                    <Link to="/log-in" className='link_nav'>
                        <h4>Log In</h4>
                    </Link>
                </div>
            </nav> */}
      <nav
        class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
      >
        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <button
            class="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
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
              class="w-6"
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
          <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
            <Link to={'/'} class="text-xl text-white pr-2 font-semibold" href="#!">Techno Trade</Link>
            <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
              <li class="nav-item p-2">
                <Link to={'/home'} class="nav-link text-white" href="#!">Home</Link>
              </li>
              <li class="nav-item p-2">
                <Link to={'/home/abaut'}
                  class="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0">
                  Team
                </Link>
              </li>
              <li class="nav-item p-2">
                <Link class="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0" href="#!">
                  History
                </Link>
              </li>
            </ul>
          </div>
          <div class="flex items-center relative">
            <Link to='/' class="flex items-center hover:text-gray-200 mr-5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <div class="flex items-center relative mr-5">
              <Link to={'/favorites'} class="hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </div>
            <div class="dropdown relative mr-5">
              <a
                class="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                  class="rounded-full h-8 w-8"
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link to='/home/profile'
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                    Close
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/home*' element={<SearchBar />} />
      </Routes>
    </div>
  );
};
export default NavBar;
