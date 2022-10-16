import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByPrice() {
  var dispatch = useDispatch();
  var {filter} = useSelector(state => state)
  return (
    <>
      <select
        style={{color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
        value={filter.order}
        onChange={(e) =>
          dispatch(updateFilter({ order: e.target.value, page: 0 }))
        }
      >
        <option hidden>Precio</option>
        <option value={""}>Menor a Mayor</option>
        <option value={"DESC"}>Mayor a Menor</option>
      </select>
    </>
  );
}
