import React from "react";
import { Link } from "react-router-dom";
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
      <div class="flex flex-wrap ">
        <section class="relative mx-auto">
          <nav class="flex justify-between bg-gray-900 text-white w-screen">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link to={"/"} class="text-3xl font-bold font-heading">
                Techno Trade
              </Link>
              <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <Link to={"/home"} class="hover:text-gray-200">
                    Home
                  </Link>
                </li>
                <li>
                <div class="relative inline-flex">
                  <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                    <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" />
                  </svg>
                  <select class="border border-gray-300 rounded-full text-gray-600 h-15 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option>Catrgories</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Yellow</option>
                    <option>Black</option>
                    <option>Orange</option>
                    <option>Purple</option>
                    <option>Gray</option>
                    <option>White</option>
                  </select>
                </div>
                </li>
                <li>
                  <a class="hover:text-gray-200" href="#!">
                    History
                  </a>
                </li>
                <li>
                  <a class="hover:text-gray-200" href="#!">
                    About Us
                  </a>
                </li>
              </ul>
              <div class="hidden xl:flex items-center space-x-5 items-center">
                <a class="hover:text-gray-200" href="#!">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </a>
                <a class="flex items-center hover:text-gray-200" href="#!">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </a>
                <a class="flex items-center hover:text-gray-200" href="#!">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <a class="xl:hidden flex mr-6 items-center" href="#!">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <a class="navbar-burger self-center mr-12 xl:hidden" href="#!">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </div>
      <SearchBar />
    </div>
  );
};
export default NavBar;
