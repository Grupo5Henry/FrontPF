import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByCategory({ actual }) {
  var dispatch = useDispatch();
  var categories = useSelector((state) => state.categories);
  return (
    <>
      <select
        onChange={(e) =>
          dispatch(updateFilter({ category: e.target.value, page: 0 }))
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
