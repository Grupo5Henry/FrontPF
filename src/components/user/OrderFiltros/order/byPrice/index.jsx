import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByPrice() {
  var dispatch = useDispatch();
  return (
    <>
      <select style = {{ margin: '3px',color: 'rgb(85, 29, 29)', borderRadius:'10px',backgroundColor:'rgba(215, 123, 13, 0.11)'}}
        onChange={(e) =>
          dispatch(updateFilter({ order: e.target.value, page: 0 }))
        }
      >
        <option hidden>Price</option>
        <option>ASC</option>
        <option>DESC</option>
      </select>
    </>
  );
}
