import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../../../../../redux/action";

export default function ByBrand({ actual }) {
  var brands = useSelector((state) => state.brand);
  var {filter} = useSelector(state => state)
  // ORDENO LAS MARCAS
  brands = brands.sort((a, b) => {
    if (a.brand[0].toUpperCase() > b.brand[0].toUpperCase()) {
      return 1;
    }
    if (a.brand[0].toUpperCase() == b.brand[0].toUpperCase()) {
      return 1;
    }
    return -1;
  });
  var dispatch = useDispatch();

  return (
    
      <select style = {{ margin: '3px',color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
        value={filter.brand}
        onChange={(e) => {
          if(filter.search) dispatch(resetFilter());
          dispatch(updateFilter({ brand: e.target.value, page: 0 }))
        }
        }
      >
        <option hidden><div className="filter">Marca</div></option>
        {actual ? <option value={""}>Todas las marcas</option> : null}
        {brands.map((b, i) => (
          <option key={i}>{b.brand}</option>
        ))}
      </select>
  );
}
