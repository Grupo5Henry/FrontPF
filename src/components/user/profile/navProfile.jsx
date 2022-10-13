import React from "react";
import { Link } from "react-router-dom";

const NavProfile = ({setCompras, setPost}) => {

  const onCompras = ()=>{
    setCompras(true);
    setPost(false)
  }
  const onPost = ()=>{
    setCompras(false);
    setPost(true)
  }

  return (
    <div className="">
      <link
        rel="stylesheet"
        href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
      />
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 hover:text-gray-600"
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
      </div>

      <div className="text-center mt-2">
        <h1 className="text-purple-900 font-bold text-2xl">
          {localStorage.userName}
        </h1>
        <p className="text-gray-500 mt-3">
          You could also insert centered tabs to make this modal even more
          versatile.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <ul
              className="flex flex-wrap -mb-px"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-2" role="presentation">
                <button onClick={onCompras}
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </li>
          
            
              <li className="mr-2" role="presentation">
                <button onClick={onPost}
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
