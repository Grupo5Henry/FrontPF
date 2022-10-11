import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../../../../../redux/action";

export default function ByModel({ actual }) {
  var dispatch = useDispatch();
  var models = useSelector((state) => state.model);
  var {filter} = useSelector((state) => state);
  return (
    <>
      <select
        value={filter.model}
        onChange={(e) =>
          {
            if(filter.search) dispatch(resetFilter());
            dispatch(updateFilter({ model: e.target.value, page: 0 }))
          }
        }
      >
        <option hidden>Model</option>
        {actual ? <option value={""}>All the models</option> : null}
        {models.map((m, i) => (
          <option key={i}>{m.model}</option>
        ))}
      </select>
    </>
  );
}
