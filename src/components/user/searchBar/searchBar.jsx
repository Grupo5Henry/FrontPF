import React from "react";
import { Icon } from '@iconify/react';
import "./searchBar.css";

const SearchBar = () => {
  return (
    <div class="bg-gray-100 w-10/12 rounded border border-gray-200 flex items-center">
      <button class="py-3 px-6 bg-white text-gray-600 rounded-l border-r border-gray-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
      <Icon icon="fe:search" />
      </button>{" "}
      <input
        type="text"
        placeholder="Search..."
        class="bg-transparent py-1 text-gray-600 px-4 focus:outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
