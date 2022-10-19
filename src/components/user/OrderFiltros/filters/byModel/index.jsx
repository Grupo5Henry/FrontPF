import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../../../../../redux/action";

export default function ByModel({ actual }) {
  var dispatch = useDispatch();
  var models = useSelector((state) => state.model);
  var {filter} = useSelector((state) => state);
  return (
    <>
      <select style = {{ margin: '3px',color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
        value={filter.model}
        onChange={(e) =>
          {
            dispatch(updateFilter({ model: e.target.value, page: 0 }))
          }
        }
      >
        <option hidden>Modelo</option>
        {actual ? <option value={""}>Todos los modelos</option> : null}
        {models.map((m, i) => (
          <option key={i}>{m.model}</option>
        ))}
      </select>
    </>
  );
}
