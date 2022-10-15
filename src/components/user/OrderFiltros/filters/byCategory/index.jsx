import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../../../../../redux/action";

export default function ByCategory({ actual }) {
  var dispatch = useDispatch();
  var {categories,filter} = useSelector((state) => state);
  return (
    <>
      <select style = {{ margin: '3px',color: 'rgb(85, 29, 29)', borderRadius:'10px',backgroundColor:'rgba(215, 123, 13, 0.11'}}
        value={filter.category}
        onChange={(e) => {
          if(filter.search) dispatch(resetFilter());
          dispatch(updateFilter({ category: e.target.value, page: 0 }))
        }
        }
      >
        <option hidden>Category</option>
        {actual ? <option value={""}>All the categories</option> : null}
        {categories.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>
    </>
  );
}
