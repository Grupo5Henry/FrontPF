import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandAndModels, getProductsName, resetFilter, searchProduct } from "../../../redux/action";

const SearchBar = () => {

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const allProductsName = useSelector(state => state.allProductsName);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProductsName())
      dispatch(getBrandAndModels())
  }, [dispatch])
  // console.log(allProductsName, "SearchBar");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFilter())
    dispatch(searchProduct(search));
    setSearch('')
};

const onClick = (s) => {
  setSearch(s);
  setSuggestions([])
}

const onchange = (e) => {
  let matches = []
  if (e.length > 0) {
      matches = allProductsName.filter(p => {
          const regex = new RegExp(`${e}`, "gi");
          return p.name.match(regex)
      })
  }
  // console.log('matches', matches, "SearchBar")
    setSuggestions(matches)
  
  setSearch(e)
}
// console.log(search, "SearchBar")


  return (
    <div class='w-10/12'>
    <form class="bg-gray-100 w-full rounded border border-gray-200 flex items-center" onSubmit={e=>onSubmit(e)} autocomplete="off">
      <button class="py-3 px-6 bg-white text-gray-600 rounded-l border-r border-gray-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
      <Icon icon="fe:search" />
      </button>
      <input
      value={search}
        onChange={e => onchange(e.target.value)}
        type="text"
        name="text"
        placeholder="Search..."
        class="bg-transparent py-2 text-gray-600 px-4 focus:outline-none w-full"
      />
    </form>
      <ul class="bg-white border border-gray-100 w-full mt-2">
        {
          suggestions && suggestions.map((suggestion, i) =>
          <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
            <svg class="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                <h onClick={() => onClick(suggestion.name)} key={i}>{suggestion.name}</h>
          </li>)
        }    
      </ul>

    </div>
  );
};

export default SearchBar;
