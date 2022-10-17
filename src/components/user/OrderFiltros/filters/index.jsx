import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/action";
import "./index.css";
import ByBrand from "./byBrand";
import ByCategory from "./byCategory";
import ByModel from "./byModel";
import ByPriceRange from "./byPriceRange";

export default function Filtros() {
  var [state, setState] = useState(false);

  var dispatch = useDispatch();
  var { categories, brand, filter } = useSelector((state) => state);

  useEffect(() => {
    if (!categories.length) dispatch(getCategories());
    // if(!brand.length) console.log("a"); //dispatch(getBrand() ???)
  }, []);
  return (
    <>
      <button
        style={{ margin: "3px" }}
        onClick={() => setState(state ? false : true)}
      >
        {state ? "<" : <div className="filter">FILTRAR</div>}
      </button>
      <div
        style={{
          display: state ? "flex" : "none",
          flexDirection: "column",
          margin: "3px",
        }}
      >
        <ByCategory actual={filter.category} />
        <ByBrand actual={filter.brand} />
        <ByModel actual={filter.model} />
        <ByPriceRange />
      </div>
    </>
  );
}
