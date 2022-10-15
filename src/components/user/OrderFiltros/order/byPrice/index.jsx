import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByPrice() {
  var dispatch = useDispatch();
  var {filter} = useSelector(state => state)
  return (
    <>
      <select
        value={filter.order}
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
