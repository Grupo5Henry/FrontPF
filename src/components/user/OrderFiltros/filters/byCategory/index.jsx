import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../../../../../redux/action";

export default function ByCategory({ actual }) {
  var dispatch = useDispatch();
  var {categories,filter} = useSelector((state) => state);
  return (
    <>
      <select style = {{ margin: '3px',color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
        value={filter.category}
        onChange={(e) => {
          if(filter.search) dispatch(resetFilter());
          dispatch(updateFilter({ category: e.target.value, page: 0 }))
        }
        }
      >
        <option hidden>Categorias</option>
        {actual ? <option value={""}>Todas las categorias</option> : null}
        {categories.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>
    </>
  );
}
