import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandAndModels,
  getProductsName,
  resetFilter,
  searchProduct,
} from "../../../redux/action";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [empty, setEmpty] = useState(false);


  const allProductsName = useSelector((state) => state.allProductsName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsName());
    dispatch(getBrandAndModels());
  }, [dispatch]);
  // console.log(allProductsName, "SearchBar");

  const onSubmit = (e) => {
    if (search === '') {
      e.preventDefault();
      setEmpty(true)
    }else{
      e.preventDefault();
      dispatch(resetFilter());
      dispatch(searchProduct(search));
  
      setSearch("");
      setSuggestions([]);
      setEmpty(false)
    }
  };

  const onClick = (s) => {
    setSearch(s);
    setSuggestions([]);
  };

  const onchange = (e) => {
    if (e==='') {
      setSearch(e);
      setSuggestions([]);
    }else{
      let matches = [];
      if (e.length > 0) {
        matches = allProductsName.filter((p) => {
          const regex = new RegExp(`${e}`, "gi");
          return p.name.match(regex);
        });
      }
  
      // console.log('matches', matches, "SearchBar")
  
      setSuggestions(matches);
  
      setSuggestions(matches.slice(0, 10));
      setSearch(e);
      setEmpty(false)
    }
  };
  // console.log(suggestions)

  // console.log(search, "SearchBar")

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <form
        className="bg-gray-100 w-10/12 rounded border border-gray-200 flex items-center"
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
      >
        <button className="py-3 px-6 bg-white text-gray-600 rounded-l border-r border-gray-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
          <Icon icon="fe:search" />
        </button>
        <input
          value={search}
          onChange={(e) => onchange(e.target.value)}
          type="text"
          name="text"
          placeholder="¿Qué estás buscando?"

          className={empty === false ? "bg-transparent py-2 text-gray-600 px-4 rounded focus:outline-none w-full":"w-full text-gray-600 bg-transparent rounded focus:outline-none py-2 px-4 border-red-500"}
        />
      </form>
      {
        empty === true ? <span class="absolute top-28 flex font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
        No hay prductos que coincidan con tu búsqueda. 
      </span>:
      null
      }
      {suggestions ? (
        <div style={{width:"100%"}} className="flex justify-center relative">

        <ul className="absolute top-0 flex flex-col bg-white w-10/12 z-10">
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <li className="pl-8 pr-2 py-1 border-b-2 border-l-2 border-r-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                <svg
                  className="absolute w-4 h-4 left-2 top-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-sm"
                  onClick={() => onClick(suggestion.name)}
                  key={i}
                >
                  {suggestion.name}
                </p>
              </li>
            ))}
        </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchBar;
